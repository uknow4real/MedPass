// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract Sensors is ChainlinkClient {
    using Chainlink for Chainlink.Request;
  
    bytes32 private id;
    bytes32 private temp;
    bytes32 private hum;
    bytes32 private timestamp;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    
    /**
     * Network: Kovan
     * Oracle: 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8 (Chainlink Devrel   
     * Node)
     * Job ID: d5270d1c311941d0b08bead21fea7747
     * Fee: 0.1 LINK
     */

     // 0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b
     // 5a9a763ee1e44e729c30ec1d8252de05
    constructor() {
        setChainlinkToken(0xa36085F69e2889c224210F603D836748e7dC0088);
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
        jobId = "7401f318127148a894c00c292e486ffd";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)
    }
    
    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestData(string memory _id, uint32 _jobtype) public returns (bytes32 requestId) 
    {
        string memory call;
        string memory url;
        Chainlink.Request memory request;
        if (_jobtype == 0) {
            call = "id";
            request = buildChainlinkRequest(jobId, address(this), this.fulfillId.selector);
        }
        if (_jobtype == 1) {
            call = "temp";
            request = buildChainlinkRequest(jobId, address(this), this.fulfillTemp.selector);
        }
        if (_jobtype == 2) {
            call = "hum";
            request = buildChainlinkRequest(jobId, address(this), this.fulfillHum.selector);
        }
        if (_jobtype == 3) {
            call = "time";
            request = buildChainlinkRequest(jobId, address(this), this.fulfillTimestamp.selector);
        }
        bytes memory s;
        s = abi.encodePacked("http://api-env.eba-jzmbf5ps.us-east-2.elasticbeanstalk.com/sensor/");
        s = abi.encodePacked(s, _id);
        url = string(s);
        // Set the URL to perform the GET request on
        request.add("get", url);
        // Set the path to find the desired data in the API response, where the response format is:
        request.add("path", call);
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfillId(bytes32 _requestId, bytes32 _data) public recordChainlinkFulfillment(_requestId)
    {  
        id = _data;
    }
    
    function fulfillTemp(bytes32 _requestId, bytes32 _data) public recordChainlinkFulfillment(_requestId)
    {  
        temp = _data;
    }

    function fulfillHum(bytes32 _requestId, bytes32 _data) public recordChainlinkFulfillment(_requestId)
    {  
        hum = _data;
    }

    function fulfillTimestamp(bytes32 _requestId, bytes32 _data) public recordChainlinkFulfillment(_requestId)
    {  
        timestamp = _data;
    }

    function getData(uint32 _jobtype) public view returns (bytes32) {
        if (_jobtype == 0) {
            return id;
        }
        if (_jobtype == 1) {
            return temp;
        }
        if (_jobtype == 2) {
            return hum;
        }
        if (_jobtype == 3) {
            return timestamp;
        }
    }
}