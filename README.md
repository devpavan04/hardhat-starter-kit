# Hardhat Starter Kit
### Uses hardhat, ethers.js and ethereum-waffle
```
git clone https://github.com/devpavan04/hardhat-starter-kit.git your-dapp
```
Install hardhat dependencies
```
cd your-dapp
npm install
```
Install react dependencies
```
cd client
npm install
```
Hardhat flow :
* cd back into root folder
```
cd ..
```
* Write contracts inside contracts folder
* Write tests inside test folder
* Compile
```
npm run compile
```
* Deployments and tests :
  * Hardhat Network
    * Test - without running a chain
      * change defaultNetwork to "hardhat" in hardhat.config.js file
      ```
      npm run test
      ```
  * Localhost
    * Test - with running a chain at localhost:8545
      * change defaultNetwork to "localhost" in hardhat.config.js file
        * run a local JsonRpcProvider (chain) at localhost:8545
        ```
        npm run chain
        ```
        * specify the contract/s being deployed in the main() function of   scripts/deploy.js file
        * deploy contract
        ```
        npm run deploy
        ```
        * test your contracts
        ```
        npm run test
        ```
  * Testnet
    * Deploy to test network
      * change defaultNetwork to required testnet, ex: "kovan",   "ropsten" in hardhat.config.js file
      * change INFURA_API_KEY to your infura api key
      * change TESTNET_ACCOUNT_PRIVATE_KEY to your testnet's account's  private key
        * deploy contract
        ```
        npm run deploy
        ```
  * Publish artifacts to the frontend
      ```
      npm run publish
      ```
* Start react app
```
cd client
npm start
```