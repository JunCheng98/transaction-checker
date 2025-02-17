const axios = require("axios");

// Etherscan API details
const ETHERSCAN_API_KEY = "UNMDNC7U7MQT822SY5BAGQZ4EGEG5H741I";
const ADDRESS = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";
const MAX_PAGE_NUM = 100;

let transactions = [];
let currentBlock = 0;
let currentEthUsdtPrice = getEthUsdtPrice()

// data format: [timestamp, open_price, high_price, low_price, ...]
// we fetch the open price for the given timestamp (first element is at that timestamp)
async function getEthUsdtPrice() {
  const binance_kline_api = `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1s`
  try {
    const response = await axios.get(binance_kline_api);
    return response.data[response.data.length - 1][1];
  } catch (error) {
    console.error("Error fetching ETH/USDT price:", error);
    return null;
  }
}

// calculate transaction fee in USDT
async function calculateTransactionFee(tx) {
  const gasUsed = parseInt(tx.gasUsed, 16);
  const gasPrice = parseInt(tx.gasPrice, 16);
  const feeInWei = gasUsed * gasPrice;
  const feeInEth = feeInWei / 1e18; // convert wei to ETH

  return feeInEth * currentEthUsdtPrice;
}

async function fetchAndProcessTransactions() {
  try {
    let startBlock = currentBlock;
    for (let pageNum = 1; pageNum <= MAX_PAGE_NUM; pageNum++) {
        const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${ADDRESS}&page=${pageNum}&offset=100&startblock=${startBlock}&sort=asc&apikey=${ETHERSCAN_API_KEY}`;
        const response = await axios.get(url);
        if (response.data.status !== "1") {
            console.error("Error fetching transactions:", response.data.message);
            return;
        }

        for (const tx of response.data.result) {
            // update the current block so we only fetch new transactions
            currentBlock = tx.blockNumber;
            const feeInUsdt = await calculateTransactionFee(tx);
            if (feeInUsdt !== null) {
                const transactionData = {
                    id: tx.blockNumber,
                    timestamp: tx.timeStamp,
                    hash: tx.hash,
                    feeInUsdt: feeInUsdt,
                };
                transactions.push(transactionData);
            }
        }
    }
    
  } catch (error) {
    console.error("Error fetching or processing transactions:", error);
  }
}

// periodically fetch and process transactions
const INTERVAL = 60000; // every minute (60 seconds)
setInterval(fetchAndProcessTransactions, INTERVAL);

// do initial fetch
fetchAndProcessTransactions();

module.exports = transactions
