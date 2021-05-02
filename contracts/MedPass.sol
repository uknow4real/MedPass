// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.8.4;

contract MedPass {
    address owner;

    string fullName;

    enum Condition {Negative, Positive}

    struct Person {
        string name;
        uint32 id;
    }
    
    uint testCount = 0;
    
    struct Test {
        address tester_address;
        uint32 patient_id;
        Condition condition;
        uint timestamp;
    }

    modifier onlyDoctor(){
        //require();
        _;
    }
    
    mapping (address => string) private identity;
    mapping (address => Condition) private condition;
    mapping (address => uint32) private addToID;
    mapping (uint32 => address) private idToAdd;

    mapping (address => address) private approvedBy;

    mapping (address => uint) private testTimestamp;

    // default person
    Person p = Person("Your Name", 1);
    // default test
    Test t = Test(msg.sender, 1,Condition.Negative, block.timestamp);

    function getID(address _owner) public pure returns (uint32) {
        // returns ID of patient
        return uint32(uint256(keccak256(abi.encodePacked(_owner))));
    }

    function getName(address _owner) public view returns (string memory) {
        // returns full patient name which is mapped to the address
        return identity[_owner];
    }

    function setName(string memory _fname, string memory _lname) public {
        // get address of account
        owner = msg.sender;

        // concantate First & Last Name into one string
        bytes memory s;
        s = abi.encodePacked(_fname);
        s = abi.encodePacked(s, " ");
        s = abi.encodePacked(s, _lname);
        fullName = string(s);

        // set name of person and map it to account address
        p.name = fullName;
        identity[owner] = p.name;

        p.id = getID(owner);
        addToID[owner] = p.id;
        idToAdd[p.id] = owner;
    }

    function getCondition(address _owner) public view returns (string memory condi) {
        if (condition[_owner] == Condition.Positive) {
            return "Positive";
        }
        if (condition[_owner] == Condition.Negative) {
            return "Negative";
        }
    }

    function getTestTime(address _owner) public view returns (uint) {
        return testTimestamp[_owner];
    }

    
    function getTestCount() public view returns (uint) {
        return testCount;
    }

    function setCondition(uint32 _id, string memory _condition) public {
        approvedBy[idToAdd[_id]] = msg.sender;

        t.tester_address = approvedBy[idToAdd[_id]];
        // keccak256() only accept bytes as arguments, so we need explicit conversion
        bytes memory condi = bytes(_condition);
        bytes32 Hash = keccak256(condi);
            
        testCount ++;
        t.patient_id = _id;
        testTimestamp[idToAdd[_id]] = block.timestamp;

        if (Hash == keccak256("Negative")) {
            t.condition = Condition.Negative;
        }
        if (Hash == keccak256("Positive")) {
            t.condition = Condition.Positive;
        }
        condition[idToAdd[_id]] = t.condition;
    }

}