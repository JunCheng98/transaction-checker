const { Web3 } = require("web3")


// fetch live transactions using Infura
async function main() {
  const web3 = new Web3("wss://mainnet.infura.io/ws/v3/e79facd54dc44e6bae5ae1a4121c6018")

  let options = {
    topics: [web3.utils.sha3("Transfer(address,address,uint256)")],
  }

  const abi = [
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ]

  let subscription = await web3.eth.subscribe("logs", options)

  async function collectData(contract) {
    try {
      var decimals = await contract.methods.decimals().call()
    } catch {
      decimals = 18n
    }
    try {
      var symbol = await contract.methods.symbol().call()
    } catch {
      symbol = "???"
    }
    return { decimals, symbol }
  }

  subscription.on("data", (event) => {
    if (event.topics.length == 3) {
      let transaction = web3.eth.abi.decodeLog(
        [
          {
            type: "address",
            name: "from",
            indexed: true,
          },
          {
            type: "address",
            name: "to",
            indexed: true,
          },
          {
            type: "uint256",
            name: "value",
            indexed: false,
          },
        ],
        event.data,
        [event.topics[0], event.topics[1], event.topics[2]]
      )

      const contract = new web3.eth.Contract(abi, event.address)
      collectData(contract).then((contractData) => {
        var unit = Object.keys(web3.utils.ethUnitMap).find(
          (key) =>
            web3.utils.ethUnitMap[key] == BigInt(10) ** contractData.decimals
        )
        if (!unit) {
          // Simplification for contracts that use "non-standard" units, e.g. REDDIT contract returns decimals==8
          unit = "wei"
        }
        // This is logging each transfer event found:
        const value = web3.utils.fromWei(transaction.value, unit)
        // console.log(
        //   `Transfer of ${value + " ".repeat(Math.max(0, 30 - value.length))} ${
        //     contractData.symbol +
        //     " ".repeat(Math.max(0, 10 - contractData.symbol.length))
        //   } from ${transaction.from} to ${transaction.to}`
        // )
        // event.address contains the contract address
        if (event.address == "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640") {
          console.log("Specified ERC-20 transfer!")
        }
      })
    }
  })

  subscription.on("error", (err) => {
    throw err
  })
  subscription.on("connected", (nr) =>
    console.log("Subscription on ERC-20 started with ID %s", nr)
  )
}
main()