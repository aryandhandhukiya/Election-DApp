App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: async function() {
      console.log("✅ App initialized...");
      return await App.initWeb3();
  },

  initWeb3: async function() {
      console.log("🌐 Initializing Web3...");
      
      if (typeof window.ethereum !== 'undefined') {
          console.log("✅ MetaMask detected!");
          window.web3 = new Web3(window.ethereum);
          try {
              await window.ethereum.request({ method: "eth_requestAccounts" });
              console.log("✅ Web3 initialized successfully!");
          } catch (error) {
              console.error("⚠️ Error initializing Web3:", error);
          }
      } else {
          console.error("🚨 MetaMask not detected!");
      }
      console.log("✅ Web3 Initialized:", web3);
      return App.initContract();
  },

  initContract: async function () {
      try {
          const response = await fetch("Election.json");
          const electionArtifact = await response.json();
          App.contracts.Election = TruffleContract(electionArtifact);
          App.contracts.Election.setProvider(web3.currentProvider);
          console.log("✅ Election contract JSON loaded:", electionArtifact);

          App.contracts.Election.deployed().then(instance => {
              console.log("✅ Contract deployed:", instance);
              App.electionInstance = instance;
              App.render();
          }).catch(error => console.error("⚠️ Contract deployment error:", error));
      } catch (error) {
          console.error("🚨 Error loading contract JSON:", error);
      }
  },

  render: async function() {
      console.log("🔄 Rendering UI...");
      try {
          const instance = await App.contracts.Election.deployed();
          const candidatesCount = await instance.candidatesCount();
          console.log("🗳 Total Candidates:", candidatesCount.toNumber());

          $("#candidatesResults").empty();
          $("#candidatesSelect").empty();

          for (let i = 1; i <= candidatesCount.toNumber(); i++) {
              console.log(`📡 Fetching candidate ${i}...`);
              const candidate = await instance.candidates(i);
              console.log(`Raw candidate data:`, candidate);

              const candidateId = candidate[0].toNumber();
              const candidateName = candidate[1];
              const candidateVotes = candidate[2].toNumber();

              console.log(`👤 Candidate ${i}: ID=${candidateId}, Name=${candidateName}, Votes=${candidateVotes}`);

              let candidateTemplate = `<tr>
                  <td>${candidateId}</td>
                  <td>${candidateName}</td>
                  <td>${candidateVotes}</td>
              </tr>`;
              $("#candidatesResults").append(candidateTemplate);

              let candidateOption = `<option value='${candidateId}'>${candidateName}</option>`;
              $("#candidatesSelect").append(candidateOption);
          }
          
          web3.eth.getCoinbase(function(err, account) {
              if (err === null) {
                  App.account = account;
                  $("#accountAddress").html("Your Account: " + account);
              }
          });

          $("#loader").hide();
          $("#content").show();
      } catch (error) {
          console.error("⚠️ Error loading contract data:", error);
      }
  },

  castVote: async function() {
      var candidateId = $('#candidatesSelect').val();
      console.log("🗳 Casting vote for Candidate ID:", candidateId);
      
      try {
          const instance = await App.contracts.Election.deployed();
          await instance.vote(candidateId, { from: App.account });
          console.log("✅ Vote successfully cast!");
          
          // Refresh UI to reflect vote count changes
          $("#content").hide();
          $("#loader").show();
          await App.render();
      } catch (err) {
          console.error("⚠️ Error casting vote:", err);
      }
  }
};

$(function() {
  $(window).load(function() {
      App.init();
  });
});