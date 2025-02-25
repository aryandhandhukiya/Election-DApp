
# Election - Decentralized Application
A decentralized voting application (DApp) built on the Ethereum blockchain, enabling secure, transparent, and tamper-proof elections.

## Tech Stack

Frontend: HTML, Web3.js

Backend: Solidity (Smart Contracts), Ethereum

Blockchain: Ethereum (Local Ganache)

Development Tools: Truffle, Metamask

## Dependencies
Make sure you have the following installed:
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/


Follow the steps below to download, install, and run this project.
## Step 1. Clone the project
`git clone https://github.com/aryandhandhukiya/Election-DApp`

## Step 2. Install dependencies
```
$ cd Election-DApp
$ npm install
```
## Step 3. Start Ganache
Open the Ganache GUI client that you installed. This will start your local blockchain instance.


## Step 4. Compile & Deploy Election Smart Contract
`$ truffle migrate --reset`
You must migrate the election smart contract each time your restart ganache.

## Step 5. Configure Metamask
See free video tutorial for full explanation of these steps:
- Unlock Metamask
- Connect metamask to your local Etherum blockchain provided by Ganache.
- Import an account provided by ganache by using the private key of the account.

## Step 6. Run the Front End Application
`$ npm run dev`
Visit this URL in your browser: http://localhost:3000

## License
This project is licensed under the MIT License - see the LICENSE file for details.
