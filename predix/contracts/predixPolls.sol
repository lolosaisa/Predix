// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// this contract will support the creation of both public and private polls.
//For private polls whitelist is set at creation, votes are stored in an array for each poll option.

contract PredixPolls {

    //type of poll: public are open and privat are whitelisted.
    enum PollType {Private, Public} 

    struct Poll {
        uint id;
        string title;
        string[] options;
        uint[] votes;
        address creator;
        PollType pollType;
        bool isClosed;

        //mappings for the per poll acccess control and vote tracking
        mapping(address => bool) hasVoted;
        mapping(address => bool) whitelist;
    }

    uint public pollCount;
    mapping(uint256 => Poll) internal polls;
   // mapping(uint => mapping(address => bool)) public hasVoted;

    event PollCreated(uint256 indexed pollId, string title, string[] options, PollType pollType);
    event Voted(uint256 indexed pollId, uint256 optionIndex, address voter);
    event PollClosed(uint indexed pollId);

    modifier onlyCreator(uint _pollId) {
        require(msg.sender == polls[_pollId].creator, "Not poll creator");
        _;
    }

    // @notice Create a new poll. For Private polls, provide a non-empty whitelist.
    // @param _title The poll question.
    // @param _options Array of answer options (at least two).
    // @param _pollType 0 for Public, 1 for Private.
    // @param _whitelist Addresses allowed to vote (only needed for Private polls)


    function createPoll(string memory _title, string[] memory _options, PollType _pollType, address[] memory _whitelist) public {
        require(_options.length >= 2, "Must have at least 2 options");

        pollCount++;
        Poll storage newPoll = polls[pollCount];
        newPoll.id = pollCount;
        newPoll.title = _title;
        newPoll.options = _options;
        //newPoll.votes = new uint[](_options.length);
        newPoll.creator = msg.sender;
        newPoll.pollType = _pollType;
        newPoll.isClosed = false;

        //initialize votes array with zeros for each option.
        newPoll.votes = new uint256[](_options.length);

        //if the poll is private we requre and set whitelist.
        if (_pollType == PollType.Private){
            require(_whitelist.length > 0, "whitelist is required for private polls");
            for (uint256 i = 0; i < _whitelist.length; i++){
                newPoll.whitelist[_whitelist[i]] = true;
            }

        }

        emit PollCreated(pollCount, _title, _pollType, _options);
    }

     /// @notice Cast a vote in a poll.
    /// @param _pollId The poll identifier.
    /// @param _optionIndex The index of the chosen option.

    //function vote(uint _pollId, uint _optionIndex) public {
        //Poll storage poll = polls[_pollId];

       // require(!polls[_pollId].isClosed, "Poll is closed");
        //require(!hasVoted[_pollId][msg.sender], "Already voted");
        //require(_optionIndex < polls[_pollId].options.length, "Invalid option");

        //For the private Polls
      //  if (poll.pollType == pollType.Private){
           // require(poll.whitelist[msg.sender], "Not Authorized to vote in this poll");
       // }


       // polls[_pollId].votes[_optionIndex]++;
        //polls.votes[_optionIndex ] += 1; this functions the same as the line above
        //hasVoted[_pollId][msg.sender] = true;

        //emit Voted(_pollId, _optionIndex, msg.sender);
    //}
    /// @notice Cast a vote in a poll.
    /// @param _pollId The poll identifier.
    /// @param _optionIndex The index of the chosen option.
    function vote(uint256 _pollId, uint256 _optionIndex) external {
        Poll storage poll = polls[_pollId];

        require(!poll.isClosed, "Poll is closed");
        require(_optionIndex < poll.options.length, "Invalid option");
        require(!poll.hasVoted[msg.sender], "Already voted");
        
        // For private polls, verify that sender is whitelisted.
         if (poll.pollType == PollType.Private) {
            require(poll.whitelist[msg.sender], "Not authorized to vote in this poll");
            }
        
         poll.votes[_optionIndex] += 1;
         poll.hasVoted[msg.sender] = true;
        
       emit Voted(_pollId, _optionIndex, msg.sender);
    }




     /// @notice Close a poll to prevent further voting.
    /// @param _pollId The poll identifier.

    //function closePoll(uint256 _pollId) public onlyCreator(_pollId) {
       // polls[_pollId].isClosed = true;
      //  emit PollClosed(_pollId);
    //}
     
     function closePoll(uint256 _pollId) external {
        Poll storage poll = polls[_pollId];
        require(msg.sender == poll.creator, "Only creator can close poll");
        require(!poll.isClosed, "Poll already closed");
        poll.isClosed = true;
        emit PollClosed(_pollId);
    }

     //getting the votes of the closed id

    function getPollResults(uint256 _pollId) public view returns (string memory title, uint256[] memory votes) {
        Poll storage poll = Poll[_pollId];
        return (polls[_pollId].title, polls[_pollId].votes);
    }
}
