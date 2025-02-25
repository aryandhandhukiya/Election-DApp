pragma solidity >=0.4.22 <0.8.0;

contract Election {
    
    // Model a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;

    // Store candidates
    mapping(uint => Candidate) public candidates;

    // Store candidates count
    uint public candidatesCount;

    // Event to emit when a vote is cast
    event votedEvent(uint indexed candidateId);

    // Constructor
    constructor() public {
        addCandidate("Alice"); // Example candidate
        addCandidate("Bob");   // Example candidate
    }

    // Function to add a candidate
    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function getCandidate(uint _id) public view returns (uint, string memory, uint) {
        require(_id > 0 && _id <= candidatesCount, "Candidate does not exist");
        Candidate memory candidate = candidates[_id];
        return (candidate.id, candidate.name, candidate.voteCount);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender], "You have already voted!");

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate!");

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
