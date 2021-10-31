// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract MedPass {
    address owner;

    enum Condition {
        Negative,
        Positive
    }
    enum VaccineType {
        None,
        Moderna,
        Pfizer,
        AstraZeneca
    }

    struct Vaccine {
        VaccineType vaccine;
        uint256 amount;
    }

    struct Person {
        bool registered;
        uint32 id;
        string name;
        int256 bday;
        VaccineType vaccine;
        uint256 testCount;
        uint256 v_required;
    }

    // rename
    uint256 totalTestCount = 0;

    struct Test {
        uint32 id;
        address by_admin;
        uint32 patient_id;
        Condition condition;
        uint256 timestamp;
    }

    modifier onlyAdmin() {
        require(adminmapping[msg.sender] == true);
        _;
    }

    // struct mappings
    mapping(address => Person) private identity;
    mapping(address => bool) public adminmapping;
    mapping(uint256 => Test) public personTests;
    mapping(VaccineType => uint256) public v_amount;

    mapping(address => uint32) private addToID;
    mapping(uint32 => address) private idToAdd;

    // default person
    Person p =
        Person(false, 1, "Your Name", 1621607249, VaccineType.None, 0, 2);
    // default test
    Test t = Test(0, msg.sender, 1, Condition.Negative, block.timestamp);

    function setPerson(
        string memory _fname,
        string memory _lname,
        int256 _bday
    ) public {
        // get address of account
        owner = msg.sender;

        // NAME
        // concatenate First & Last Name into one string
        bytes memory s;
        s = abi.encodePacked(_fname);
        s = abi.encodePacked(s, " ");
        s = abi.encodePacked(s, _lname);
        string memory fullName = string(s);
        // set name of person and map it to account address
        identity[owner].name = fullName;
        // ID
        uint32 id = getID(owner);
        addToID[owner] = id;
        idToAdd[id] = owner;
        // BDAY
        identity[owner].bday = _bday;
        // VACCINE
        if (!identity[owner].registered) {
            identity[owner].vaccine = VaccineType.None;
            identity[owner].v_required = 2;
        }
        identity[owner].registered = true;
    }

    function setAdmin() public {
        require(!adminmapping[msg.sender]);
        adminmapping[msg.sender] = true;
    }

    function setVaccine(uint32 _id, string memory _vaccine) public onlyAdmin {
        bytes memory vaccine = bytes(_vaccine);
        bytes32 Hash = keccak256(vaccine);
        if (Hash == keccak256("None")) {
            identity[idToAdd[_id]].vaccine = VaccineType.None;
        }
        if (Hash == keccak256("Moderna")) {
            identity[idToAdd[_id]].vaccine = VaccineType.Moderna;
        }
        if (Hash == keccak256("Pfizer")) {
            identity[idToAdd[_id]].vaccine = VaccineType.Pfizer;
        }
        if (Hash == keccak256("AstraZeneca")) {
            identity[idToAdd[_id]].vaccine = VaccineType.AstraZeneca;
        }
        v_amount[identity[idToAdd[_id]].vaccine] -= 1;
        identity[idToAdd[_id]].v_required -= 1;
    }

    function addV_amount(string memory _type, uint256 _amount)
        public
        onlyAdmin
    {
        bytes memory vtype = bytes(_type);
        bytes32 Hash = keccak256(vtype);
        if (Hash == keccak256("Moderna")) {
            Vaccine memory moderna = Vaccine(VaccineType.Moderna, _amount);
            v_amount[moderna.vaccine] += moderna.amount;
        }
        if (Hash == keccak256("Pfizer")) {
            Vaccine memory pfizer = Vaccine(VaccineType.Pfizer, _amount);
            v_amount[pfizer.vaccine] += pfizer.amount;
        }
        if (Hash == keccak256("AstraZeneca")) {
            Vaccine memory astrazeneca = Vaccine(
                VaccineType.AstraZeneca,
                _amount
            );
            v_amount[astrazeneca.vaccine] += astrazeneca.amount;
        }
    }

    function subV_amount(string memory _type, uint256 _amount)
        public
        onlyAdmin
    {
        bytes memory vtype = bytes(_type);
        bytes32 Hash = keccak256(vtype);
        if (Hash == keccak256("Moderna")) {
            Vaccine memory moderna = Vaccine(VaccineType.Moderna, _amount);
            v_amount[moderna.vaccine] -= moderna.amount;
        }
        if (Hash == keccak256("Pfizer")) {
            Vaccine memory pfizer = Vaccine(VaccineType.Pfizer, _amount);
            v_amount[pfizer.vaccine] -= pfizer.amount;
        }
        if (Hash == keccak256("AstraZeneca")) {
            Vaccine memory astrazeneca = Vaccine(
                VaccineType.AstraZeneca,
                _amount
            );
            v_amount[astrazeneca.vaccine] -= astrazeneca.amount;
        }
    }

    function createTest(uint32 _id, string memory _condition) public onlyAdmin {
        // keccak256() only accept bytes as arguments, so we need explicit conversion
        bytes memory condi = bytes(_condition);
        bytes32 Hash = keccak256(condi);

        uint32 id = uint32(
            uint256(keccak256(abi.encodePacked(idToAdd[_id], block.timestamp)))
        );

        totalTestCount++;
        identity[idToAdd[_id]].testCount += 1;
        uint256 testCount = identity[idToAdd[_id]].testCount;

        personTests[testCount].timestamp = block.timestamp;

        if (Hash == keccak256("Negative")) {
            t.condition = Condition.Negative;
        }
        if (Hash == keccak256("Positive")) {
            t.condition = Condition.Positive;
        }
        personTests[testCount].condition = t.condition;
        Test memory test = Test(
            id,
            msg.sender,
            _id,
            personTests[testCount].condition,
            block.timestamp
        );

        personTests[testCount] = test;
    }

    function getID(address _owner) public pure returns (uint32) {
        // returns ID of patient
        return uint32(uint256(keccak256(abi.encodePacked(_owner))));
    }

    function getName(address _owner) public view returns (string memory) {
        // returns full patient name which is mapped to the address
        return identity[_owner].name;
    }

    function getBday(address _owner) public view returns (int256) {
        return identity[_owner].bday;
    }

    function getV_Required(address _owner) public view returns (uint256) {
        return identity[_owner].v_required;
    }

    function getVaccine(address _owner)
        public
        view
        returns (string memory _vaccine)
    {
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

    function getByAdmin(address _owner) public view returns (address) {
        uint256 testID = identity[_owner].testCount;
        return personTests[testID].by_admin;
    }

    function getCondition(address _owner)
        public
        view
        returns (string memory condi)
    {
        uint256 testID = identity[_owner].testCount;
        if (personTests[testID].condition == Condition.Positive) {
            return "Positive";
        }
        if (personTests[testID].condition == Condition.Negative) {
            return "Negative";
        }
    }

    function getTestTime(address _owner) public view returns (uint256) {
        uint256 testID = identity[_owner].testCount;
        return personTests[testID].timestamp;
    }

    function getTestCount(address _owner) public view returns (uint256) {
        uint256 testcount = identity[_owner].testCount;
        return testcount;
    }

    function getTotalTestCount() public view returns (uint256) {
        return totalTestCount;
    }

    function getV_amount(string memory _type)
        public
        view
        returns (uint256 amount)
    {
        bytes memory vtype = bytes(_type);
        bytes32 Hash = keccak256(vtype);
        if (Hash == keccak256("Moderna")) {
            return v_amount[VaccineType.Moderna];
        }
        if (Hash == keccak256("Pfizer")) {
            return v_amount[VaccineType.Pfizer];
        }
        if (Hash == keccak256("AstraZeneca")) {
            return v_amount[VaccineType.AstraZeneca];
        }
    }

    function getRegistered(address _owner) public view returns (bool) {
        bool isregistered = identity[_owner].registered;
        return isregistered;
    }

    // --------------- SENSOR ------------------
    struct Sensor {
        bytes32 id;
        uint256 temp;
        uint256 hum;
        uint256 time;
    }

    mapping(bytes32 => Sensor) public sensors;

    function writeData(bytes32 _id, bytes32 _temp, bytes32 _hum, bytes32 _time) public onlyAdmin {
        sensors[_id].id = _id;
        sensors[_id].temp = uint(_temp);
        sensors[_id].hum = uint(_hum);
        sensors[_id].time = uint(_time);
    }

    /*function getID(string memory _id) public view onlyAdmin returns (string memory) {
        return sensors[_id].id;
    }

    function getTemp(string memory _id) public view onlyAdmin returns (uint32) {
        return sensors[_id].temp;
    }

    function getHum(string memory _id) public view onlyAdmin returns (uint32) {
        return sensors[_id].hum;
    }

    function getTime(string memory _id) public view onlyAdmin returns (int256) {
        return sensors[_id].time;
    }*/
}
