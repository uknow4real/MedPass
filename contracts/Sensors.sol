// SPDX-License-Identifier: MIT
pragma solidity =0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract Sensors is ChainlinkClient {
    uint256 public volumn;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    struct Sensor {
        string key;
        int256 temp;
        int256 hum;
        uint256 timestamp;
    }
    /*
    constructor() public {
        setChainlinkToken(address);
        address = 0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b;
        jobId = "8b3e10eeff87453a8d5960a0e0ff4562";
        fee = 0.1 * 10 ** 18; // 0.1 LINK;
    }

    function setData(
        string memory key,
        int256 temp,
        int256 hum
    ) public {
        ChainlinkRequestInterface memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        request.add("post", "");
    }

    function fulfill(bytes32 _requestId, uint256 _volumn)
        public
        recordChainlinkFulfillment(_requestId)
    {
        volumn = _volumn;
    }
*/
}
