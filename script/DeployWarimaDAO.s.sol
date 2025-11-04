// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "../contracts/WarimaToken.sol";
import "../contracts/WarimaGovernor.sol";

contract DeployWarimaDAO is Script {
    function run() external {
        // Start broadcasting transactions
        vm.startBroadcast();

        // Deploy the token
        WarimaToken token = new WarimaToken(msg.sender);

        // Timelock parameters
        uint256 minDelay = 2 days; // Delay for queued operations

        // Proposers and Executors arrays
        address[] memory proposers = new address[](1);
        address[] memory executors = new address[](1);

        // Deployer is proposer and executor
        proposers[0] = msg.sender;
        executors[0] = msg.sender;

        // Deploy the TimelockController
        TimelockController timelock = new TimelockController(
            minDelay,
            proposers,
            executors,
            msg.sender
        );

        // Governor parameters
        uint48 votingDelay = 1;
        uint32 votingPeriod = 45818;
        uint256 proposalThreshold = 0;
        uint256 quorumPercentage = 4;

        // Deploy the Governor
        WarimaGovernor governor = new WarimaGovernor(
            token,
            timelock
            //votingDelay,
            //votingPeriod,
            //proposalThreshold,
            //quorumPercentage
        );

        // Grant roles to the Governor
        timelock.grantRole(timelock.PROPOSER_ROLE(), address(governor));
        timelock.grantRole(timelock.EXECUTOR_ROLE(), address(governor));

        // Renounce deployer admin role for full decentralization
        timelock.renounceRole(keccak256("TIMELOCK_ADMIN_ROLE"), msg.sender);

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
