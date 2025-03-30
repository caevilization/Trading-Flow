// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TradingFlow - FlowFund
 * @dev A decentralized investment fund on BSC that enables users to invest tokens,
 * receive dividends, and manage withdrawals. Part of the TradingFlow ecosystem.
 * @author TradingFlow Team
 */
contract FlowFund is Ownable, ReentrancyGuard {
    IERC20 public immutable token;  // BSC token contract address
    address public immutable carryAddress; // Address for performance fee collection
    uint256 public constant CARRY_PERCENTAGE = 1500; // 15% in basis points (15.00%)
    uint256 public constant BASIS_POINTS = 10000;    // 100.00%

    struct Investor {
        uint256 totalInvestment;    // Total investment amount
        uint256 pendingDividends;   // Pending dividends to claim
        uint256 withdrawalAmount;   // Requested withdrawal amount
        uint256 withdrawalTime;     // Withdrawal request timestamp
        bool hasActiveWithdrawal;   // Flag for active withdrawal request
    }

    mapping(address => Investor) public investors;
    address[] public investorList;
    uint256 public totalFunds;      // Total funds in the pool
    uint256 public constant WITHDRAWAL_DELAY = 10 minutes;

    event Invested(address indexed investor, uint256 amount);
    event WithdrawalRequested(address indexed investor, uint256 amount, uint256 withdrawalTime);
    event WithdrawalProcessed(address indexed investor, uint256 amount);
    event DividendDistributed(uint256 totalAmount);
    event DividendClaimed(address indexed investor, uint256 amount, uint256 carryAmount);
    event CarryFeePaid(uint256 amount);

    /**
     * @dev Contract constructor
     * @param _token Address of the BSC token contract
     * @param _carryAddress Address to receive carry fees (15% of dividends)
     */
    constructor(address _token, address _carryAddress) Ownable(msg.sender) {
        require(_carryAddress != address(0), "Invalid carry address");
        token = IERC20(_token);
        carryAddress = _carryAddress;
    }

    /**
     * @dev Allows users to invest tokens into the fund
     * @param amount Amount of tokens to invest
     */
    function invest(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        if (investors[msg.sender].totalInvestment == 0) {
            investorList.push(msg.sender);
        }

        investors[msg.sender].totalInvestment += amount;
        totalFunds += amount;

        emit Invested(msg.sender, amount);
    }

    /**
     * @dev 查询可领取的分红
     */
    function getClaimableDividends() external view returns (uint256) {
        return investors[msg.sender].pendingDividends;
    }

    /**
     * @dev 预约取款
     * @param amount 取款金额
     */
    function requestWithdrawal(uint256 amount) external nonReentrant {
        Investor storage investor = investors[msg.sender];
        require(amount > 0 && amount <= investor.totalInvestment, "Invalid withdrawal amount");
        require(!investor.hasActiveWithdrawal, "Active withdrawal exists");

        investor.withdrawalAmount = amount;
        investor.withdrawalTime = block.timestamp + WITHDRAWAL_DELAY;
        investor.hasActiveWithdrawal = true;

        emit WithdrawalRequested(msg.sender, amount, investor.withdrawalTime);
    }

    /**
     * @dev Owner处理取款请求
     * @param investorAddress 投资人地址
     */
    function processWithdrawal(address investorAddress) external onlyOwner nonReentrant {
        Investor storage investor = investors[investorAddress];
        require(investor.hasActiveWithdrawal, "No active withdrawal");
        require(block.timestamp >= investor.withdrawalTime, "Withdrawal time not reached");

        uint256 amount = investor.withdrawalAmount;
        require(amount <= totalFunds, "Insufficient funds");

        investor.totalInvestment -= amount;
        totalFunds -= amount;
        investor.withdrawalAmount = 0;
        investor.withdrawalTime = 0;
        investor.hasActiveWithdrawal = false;

        require(token.transfer(investorAddress, amount), "Transfer failed");

        emit WithdrawalProcessed(investorAddress, amount);
    }

    /**
     * @dev Owner查询所有待处理的取款请求
     */
    function getPendingWithdrawals() external view onlyOwner returns (address[] memory, uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < investorList.length; i++) {
            if (investors[investorList[i]].hasActiveWithdrawal) {
                count++;
            }
        }

        address[] memory addresses = new address[](count);
        uint256[] memory amounts = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < investorList.length; i++) {
            address investorAddress = investorList[i];
            if (investors[investorAddress].hasActiveWithdrawal) {
                addresses[index] = investorAddress;
                amounts[index] = investors[investorAddress].withdrawalAmount;
                index++;
            }
        }

        return (addresses, amounts);
    }

    /**
     * @dev Owner分配分红
     */
    function distributeDividends() external onlyOwner nonReentrant {
        uint256 dividendAmount = token.balanceOf(address(this)) - totalFunds;
        require(dividendAmount > 0, "No dividends to distribute");

        for (uint256 i = 0; i < investorList.length; i++) {
            address investorAddress = investorList[i];
            Investor storage investor = investors[investorAddress];
            if (investor.totalInvestment > 0) {
                uint256 share = (dividendAmount * investor.totalInvestment) / totalFunds;
                investor.pendingDividends += share;
            }
        }

        emit DividendDistributed(dividendAmount);
    }

    /**
     * @dev Allows investors to claim their dividends with 15% carry fee
     */
    function claimDividends() external nonReentrant {
        uint256 amount = investors[msg.sender].pendingDividends;
        require(amount > 0, "No dividends to claim");

        uint256 carryAmount = (amount * CARRY_PERCENTAGE) / BASIS_POINTS;
        uint256 netAmount = amount - carryAmount;

        investors[msg.sender].pendingDividends = 0;
        
        require(token.transfer(carryAddress, carryAmount), "Carry transfer failed");
        require(token.transfer(msg.sender, netAmount), "Dividend transfer failed");

        emit DividendClaimed(msg.sender, netAmount, carryAmount);
        emit CarryFeePaid(carryAmount);
    }

    /**
     * @dev 查询投资人信息
     */
    function getInvestorInfo(address investorAddress) external view returns (
        uint256 totalInvestment,
        uint256 pendingDividends,
        uint256 withdrawalAmount,
        uint256 withdrawalTime,
        bool hasActiveWithdrawal
    ) {
        Investor memory investor = investors[investorAddress];
        return (
            investor.totalInvestment,
            investor.pendingDividends,
            investor.withdrawalAmount,
            investor.withdrawalTime,
            investor.hasActiveWithdrawal
        );
    }
}
