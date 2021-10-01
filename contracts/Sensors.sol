// SPDX-License-Identifier: MIT
pragma solidity = 0.8.7;

contract Sensors {
    struct Sensor {
        string key;
        int256 temp;
        int256 hum;
        uint256 timestamp;
    }

    function setData(string memory key, int256 temp, int256 hum) public{
        
    }
}