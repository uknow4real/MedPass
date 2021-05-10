// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.8.4;

contract MedPass {
    address owner;

    string fullName;

    enum Condition {Negative, Positive}

    struct Person {
        uint32 id;
        bool isRegistered;
        string name;
        uint testCount;
    }
    
    // rename
    uint totalTestCount = 0;
    
    struct Test {
        uint32 id;
        address tester_address;
        uint32 patient_id;
        Condition condition;
        uint timestamp;
    }

    modifier onlyDoctor(){
        //require();
        _;
    }
    
    // struct mappings
    mapping (address => Person) private identity;
    mapping (uint => Test) public personTests;

    mapping (address => uint32) private addToID;
    mapping (uint32 => address) private idToAdd;

    mapping (address => address) private approvedBy;

    // default person
    Person p = Person(1, false, "Your Name", 0);
    // default test
    Test t = Test(0, msg.sender, 1, Condition.Negative, block.timestamp);

    function getID(address _owner) public pure returns (uint32) {
        // returns ID of patient
        return uint32(uint256(keccak256(abi.encodePacked(_owner))));
    }

    function getName(address _owner) public view returns (string memory) {
        // returns full patient name which is mapped to the address
        return identity[_owner].name;
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
        identity[owner].name = fullName;

        uint32 id = getID(owner);
        addToID[owner] = id;
        idToAdd[id] = owner;

        if (identity[owner].isRegistered == false) {
            identity[owner].testCount = 0;
            identity[owner].isRegistered = true;
        }
    }

    function getCondition(address _owner) public view returns (string memory condi) {
        uint testID = identity[_owner].testCount;
        if (personTests[testID].condition == Condition.Positive) {
            return "Positive";
        }
        if (personTests[testID].condition == Condition.Negative) {
            return "Negative";
        }
    }

    function getTestTime(address _owner) public view returns (uint) {
        uint testID = identity[_owner].testCount;
        return personTests[testID].timestamp;
    }

    function getTestCount(address _owner) public view returns (uint) {
        uint testID = identity[_owner].testCount;
        return testID;
    }
    
    function getTotalTestCount() public view returns (uint) {
        return totalTestCount;
    }

    /*function setCondition(uint32 _id, string memory _condition) public {
        approvedBy[idToAdd[_id]] = msg.sender;

        t.tester_address = approvedBy[idToAdd[_id]];
        // keccak256() only accept bytes as arguments, so we need explicit conversion
        bytes memory condi = bytes(_condition);
        bytes32 Hash = keccak256(condi);
            
        totalTestCount++;
        t.patient_id = _id;
        personTests[idToAdd[_id]].timestamp = block.timestamp;

        if (Hash == keccak256("Negative")) {
            t.condition = Condition.Negative;
        }
        if (Hash == keccak256("Positive")) {
            t.condition = Condition.Positive;
        }
        personTests[idToAdd[_id]] = t.condition;
    }*/

    function createTest(uint32 _id, string memory _condition) public {
        approvedBy[idToAdd[_id]] = msg.sender;
        // keccak256() only accept bytes as arguments, so we need explicit conversion
        bytes memory condi = bytes(_condition);
        bytes32 Hash = keccak256(condi);

        uint32 id = uint32(uint256(keccak256(abi.encodePacked(idToAdd[_id],block.timestamp))));

        totalTestCount++;
        identity[idToAdd[_id]].testCount += 1;
        uint testCount = identity[idToAdd[_id]].testCount;

        personTests[testCount].timestamp = block.timestamp;

        if (Hash == keccak256("Negative")) {
            t.condition = Condition.Negative;
        }
        if (Hash == keccak256("Positive")) {
            t.condition = Condition.Positive;
        }
        personTests[testCount].condition = t.condition;
        Test memory test = Test(id, msg.sender, _id, personTests[testCount].condition, block.timestamp);
        
        personTests[testCount] = test;
    }
}