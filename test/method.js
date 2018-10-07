//WEB3を呼び出す
var Web3 = require('web3');
//transactionを生成するときに必要
const Tx = require('ethereumjs-tx');
//infuraのアクセストークンを設定
var accessToken = ""; // 変更のこと
//ropstenテストネットに接続するためのproviderを初期化
const provider = new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/" + accessToken
)
//秘密鍵を設定
const privStr = '' // 変更のこと
//WEB3にproviderをセットして初期化
//ropstenのhttpproviderをセットする
const web3 = new Web3(provider);
//デプロイ済のコントラクトを設定する
const contractAddress = "";

let abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "initialSupply",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

//  ABI とコントラクト（ERC20トークン）のアドレスから、コントラクトのインスタンスを取得
const contract = web3.eth.contract(abi).at(contractAddress);

function setTransaction(data, fromAccount, toAccount, value){
    // アドレスの何個目かのトランザクションかをnonceを作成
    var count = web3.eth.getTransactionCount(fromAccount);
    // gasPriceを取得
    var gasPrice = web3.eth.gasPrice;
    // gasLimitはRopstenの上限である4700000に設定
    var gasLimit = 4700000;
    // トランザクションのフォーマットに沿って、gasや宛先など、dataも当てはめ
    //トランザクションの作成
    var rawTransaction = {
        "from": fromAccount,
        "nonce": web3.toHex(count),
        "gasPrice": web3.toHex(gasPrice),
        "gasLimit": web3.toHex(gasLimit),
        "to": toAccount,
        "value": value,
        "data": data,
        "chainId": 0x03 //ropsten
    };

    return rawTransaction;
}

//トランザクションの送金
function sendTransaction(rawTx){
    //送金前に署名する
    var signedTx = signTx(rawTx);
    web3.eth.sendRawTransaction('0x' + signedTx.toString('hex'), function(err, hash) {
        if (!err)
            console.log(hash);
        else
            console.log(err);
    });
}

// トランザクションに秘密鍵で署名する
function signTx(rawTx){
    var privKey = new Buffer(privStr, 'hex');
    var tx = new Tx(rawTx);
    tx.sign(privKey);
    var serializedTx = tx.serialize();
    return serializedTx;
}

//アカウントのETHの残高確認
function execBalanceOf(account){
    console.log(web3.eth.getBalance(account));
}

execBalanceOf("");

//ETHの送金
function sendEther(from_account, to_account, value){
    var rawTx = setTransaction("", from_account, to_account, value);
    sendTransaction(rawTx);
}

sendEther("", "", );

//ERC20の送信を実行する関数
function execTransfer(from_account, to_account, value){
    //コントラクトのtransfer関数の引数を設定する
    var data = contract.transfer.getData(to_account, value);
    //"データ"をトランザクションに設定する
    var rawTx = setTransaction(data, from_account, contractAddress, 0);
    //トランザクションを送る
    sendTransaction(rawTx);
}

execTransfer("", "", );