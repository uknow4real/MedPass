// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract Sensors is ChainlinkClient {
    using Chainlink for Chainlink.Request;
  
    bytes32 private data;
  
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
        bytes memory s;
        s = abi.encodePacked("sensors.");
        s = abi.encodePacked(s, _id);
        if (_jobtype == 0) {
            s = abi.encodePacked(s, ".id");
        }
        if (_jobtype == 1) {
            s = abi.encodePacked(s, ".temp");
        }
        if (_jobtype == 2) {
            s = abi.encodePacked(s, ".hum");
        }
        if (_jobtype == 3) {
            s = abi.encodePacked(s, ".time");
        }
        string memory call = string(s);
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        // Set the URL to perform the GET request on
        request.add("get", "http://api-env.eba-jzmbf5ps.us-east-2.elasticbeanstalk.com/sensor/all");
        // request.add("headers", "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwN2QzYWI3NWU3OCIsInB3ZCI6MSwiaWF0IjoxNjM1NDMxNzg5LCJleHAiOjE2MzU0MzE4MTl9.aBSILvJec18zcqapUxwqWIBhykKP0bc5fA3GxQ2rk8w");
        // Set the path to find the desired data in the API response, where the response format is:
        request.add("path", call);
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, bytes32 _data) public recordChainlinkFulfillment(_requestId)
    {  
        data = _data;
    }
    
    function getData() public view returns (bytes32) {
        return data;
    }
}