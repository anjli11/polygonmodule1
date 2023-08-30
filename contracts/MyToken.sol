// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract MyNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;

    string[] public _promptDescription;

    constructor() ERC721("AnjaliSikarwar", "AS") {
       _promptDescription= new string[](5);
        _promptDescription[0] ="Scooby do as superhero" ;
        _promptDescription[1] ="raining lofi in beautiful village of india drawing" ;
        _promptDescription[2] ="Cat playing with cute puppies  cartoon" ;
        _promptDescription[3] ="Cute Pizza with corn toppings Asthethic" ;
        _promptDescription[4] ="a man  playing pubg digital art" ;
    }

    function promptDescription(uint value) public view returns (string memory) {
        return _promptDescription[value];
    }

    function mint(address to, string memory ipfsUrl) public {
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId,ipfsUrl);
    }

}
