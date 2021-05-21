// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.8.4;

contract MedPass {
    address owner;

    string fullName;

    enum Condition {Negative, Positive}
    enum VaccineType {None, Moderna, Pfizer, AstraZeneca}
    
    struct Person {
        uint32 id;
        string name;
        uint bday;
        VaccineType vaccine;
        uint testCount;
    }
    
    // rename
    uint totalTestCount = 0;
    
    struct Test {
        uint32 id;
        address by_admin;
        uint32 patient_id;
        Condition condition;
        uint timestamp;
    }

    modifier onlyAdmin(){
        require(adminmapping[msg.sender] == true);
        _;
    }
    
    // struct mappings
    mapping (address => Person) private identity;
    mapping (address => bool) public adminmapping;
    mapping (uint => Test) public personTests;

    mapping (address => uint32) private addToID;
    mapping (uint32 => address) private idToAdd;

    // default person
    Person p = Person(1, "Your Name", 1621607249, VaccineType.None, 0);
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

    function getBday(address _owner) public view returns (uint) {
        return identity[_owner].bday;
    }

    function getVaccine(address _owner) public view returns (string memory _vaccine) {
        if (identity[_owner].vaccine == VaccineType.None) {
            return "None";
        }
        if (identity[_owner].vaccine == VaccineType.Moderna) {
            return "Moderna";
        }
        if (identity[_owner].vaccine == VaccineType.Pfizer) {
            return "Pfizer";
        }
        if (identity[_owner].vaccine == VaccineType.AstraZeneca) {
            return "AstraZeneca";
        }
    }

    function setPerson(string memory _fname, string memory _lname, uint _bday) public {
        // get address of account
        owner = msg.sender;

        // NAME
        // concantate First & Last Name into one string
        bytes memory s;
        s = abi.encodePacked(_fname);
        s = abi.encodePacked(s, " ");
        s = abi.encodePacked(s, _lname);
        fullName = string(s);
        // set name of person and map it to account address
        identity[owner].name = fullName;
        
        // ID
        uint32 id = getID(owner);
        addToID[owner] = id;
        idToAdd[id] = owner;

        // BDAY
        identity[owner].bday = _bday;
        // VACCINE
        identity[owner].vaccine  = VaccineType.None;
    }

    function setVaccine(uint32 _id, string memory _vaccine) public onlyAdmin {
        bytes memory vaccine = bytes(_vaccine);
        bytes32 Hash = keccak256(vaccine);
        if (Hash == keccak256("None")) {
            identity[idToAdd[_id]].vaccine  = VaccineType.None;
        }
        if (Hash == keccak256("Moderna")) {
            identity[idToAdd[_id]].vaccine  = VaccineType.Moderna;
        }
        if (Hash == keccak256("Pfizer")) {
            identity[idToAdd[_id]].vaccine  = VaccineType.Pfizer;
        }
        if (Hash == keccak256("AstraZeneca")) {
            identity[idToAdd[_id]].vaccine  = VaccineType.AstraZeneca;
        }
    }

    function setAdmin() public {
        require(!adminmapping[msg.sender]);
        adminmapping[msg.sender] = true;
    }

    function getByAdmin (address _owner) public view returns (address) {
        uint testID = identity[_owner].testCount;
        return personTests[testID].by_admin;
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

    function createTest(uint32 _id, string memory _condition) public onlyAdmin {
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