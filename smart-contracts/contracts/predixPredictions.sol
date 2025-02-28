// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PredixPredictionMarket {
    struct Market {
        uint256 id;
        string question;
        uint256 pollId;           // Set to 0 for standalone markets.
        string[] options;         // Options to bet on.
        uint256[] totalBets;      // Total Ether bet per option.
        uint256 fund;             // Total Ether collected for this market.
        bool resolved;
        uint256 winningOption;    // Winning option index.
        // Tracks each user's bet for each option.
        mapping(uint256 => mapping(address => uint256)) bets;
    }
    
    uint256 public marketCount;
    mapping(uint256 => Market) internal markets;
    
    event MarketCreated(uint256 indexed marketId, string question, uint256 pollId, string[] options);
    event BetPlaced(uint256 indexed marketId, uint256 optionIndex, address indexed bettor, uint256 amount);
    event MarketResolved(uint256 indexed marketId, uint256 winningOption);
    
    /// @notice Create a new prediction market.
    /// @param _question The market question.
    /// @param _pollId The associated poll ID (set to 0 if standalone).
    /// @param _options Array of prediction options.
    function createMarket(
        string memory _question,
        uint256 _pollId,
        string[] memory _options
    ) external {
        require(_options.length >= 2, "At least two options required");
        marketCount++;
        Market storage market = markets[marketCount];
        market.id = marketCount;
        market.question = _question;
        market.pollId = _pollId;
        market.options = _options;
        market.totalBets = new uint256[](_options.length);
        market.resolved = false;
        market.winningOption = 0;
        market.fund = 0;
        
        emit MarketCreated(marketCount, _question, _pollId, _options);
    }
    
    /// @notice Place a bet on a prediction market option.
    /// @param _marketId The market identifier.
    /// @param _optionIndex The option index to bet on.
    function placeBet(uint256 _marketId, uint256 _optionIndex) external payable {
        Market storage market = markets[_marketId];
        require(!market.resolved, "Market is resolved");
        require(_optionIndex < market.options.length, "Invalid option");
        require(msg.value > 0, "Bet amount must be > 0");
        
        market.totalBets[_optionIndex] += msg.value;
        market.bets[_optionIndex][msg.sender] += msg.value;
        market.fund += msg.value;
        
        emit BetPlaced(_marketId, _optionIndex, msg.sender, msg.value);
    }
    
    /// @notice Resolve a prediction market by declaring the winning option.
    /// @param _marketId The market identifier.
    /// @param _winningOption The index of the winning option.
    function resolveMarket(uint256 _marketId, uint256 _winningOption) external {
        Market storage market = markets[_marketId];
        require(!market.resolved, "Market already resolved");
        require(_winningOption < market.options.length, "Invalid option");
        
        market.resolved = true;
        market.winningOption = _winningOption;
        
        emit MarketResolved(_marketId, _winningOption);
    }
    
    /// @notice Claim reward for winning bets in a resolved market.
    /// @param _marketId The market identifier.
    function claimReward(uint256 _marketId) external {
        Market storage market = markets[_marketId];
        require(market.resolved, "Market not resolved yet");
        uint256 winningOption = market.winningOption;
        uint256 userBet = market.bets[winningOption][msg.sender];
        require(userBet > 0, "No winning bet to claim");
        
        // Calculate reward: user's share of the total fund based on their bet proportion.
        uint256 totalWinningBets = market.totalBets[winningOption];
        uint256 reward = (userBet * market.fund) / totalWinningBets;
        
        // Prevent re-entrancy by zeroing the user bet before transfer.
        market.bets[winningOption][msg.sender] = 0;
        payable(msg.sender).transfer(reward);
    }
}
