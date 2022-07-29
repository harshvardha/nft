//SPDX-License-Identifier:UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Code Eater", "CER") {}

    function mintNFT(address _recipient, string memory _tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 _newItemId = _tokenIds.current();
        _mint(_recipient, _newItemId);
        _setTokenURI(_newItemId, _tokenURI);
        return _newItemId;
    }
}
