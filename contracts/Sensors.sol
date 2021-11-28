// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract Sensors is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    bytes32 private id;
    bytes32 private temp;
    bytes32 private hum;
    bytes32 private timestamp;

    // This is where you'll save each response from the
    // nodes you've chosen in a list, and then you can
    // take the median of those nodes
    uint256 private index;
    uint256[3] private currentDataList;

    address private oracle1 = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
    bytes32 private jobId1 = "7401f318127148a894c00c292e486ffd";

    address private oracle2 = 0x56dd6586DB0D08c6Ce7B2f2805af28616E082455;
    bytes32 private jobId2 = "c128fbb0175442c8ba828040fdd1a25e";

    address private oracle3 = 0xe0090e7AB96123FDE1D3CC8b3f3b342B4aA60a2E;
    bytes32 private jobId3 = "98f5b10ce2a843b6b7e892fadb5921be";

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
        currentDataList[0] = 0;
        currentDataList[1] = 0;
        currentDataList[2] = 0;
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestSingleData(
        address _address,
        bytes32 _jobId,
        string memory _id,
        uint32 _jobtype
    ) private returns (bytes32 requestId) {
        string memory call;
        string memory url;
        Chainlink.Request memory request;
        if (_jobtype == 0) {
            call = "id";
            request = buildChainlinkRequest(
                _jobId,
                address(this),
                this.fulfillId.selector
            );
        }
        if (_jobtype == 1) {
            call = "temp";
            request = buildChainlinkRequest(
                _jobId,
                address(this),
                this.fulfillTemp.selector
            );
        }
        if (_jobtype == 2) {
            call = "hum";
            request = buildChainlinkRequest(
                _jobId,
                address(this),
                this.fulfillHum.selector
            );
        }
        if (_jobtype == 3) {
            call = "time";
            request = buildChainlinkRequest(
                _jobId,
                address(this),
                this.fulfillTimestamp.selector
            );
        }
        bytes memory s;
        s = abi.encodePacked(
            "http://api-env.eba-jzmbf5ps.us-east-2.elasticbeanstalk.com/sensor/"
        );
        s = abi.encodePacked(s, _id);
        url = string(s);
        // Set the URL to perform the GET request on
        request.add("get", url);
        // Set the path to find the desired data in the API response, where the response format is:
        request.add("path", call);
        // Sends the request
        return sendChainlinkRequestTo(_address, request, 0.1 * 10**18);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfillId(bytes32 _requestId, bytes32 _data)
        public
        recordChainlinkFulfillment(_requestId)
    {
        id = _data;
    }

    function fulfillTemp(bytes32 _requestId, bytes32 _data)
        public
        recordChainlinkFulfillment(_requestId)
    {
        temp = _data;
    }

    function fulfillHum(bytes32 _requestId, bytes32 _data)
        public
        recordChainlinkFulfillment(_requestId)
    {
        hum = _data;
    }

    function fulfillTimestamp(bytes32 _requestId, bytes32 _data)
        public
        recordChainlinkFulfillment(_requestId)
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

    function requestData(string memory _id, uint32 _jobtype) public {
        requestSingleData(oracle1, jobId1, _id, _jobtype);
        requestSingleData(oracle2, jobId2, _id, _jobtype);
        requestSingleData(oracle3, jobId3, _id, _jobtype);
    }

    function median() private view returns (uint256) {
        if (currentDataList[0] > currentDataList[1]) {
            if (currentDataList[0] > currentDataList[2]) {
                if (currentDataList[1] > currentDataList[2]) {
                    return currentDataList[1];
                } else {
                    return currentDataList[2];
                }
            } else {
                return currentDataList[0];
            }
        } else if (currentDataList[1] > currentDataList[2]) {
            return currentDataList[2];
        }
        return currentDataList[1];
    }
}
