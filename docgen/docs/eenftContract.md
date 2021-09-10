It's entry function of eenft service

# Functions:

- [`constructor()`](#eenftContract-constructor--)

- [`createCollectible(uint256 id, uint256 amount, uint256 nftPriceUnit)`](#eenftContract-createCollectible-uint256-uint256-uint256-)

- [`buy(uint256 id, uint256 amountNFT)`](#eenftContract-buy-uint256-uint256-)

- [`activateResellID(uint256 id, bool activate)`](#eenftContract-activateResellID-uint256-bool-)

- [`isIdActivateForResell(uint256 id)`](#eenftContract-isIdActivateForResell-uint256-)

- [`reSell(uint256 id, uint256 amountNFT)`](#eenftContract-reSell-uint256-uint256-)

- [`withdraw()`](#eenftContract-withdraw--)

- [`transferTo(address payable addressToTransfer, uint256 amountToWithdraw)`](#eenftContract-transferTo-address-payable-uint256-)

- [`receive()`](#eenftContract-receive--)

# Events:

- [`EventCreatingCollectible(uint256 id, uint256 nftPriceUnit)`](#eenftContract-EventCreatingCollectible-uint256-uint256-)

- [`EventBuyingCollectible(address buyer, uint256 id, uint256 amountNFT)`](#eenftContract-EventBuyingCollectible-address-uint256-uint256-)

- [`EventResellCollectible(address seller, uint256 id, uint256 amountNFT)`](#eenftContract-EventResellCollectible-address-uint256-uint256-)

- [`EventActivatedResellID(uint256 id, bool activate)`](#eenftContract-EventActivatedResellID-uint256-bool-)

- [`Eventwithdrawal(address addressWithdraw, uint256 amount)`](#eenftContract-Eventwithdrawal-address-uint256-)

- [`EventTransferTo(address addressToTransfert, uint256 amountToWithdraw)`](#eenftContract-EventTransferTo-address-uint256-)

# Function `constructor()` {#eenftContract-constructor--}

must indicate setOwnerNFT

# Function `createCollectible(uint256 id, uint256 amount, uint256 nftPriceUnit)` {#eenftContract-createCollectible-uint256-uint256-uint256-}

Create NFT collection.

## Parameters:

- `id`:  id of collection, allows to personalise the uri to the json.

- `amount`:  number of NFT in collectible.

- `nftPriceUnit`:  price of one NFT in ETH

# Function `buy(uint256 id, uint256 amountNFT)` {#eenftContract-buy-uint256-uint256-}

Buy NFT of collection, FIXME if the customer wants to buy several NFT so you have to implement buy with safeBatchTransfer

## Parameters:

- `id`:  number of NFT in collectible.

- `amountNFT`:  price of one NFT in ETH

# Function `activateResellID(uint256 id, bool activate)` {#eenftContract-activateResellID-uint256-bool-}

activate collection for resell. NFTs can only be resold when the entire collection is sold. 

## Parameters:

- `id`:  id of collection.

- `activate`:  if activate, customer can resell NFT of collection.

# Function `isIdActivateForResell(uint256 id) → bool` {#eenftContract-isIdActivateForResell-uint256-}

activate collectible for resell, NFTs can only be resold when the entire collection is sold. 

## Parameters:

- `id`:  id of collection.

## Return Values:

- true if collection activate for resell

# Function `reSell(uint256 id, uint256 amountNFT)` {#eenftContract-reSell-uint256-uint256-}

activate a collection for resell, withdraw is manage by back when the NFT is actually resold  

## Parameters:

- `id`:  id of collection.

- `amountNFT`:  number NFT of collection to resell

# Function `withdraw()` {#eenftContract-withdraw--}

withdraw ETH after resold.

# Function `transferTo(address payable addressToTransfer, uint256 amountToWithdraw)` {#eenftContract-transferTo-address-payable-uint256-}

transfer eth from contrat to address

## Parameters:

- `addressToTransfer`:  address that receives the funds  

- `amountToWithdraw`:  amount in ETH

# Function `receive()` {#eenftContract-receive--}

No description

# Event `EventCreatingCollectible(uint256 id, uint256 nftPriceUnit)` {#eenftContract-EventCreatingCollectible-uint256-uint256-}

When creating collectible

# Event `EventBuyingCollectible(address buyer, uint256 id, uint256 amountNFT)` {#eenftContract-EventBuyingCollectible-address-uint256-uint256-}

when customer bought a NFT

# Event `EventResellCollectible(address seller, uint256 id, uint256 amountNFT)` {#eenftContract-EventResellCollectible-address-uint256-uint256-}

when the customer resells a NFT

# Event `EventActivatedResellID(uint256 id, bool activate)` {#eenftContract-EventActivatedResellID-uint256-bool-}

When owner activate the resell

# Event `Eventwithdrawal(address addressWithdraw, uint256 amount)` {#eenftContract-Eventwithdrawal-address-uint256-}

When customer withdraw after resell

# Event `EventTransferTo(address addressToTransfert, uint256 amountToWithdraw)` {#eenftContract-EventTransferTo-address-uint256-}

 When transfert from contract to adress
