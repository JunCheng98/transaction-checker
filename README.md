# transaction-checker

This is a simple web application built with Node.js and React which displays the list of latest WETH-USDC transactions on Uniswap.

(Currently work-in-progress and fixes needed.)

This application aims to batch retrieve historical transaction data with etherscan.io, and stream live data from Infura websockets with the topic `Transfer(address,address,uint256)` and filtering by contract address.

Computation to USDT is done with the help of ETH-USDT prices retrieved from the Binance kline API.

## Run Instructions

Running the backend:
```
cd backend
node server.js
```


Running the frontend:
```
cd frontend
npm start
```
