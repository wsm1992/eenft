Implementation of the basic standard multi-token to comply with NFTmable's management rules.

See https://eips.ethereum.org/EIPS/eip-1155

Originally based on code by Enjin: https://github.com/enjin/erc-1155

_This basis is inspired by openzeppelin ERC1155 v3.3.0_

# Functions:

- [`constructor(string uri_)`](#ERC1155eenft-constructor-string-)

- [`uri(uint256)`](#ERC1155eenft-uri-uint256-)

- [`balanceOf(address account, uint256 id)`](#ERC1155eenft-balanceOf-address-uint256-)

- [`balanceOfBatch(address[] accounts, uint256[] ids)`](#ERC1155eenft-balanceOfBatch-address---uint256---)

- [`setApprovalForAll(address operator, bool approved)`](#ERC1155eenft-setApprovalForAll-address-bool-)

- [`isApprovedForAll(address account, address operator)`](#ERC1155eenft-isApprovedForAll-address-address-)

- [`safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)`](#ERC1155eenft-safeTransferFrom-address-address-uint256-uint256-bytes-)

- [`safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)`](#ERC1155eenft-safeBatchTransferFrom-address-address-uint256---uint256---bytes-)

# Events:

- [`EventSetApprovalForAll(address operator, bool approved)`](#ERC1155eenft-EventSetApprovalForAll-address-bool-)

- [`EventIsApprovedForAll(address account, address operator)`](#ERC1155eenft-EventIsApprovedForAll-address-address-)

# Function `constructor(string uri_)` {#ERC1155eenft-constructor-string-}

See {_setURI}.

# Function `uri(uint256) → string` {#ERC1155eenft-uri-uint256-}

See {IERC1155MetadataURI-uri}.

This implementation returns the same URI for *all* token types. It relies

on the token type ID substitution mechanism

https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP].

Clients calling this function must replace the `\{id\}` substring with the

actual token type ID.

# Function `balanceOf(address account, uint256 id) → uint256` {#ERC1155eenft-balanceOf-address-uint256-}

See {IERC1155-balanceOf}.

Requirements:

- `account` cannot be the zero address.

# Function `balanceOfBatch(address[] accounts, uint256[] ids) → uint256[]` {#ERC1155eenft-balanceOfBatch-address---uint256---}

See {IERC1155-balanceOfBatch}.

Requirements:

- `accounts` and `ids` must have the same length.

# Function `setApprovalForAll(address operator, bool approved)` {#ERC1155eenft-setApprovalForAll-address-bool-}

See {IERC1155-setApprovalForAll}.

# Function `isApprovedForAll(address account, address operator) → bool` {#ERC1155eenft-isApprovedForAll-address-address-}

See {IERC1155-isApprovedForAll}.

Allows only transfers to or from OwnerNFT

All transfers are managed by eenftContract with the attribute lockedTransfert

# Function `safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)` {#ERC1155eenft-safeTransferFrom-address-address-uint256-uint256-bytes-}

See {IERC1155-safeTransferFrom}.

Must overide this method and use allowTransfer() modifier

# Function `safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)` {#ERC1155eenft-safeBatchTransferFrom-address-address-uint256---uint256---bytes-}

See {IERC1155-safeBatchTransferFrom}.

# Event `EventSetApprovalForAll(address operator, bool approved)` {#ERC1155eenft-EventSetApprovalForAll-address-bool-}

No description

# Event `EventIsApprovedForAll(address account, address operator)` {#ERC1155eenft-EventIsApprovedForAll-address-address-}

No description
