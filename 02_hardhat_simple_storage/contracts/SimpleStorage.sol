// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract SimpleStorage {
    uint256 public favouriteNumber;

    function store(uint256 _favouriteNumber) public virtual {
        favouriteNumber = _favouriteNumber;
    }

    struct People {
        uint256 favouriteNumber;
        string name;
    }
    mapping(string => uint256) public nameToFavouriteNumber;

    People[] public people; // dynamic array

    // specify data location for _favouriteNumber (reference type)
    function addPerson(string memory _name, uint256 _favouriteNumber) public {
        people.push(People({name: _name, favouriteNumber: _favouriteNumber}));
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }
}
