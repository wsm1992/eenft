const eenftContract = artifacts.require('eenftContract');
const truffleAssert = require('truffle-assertions');
const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

contract("eenftContract", function (accounts) {

    let [user1, user2, user3] = accounts;

    it("Je teste la creation d'une collection", async () => {

        //Given
        let id = new BN(1);
        let amount = new BN(10);
        let nftPriceUnit = web3.utils.toWei('1', "ether");
        let eenftContractInstance = await eenftContract.new({ from: user1 });

        //when                                                     //uint256 id, uint256 amount, uint256 nftPriceUnit                                                          
        let result = await eenftContractInstance.createCollectible(id, amount, nftPriceUnit, { from: user1 });

        //Then
        assert.equal(result.receipt.status, true, "createCollectible fail");
        assert.equal(result.logs[1].event, "EventCreatingCollectible", "ne lance pas d\'event EventCreatingCollectible");
    });

    it("Je que l'utilisateur ne peut pas transferer de carte avec l'interface 1155 d'origine", async () => {

        //Given
        let id = new BN(1);
        let amount = new BN(10);
        let nftPriceUnit = web3.utils.toWei('1', "ether");
        let eenftContractInstance = await eenftContract.new({ from: user1 });
        let eenftContractInstanceAddress = eenftContractInstance.address;

        await eenftContractInstance.createCollectible(id, amount, nftPriceUnit, { from: user1 });

        //when 
        let result = await await truffleAssert.reverts(
            eenftContractInstance.safeTransferFrom(eenftContractInstanceAddress, user2, id, amount, [], { from: user2 }),
            "ERC1155: transfert locked");
    });

    it("Je teste l'achat d'une carte", async () => {

        //Given
        let id = new BN(1);
        let amount = new BN(10);
        let nftPriceUnit = web3.utils.toWei('1', "ether");
        let ethPrice = web3.utils.toWei('2', "ether");
        let eenftContractInstance = await eenftContract.new({ from: user1 });
        await eenftContractInstance.createCollectible(id, amount, nftPriceUnit, { from: user1 });

        //when 
        let result = await eenftContractInstance.buy(id, new BN(2), { from: user2, to: eenftContractInstance.address, value: ethPrice, gas: 0 })

        //Then
        assert.equal(result.receipt.status, true, "EventBuyingCollectible fail");
        assert.equal(result.logs[1].event, "EventBuyingCollectible", "ne lance pas d\'event EventBuyingCollectible");

        await eenftContractInstance.transferTo(user2, await web3.eth.getBalance(eenftContractInstance.address),{ from: user1, gas: 0 })
    });

    it("Je teste une revente et un reachat", async () => {

        //Given
        let id = new BN(1);
        let amount = new BN(1);
        let nftPriceUnit = web3.utils.toWei('1', "ether");
        let ethPrice = web3.utils.toWei('1', "ether");
        let eenftContractInstance = await eenftContract.new({ from: user1 });
        await eenftContractInstance.createCollectible(id, amount, nftPriceUnit, { from: user1 });
        await eenftContractInstance.buy(id, amount, { from: user2, to: eenftContractInstance.address, value: ethPrice, gas: 0 })
        await eenftContractInstance.activateResellID(id, true);

        //when 
        let result = await eenftContractInstance.reSell(id, amount, { from: user2 });

        //Then
        assert.equal(result.receipt.status, true, "reSell fail");



        //When 
        // console.log("contract balance before buy:"+await web3.utils.fromWei(await web3.eth.getBalance(eenftContractInstance.address), 'ether'));
        result = await eenftContractInstance.buy(id, amount, { from: user3, to: eenftContractInstance.address, value: ethPrice, gas: 0 })
        // console.log("contract balance apres buy:"+await web3.utils.fromWei(await web3.eth.getBalance(eenftContractInstance.address), 'ether'));

        //then
        assert.equal(result.receipt.status, true, "buy fail");
        assert.equal(result.logs[1].event, "EventBuyingCollectible", "ne lance pas d\'event EventBuyingCollectible");


        //when 
        result = await eenftContractInstance.withdraw({ from: user2, gas: 0 });
        assert.equal(result.receipt.status, true, "withdraw fail");
    });

    it("Je teste le transfert d ETH vers une adresse avec transfertTo", async () => {

        // Given
        let id = new BN(1);
        let amount = new BN(10);
        let nftPriceUnit = web3.utils.toWei('1', "ether");
        let ethPrice = web3.utils.toWei('2', "ether");
        let eenftContractInstance = await eenftContract.new({ from: user1 });
        await eenftContractInstance.createCollectible(id, amount, nftPriceUnit, { from: user1 });
        await eenftContractInstance.buy(id, new BN(2), { from: user2, to: eenftContractInstance.address, value: ethPrice, gas: 0 })

        // when 
        let balanceBeforeTransfer=await web3.utils.fromWei(await web3.eth.getBalance(eenftContractInstance.address), 'ether');
        // console.log("balanceBeforeTransfer="+balanceBeforeTransfer);
        let result = await eenftContractInstance.transferTo(user2, ethPrice, { from: user1, gas: 0 })

        // Then
        let balanceAfterTransfer=await web3.utils.fromWei(await web3.eth.getBalance(eenftContractInstance.address), 'ether');
        // console.log("balanceAfterTransfer="+balanceAfterTransfer);
        assert.equal(result.receipt.status, true, "transferTo fail");
        assert.equal(result.logs[0].event, "EventTransferTo", "ne lance pas d\'event EventTransferTo");
        assert.equal(balanceAfterTransfer, 0, "balance error [balanceBeforeTransfer:"+balanceBeforeTransfer+"] [balanceAfterTransfer:"+balanceAfterTransfer+"]");

    });

    it("Je teste le une requete pour visualiser les NFTs d'un utilisateur", async () => {

        //Given
        // let id = new BN(1);
        let amount = new BN(10);
        let nftPriceUnit = web3.utils.toWei('0.5', "ether");
        let ethPrice = web3.utils.toWei('1', "ether");
        let eenftContractInstance = await eenftContract.new({ from: user1 });

        await eenftContractInstance.createCollectible(new BN(1), amount, nftPriceUnit, { from: user1 });
        await eenftContractInstance.createCollectible(new BN(2), amount, nftPriceUnit, { from: user1 });
        await eenftContractInstance.buy(new BN(1), new BN(2), { from: user2, to: eenftContractInstance.address, value: ethPrice, gas: 0 })
        await eenftContractInstance.buy(new BN(2), new BN(2), { from: user2, to: eenftContractInstance.address, value: ethPrice, gas: 0 })

        //when 
        let balanceBeforeTransfer=await web3.utils.fromWei(await web3.eth.getBalance(eenftContractInstance.address), 'ether');
        // console.log("balanceBeforeTransfer="+balanceBeforeTransfer);
        
        result = await eenftContractInstance.balanceOfBatch([user2,user2], [1,2], { from: user1, gas: 0 });
        console.log("user 2, nb collection id1:"+result[0]);
        console.log("user 2, nb collection id2:"+result[1]);

        //Then
        // console.log("balanceAfterTransfer="+balanceAfterTransfer);
        assert.equal(result[0], 2, "id1 quantité erreur");
        assert.equal(result[1], 2, "id1 quantité erreur");

    });

});

