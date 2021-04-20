// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.8.3;

contract MedPass {
    address owner;

    string fullName;

    struct Person {
        string name;
        bool state;
    }

    mapping (address => string) private identity; 

    function getName() public view returns (string memory) {
        return identity[owner];
    }

    function setName(string memory _fname, string memory _lname) public {
        owner = msg.sender;
        //fullName = string(abi.encodePacked(_fname, _lname));

        bytes memory s;
        s = abi.encodePacked(_fname);
        s = abi.encodePacked(s, " ");
        s = abi.encodePacked(s, _lname);
        fullName = string(s);

        Person memory p = Person(fullName, false);
        identity[owner] = p.name;
    }

}