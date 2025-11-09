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

        address deployer = msg.sender;

        // Deploy the token
        WarimaToken token = new WarimaToken(deployer);

        // Timelock parameters
        uint256 minDelay = 2 days;

        // Create arrays with deployer as the only admin
        address[] memory proposers = new address[](0);
        address[] memory executors = new address[](0);
        address[] memory admins = new address[](1);
        admins[0] = deployer;

        // Deploy Timelock with deployer as admin
        TimelockController timelock = new TimelockController(
            minDelay,
            proposers,
            executors,
            deployer  // This makes deployer the admin
        );

        // Deploy the Governor
        WarimaGovernor governor = new WarimaGovernor(token, timelock);

        // Now grant roles to governor - deployer should have admin role
        bytes32 proposerRole = timelock.PROPOSER_ROLE();
        bytes32 executorRole = timelock.EXECUTOR_ROLE();
        bytes32 cancellerRole = timelock.CANCELLER_ROLE();

        timelock.grantRole(proposerRole, address(governor));
        timelock.grantRole(executorRole, address(governor));
        timelock.grantRole(cancellerRole, address(governor));

        // Also grant proposer role to deployer if you want to retain proposal capability
        timelock.grantRole(proposerRole, deployer);

        console.log("WarimaToken deployed at:", address(token));
        console.log("TimelockController deployed at:", address(timelock));
        console.log("WarimaGovernor deployed at:", address(governor));

        vm.stopBroadcast();
    }
}
