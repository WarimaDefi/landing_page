// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "../contracts/WarimaToken.sol";
import "../contracts/WarimaGovernor.sol";

contract DeployWarimaDAO is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy the token
        WarimaToken token = new WarimaToken(msg.sender);

        // Timelock parameters
        uint256 minDelay = 2 days; // Delay for queued operations

        // Proposers and Executors arrays
        address[] memory proposers = new address[](1);
        address[] memory executors = new address[](1);

        address admin = msg.sender;

        // Deployer is proposer and executor
        proposers[0] = admin;
        executors[0] = admin;

        // Deploy the TimelockController
        TimelockController timelock = new TimelockController(
            minDelay,
            proposers,
            executors,
            admin
        );

        // Deploy the Governor
        WarimaGovernor governor = new WarimaGovernor(token, timelock);

        // Grant roles to the Governor
        bytes32 proposerRole = timelock.PROPOSER_ROLE();
        timelock.grantRole(proposerRole, address(governor));

        bytes32 executorRole = timelock.EXECUTOR_ROLE();
        timelock.grantRole(executorRole, address(governor));

        bytes32 cancellerRole = timelock.CANCELLER_ROLE();
        timelock.grantRole(cancellerRole, address(governor));

        // Optional Renounce deployer admin role for full decentralization
        // timelock.renounceRole(keccak256("TIMELOCK_ADMIN_ROLE"), admin);
        // timelock.renouceRole(proposerRole, admin);
        // timelock.renounceRole(executorRole, admin);
        // timelock.renounceRole(cancellerRole, admin);

        // Renounce DEFAULT_ADMIN_ROLE
        // bytes32 adminRole = timelock.DEFAULT_ADMIN_ROLE();
        // timelock.renounceRole(adminRole, admin);

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
