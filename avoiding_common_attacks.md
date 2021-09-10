# eenft Smartcontract

[eenft](https://www.eenft.io) is a platform that offers the possibility to buy non-fungible tokens (NFTs) created on the Ethereum Blockchain representing different categories of properties (real estate, parking, business, arts, renewable energies). More information in our [white paper](https://github.com/ElementEarth77/eenft/blob/master/Element_Earth_White_Paper.pdf).

This project is the solidity smartcontract that manages the NFTs.

## Avoiding common attack

 Note the current version is a POC and does not reflect the final version: This code is not guaranteed.

* The contract uses for the code security the [openzeppelin](https://github.com/OpenZeppelin) library, see SafeMath Ownable ReentrancyGuard. The version used is not audited but the previous version is. The code will still need to be audited before deployment.

* eenftContract.createCollectible can call by only [owner](https://github.com/fravoll/solidity-patterns/blob/master/docs/access_restriction.md).

* eenftContract.buy/eenftContract.resell : precaution for the transfer which is only possible for all methods that use allowTransfer modifier. To prevent [reentrancy](https://medium.com/@gus_tavo_guim/reentrancy-attack-on-smart-contracts-how-to-identify-the-exploitable-and-an-example-of-an-attack-4470a2d8dfe4) allowTransfer uses a require of the atomic state _unlockedTransfer in ERC1155eenft.


* eenftContract.withdraw() : use nonReentrant protection. We use [Pull over Push](https://github.com/fravoll/solidity-patterns/blob/master/docs/pull_over_push.md) pattern for withdraw.

* eenftContract.transferTo() : use onlyOwner nonReentrant.
