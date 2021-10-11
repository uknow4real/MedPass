// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract Sensors is ChainlinkClient {
    using Chainlink for Chainlink.Request;
  
    uint256 private temp;
    
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
        jobId = "d5270d1c311941d0b08bead21fea7747";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)
    }
    
    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        // Set the URL to perform the GET request on
        request.add("get", "http://api-env.eba-jzmbf5ps.us-east-2.elasticbeanstalk.com/sensor/all");
        // Set the path to find the desired data in the API response, where the response format is:
        request.add("path", "sensors.0.temp");
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    } 
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, uint256 _temp) public recordChainlinkFulfillment(_requestId)
    {
        temp = _temp;
    }

    function getTemp() public view returns (uint256) {
        return temp;
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}