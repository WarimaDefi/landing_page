// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @notice A decentralizes community savings vault
contract WarimaStokvelVault is Ownable {
    struct Member {
        bool exists;
        uint256 totalContributed;
        uint256 totalWithdrawn;
    }

    struct Stokvel {
        string name;
        address chairperson;
        address[] members;
        uint256 totalBalance;
        uint256 contributionAmount;
        uint256 nextPayoutIndex;
        bool isActive;
    }

    mapping(uint256 => Stokvel) public stokvels;
    mapping(uint256 => mapping(address => Member)) public members;
    uint256 public stokvelCount;

    // governance timelock that can execute sensitive functions
    address public timelock;

    // ---- Events ----
    event TimelockSet(address timelock);
    event StokvelCreated(uint256 stokvelId, string name, address chairperson, uint256 contributionAmount);
    event MemberJoined(uint256 stokvelId, address member);
    event ContributionMade(uint256 stokvelId, address member, uint256 amount);
    event PayoutMade(uint256 stokvelId, address member, uint256 amount);
    event StokvelClosed(uint256 stokvelId);
    event ContributionAmountChanged(uint256 stokvelId, uint256 newAmount);

    modifier onlyChairOrGovernance(uint256 stokvelId) {
        Stokvel storage s = stokvels[stokvelId];
        require(
            msg.sender == s.chairperson || msg.sender == timelock,
            "Only chairperson or governance timelock"
        );
        _;
    }

    constructor() Ownable(msg.sender) {}

    // ----Create a new stokvel ----
    function createStokvel(string memory name, uint256 contributionAmount) external {
        require(contributionAmount > 0, "Contribution must be greater than zero");

        stokvelCount++;
        Stokvel storage s = stokvels[stokvelCount];
        s.name = name;
        s.chairperson = msg.sender;
        s.contributionAmount = contributionAmount;
        s.isActive = true;
        s.nextPayoutIndex = 0;
        s.members.push(msg.sender);
        members[stokvelCount][msg.sender] = Member({ exists: true, totalContributed: 0, totalWithdrawn: 0 });

        emit StokvelCreated(stokvelCount, name, msg.sender, contributionAmount);
    }

    // ---- Join an existing stokvel ----
    function joinStokvel(uint256 stokvelId) external {
        Stokvel storage s = stokvels[stokvelId];
        require(s.isActive, "Stokvel not active");
        require(!members[stokvelId][msg.sender].exists, "Already joined");

        s.members.push(msg.sender);
        members[stokvelId][msg.sender] = Member({ exists:true, totalContributed: 0, totalWithdrawn: 0 });

        emit MemberJoined(stokvelId, msg.sender);
    }

    // ---- Contribute to the stokvel ----
    function contribute(uint256 stokvelId) external payable {
        Stokvel storage stokvel = stokvels[stokvelId];
        Member storage member = members[stokvelId][msg.sender];

        require(stokvel.isActive, "Stokvel not active");
        require(member.exists, "Not a member");
        require(msg.value == stokvel.contributionAmount, "Incorrect contribution amount");

        stokvel.totalBalance += msg.value;
        member.totalContributed += msg.value;

        emit ContributionMade(stokvelId, msg.sender, msg.value);
    }

    // ---- Make payout to the next member in rotation ----
    function payout(uint256 stokvelId) external onlyChairOrGovernance(stokvelId) {
        Stokvel storage s = stokvels[stokvelId];

        require(s.isActive, "Stokvel not active");
        require(s.totalBalance >= s.contributionAmount, "Insufficient balance for payout");

        address payable recipient = payable(s.members[s.nextPayoutIndex]);
        uint256 amount = s.contributionAmount;

        // update accounting before external call
        s.totalBalance -= amount;
        members[stokvelId][recipient].totalWithdrawn += amount;

        // use call pattern to send ETH
        (bool sent, ) = recipient.call{value: amount}("");
        require(sent, "ETH transfer failed");

        emit PayoutMade(stokvelId, recipient, amount);

        // Move to next member (loop back at end)
        s.nextPayoutIndex = (s.nextPayoutIndex + 1) % s.members.length;
    }

    // ---- Close stokvel (only chairperson) ---
    function closeStokvel(uint256 stokvelId) external onlyChairOrGovernance(stokvelId) {
        Stokvel storage s = stokvels[stokvelId];
        require(s.isActive, "Already closed");
        s.isActive = false;
        emit StokvelClosed(stokvelId);
    }

    // Example of a governance-only change (could be chair or governance)
    function setContributionAmount(uint256 stokvelId, uint256 newAmount) external onlyChairOrGovernance(stokvelId) {
        require(newAmount > 0, "Invalid amount");
        stokvels[stokvelId].contributionAmount = newAmount;
        emit ContributionAmountChanged(stokvelId, newAmount);
    }

    // ---- View stokvel members ---
    function getMembers(uint256 stokvelId) external view returns (address[] memory) {
        return stokvels[stokvelId].members;
    }

    // Allow the deployer or chairperson to set the timelock once
    function setTimelock(address _timelock) external onlyOwner {
        // let's allow stokvel creator / chair to set timelock
        // if you want global, you can add onlyOwner control
        require(_timelock != address(0), "Invalid timelock");
        timelock = _timelock;
        emit TimelockSet(_timelock);
    }

    // Fallback to accept ETH -not used, contributions use contribute()-
    receive() external payable {}
    fallback() external payable {}
}
