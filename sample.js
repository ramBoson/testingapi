/* global AlgoSigner */
import React, { Component } from 'react';
import './App.css';



import { useEffect } from "react";
import { useState } from "react";
global.TextEncoder = require("util").TextEncoder; 
const algosdk = require('algosdk');

function App() {

  let algodServer = "https://testnet-algorand.api.purestake.io/ps2";
  let algodToken = {
    'X-API-Key': '9oXsQDRlZ97z9mTNNd7JFaVMwhCaBlID2SXUOJWl'
  };

  let algodPort = "";

  let client = new algosdk.Algodv2(algodToken, algodServer, algodPort);


  const waitForConfirmation = async function (client, txId) {
    let status = (await client.status().do());
    let lastRound = status["last-round"];
      while (true) {
        const pendingInfo = await client.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
          //Got the completed Transaction
          console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
          break;
        }
        lastRound++;
        await client.statusAfterBlock(lastRound).do();
      }
    };   

  const bootstrap =async () => {


    let data2 = `#pragma version 4

    // Tinyman Pool LogicSig
    // Documentation: https://docs.tinyman.org
    
    // This code should be read in conjunction with validator_approval.teal.
    // The validation logic is split between these two programs.
    
    // ensure ASSET_ID_1 > ASSET_ID_2
    int 48509793
    int 48509994
    >
    assert
    
    txn CloseRemainderTo
    global ZeroAddress
    ==
    assert
    
    txn AssetCloseTo
    global ZeroAddress
    ==
    assert
    
    txn RekeyTo
    global ZeroAddress
    ==
    assert
    
    global GroupSize
    int 1
    >
    assert
    
    // ensure gtxn 1 is ApplicationCall to Validator App
    gtxn 1 Sender
    txn Sender
    ==
    assert
    
    gtxn 1 TypeEnum
    int appl // ApplicationCall
    ==
    assert
    
    gtxn 1 ApplicationID
    int 48509185
    ==
    assert
    
    // Bootstrap?
    gtxn 1 OnCompletion
    int OptIn
    ==
    gtxn 1 NumAppArgs
    int 3
    ==
    &&
    gtxna 1 ApplicationArgs 0
    byte "bootstrap"
    ==
    &&
    bnz bootstrap
    
    
    // The remaining operations (Mint/Burn/Swap/Redeem/Fees) must all have OnCompletion=NoOp
    gtxn 1 OnCompletion
    int NoOp
    ==
    assert
    
    // Swap?
    gtxn 1 NumAppArgs
    int 2
    ==
    gtxna 1 ApplicationArgs 0
    byte "swap"
    ==
    &&
    bnz swap
    
    
    // The remaining operations (Mint/Burn/Redeem/Fees) must all have NumAppArgs=1
    gtxn 1 NumAppArgs
    int 1
    ==
    assert
    
    // Mint?
    gtxna 1 ApplicationArgs 0
    byte "mint"
    ==
    bnz mint
    
    
    // Burn?
    gtxna 1 ApplicationArgs 0
    byte "burn"
    ==
    bnz burn
    
    // Redeem?
    gtxna 1 ApplicationArgs 0
    byte "redeem"
    ==
    bnz redeem
    
    // Fees?
    gtxna 1 ApplicationArgs 0
    byte "fees"
    ==
    bnz redeem_fees
    
    err
    
    
    bootstrap:
        // Ensure group size is correct 4 or 5:
        // 0: Pay Fees (signed by Pooler)
        // 1: Call App (signed by Pool LogicSig)
        // 2: Asset Creation (signed by Pool LogicSig)
        // 3: Asset Optin (signed by Pool LogicSig)
        // If asset 2 is an ASA:
        // (4): Asset Optin (signed by Pool LogicSig)
        int 5 // 5 if asset 2 is an ASA
        int 4 // 4 if asset 2 is Algo
        int 48509994
        int 0 // Algo
        ==
        select
        global GroupSize
        ==
        assert
    
        gtxna 1 ApplicationArgs 1
        btoi
        int 48509793
        ==
        gtxna 1 ApplicationArgs 2
        btoi
        int 48509994
        ==
        &&
        assert
    
        // ensure sender (signer) of AssetConfig tx is same as sender of app call
        gtxn 2 Sender
        txn Sender
        ==
        assert
    
        // ensure gtxn 2 is type AssetConfig
        gtxn 2 TypeEnum
        int acfg
        ==
        assert
    
        // ensure a new asset is being created
        gtxn 2 ConfigAsset
        int 0
        ==
        assert
    
        // ensure asset total amount is max int
        gtxn 2 ConfigAssetTotal
        int 0
        ~ // inverse of 0 is max int
        ==
        assert
    
        // ensure decimals is 6
        gtxn 2 ConfigAssetDecimals
        int 6
        ==
        assert
    
        // ensure default frozen is false
        gtxn 2 ConfigAssetDefaultFrozen
        int 0
        ==
        assert
    
        // ensure unit name is 'TM1POOL'
        gtxn 2 ConfigAssetUnitName
        byte "TM1POOL"
        ==
        assert
    
        // ensure asset name begins with 'Tinyman Pool '
        // the Validator app ensures the name ends with "{asset1_unit_name}-{asset2_unit_name}"
        gtxn 2 ConfigAssetName
        substring 0 13
        byte "Tinyman Pool "
        ==
        assert
    
        // ensure asset url is 'https://tinyman.org'
        gtxn 2 ConfigAssetURL
        byte "https://tinyman.org"
        ==
        assert
    
        // ensure no asset manager address is set
        gtxn 2 ConfigAssetManager
        global ZeroAddress
        ==
        assert
    
        // ensure no asset reserve address is set
        gtxn 2 ConfigAssetReserve
        global ZeroAddress
        ==
        assert
    
        // ensure no asset freeze address is set
        gtxn 2 ConfigAssetFreeze
        global ZeroAddress
        ==
        assert
    
        // ensure no asset clawback address is set
        gtxn 2 ConfigAssetClawback
        global ZeroAddress
        ==
        assert
    
        // Asset 1 optin
        // Ensure optin txn is signed by the same sig as this txn
        gtxn 3 Sender
        txn Sender
        ==
        assert
    
        // ensure txn type is AssetTransfer
        gtxn 3 TypeEnum
        int axfer
        ==
        assert
    
        // ensure the asset id is the same as asset 1
        gtxn 3 XferAsset
        int 48509793
        ==
        assert
    
        // ensure the receiver is the sender
        gtxn 3 AssetReceiver
        txn Sender
        ==
        assert
    
        // ensure the amount is 0 for Optin
        gtxn 3 AssetAmount
        int 0
        ==
        assert
    
        // if asset 2 is not 0 (Algo), it needs an optin
        int 48509994
        int 0
        !=
        bnz bootstrap__non_algo
    
        gtxn 1 Fee
        gtxn 2 Fee
        +
        gtxn 3 Fee
        +
        store 1 // fee_total
        b check_fees
    
    
        bootstrap__non_algo:
        // verify 5th txn is asset 2 optin txn
        gtxn 4 Sender
        txn Sender
        ==
        assert
        gtxn 4 TypeEnum
        int axfer
        ==
        assert
    
        // ensure the asset id is the same as asset 2
        gtxn 4 XferAsset
        int 48509994
        ==
        assert
    
        // ensure the receiver is the sender
        gtxn 4 AssetReceiver
        txn Sender
        ==
        assert
    
        // ensure the amount is 0 for Optin
        gtxn 4 AssetAmount
        int 0
        ==
        assert
    
        gtxn 1 Fee
        gtxn 2 Fee
        +
        gtxn 3 Fee
        +
        gtxn 4 Fee
        +
        store 1 // fee_total
        b check_fees
    
    mint:
        // Mint Checks:
        //
        // # ensure group size is 5
        // global GroupSize == 5
    
        // 	# ensure transaction fees are covered by txn 0
        // 	# ensure Pool is not paying the fee
        // 	gtxn 0 Sender != txn Sender
        // 	gtxn 0 Receiver == txn Sender
        // 	gtxn 0 Amount >= (gtxn 1 Fee + gtxn 4 Fee)
    
        // 	# verify the receiver of the liquidity token asset is the one whose local state is updated
        // 	gtxna 1 Accounts 1 != txn Sender
        // 	gtxna 1 Accounts 1 == gtxn 4 AssetReceiver
    
        // 	# from Pooler to Pool asset 1
        // 	gtxn 2 Sender (Pooler) != txn Sender (Pool)
        // 	gtxn 2 AssetReceiver (Pool) == txn Sender (Pool)
        // 	gtxn 2 Sender (Pooler) == gtxn 3 Sender (Pooler)
    
        // 	# from Pooler to Pool asset 2
        // 	txn Sender (Pool) == (gtxn 3 AssetReceiver or gtxn 3 Receiver) (Pool)
    
    
        // 	# from Pool to Pooler liquidity token
        // 	gtxn 4 AssetReceiver (Pooler) == gtxn 2 Sender (Poooler)
        // 	gtxn 4 Sender (Pool) == txn Sender (Pool)
    
    
        // ensure group size is 5:
        // 0: Pay Fees (signed by Pooler)
        // 1: Call App (signed by Pool LogicSig)
        // 2: Asset Transfer/Pay (signed by Pooler)
        // 3: Asset Transfer/Pay (signed by Pooler)
        // 4: Asset Transfer/Pay (signed by Pool LogicSig)
        global GroupSize
        int 5
        ==
        assert
    
        // verify the receiver of the asset is the one whose local state is updated
        gtxna 1 Accounts 1
        txn Sender
        !=
        assert
    
        gtxna 1 Accounts 1
        gtxn 4 AssetReceiver
        ==
        assert
    
        // verify txn 2 is AssetTransfer from Pooler to Pool
        gtxn 2 Sender
        txn Sender
        !=
        assert
    
        gtxn 2 AssetReceiver
        txn Sender
        ==
        assert
    
        gtxn 3 Sender
        gtxn 2 Sender
        ==
        assert
    
        // verify txn 3 is AssetTransfer from Pooler to Pool
        gtxn 3 AssetReceiver
        gtxn 3 Receiver
        gtxn 3 TypeEnum
        int pay
        == // check if Algo
        select
        txn Sender
        ==
        assert
    
        // verify txn 4 is AssetTransfer from Pool to Pooler
        gtxn 4 Sender
        txn Sender
        ==
        assert
    
        gtxn 4 AssetReceiver
        gtxn 2 Sender
        ==
        assert
    
        gtxn 1 Fee
        gtxn 4 Fee
        +
        store 1 // fee_total
        b check_fees
    
    
    burn:
        // Burn Checks:
        //
        // # ensure group size is 5
        // global GroupSize == 5
    
        // # ensure transaction fees are covered by txn 0
        // # ensure Pool is not paying the fee
        // gtxn 0 Sender != txn Sender
        // gtxn 0 Receiver == txn Sender
        // gtxn 0 Amount >= (gtxn 1 Fee + gtxn 2 Fee gtxn 3 Fee)
    
        // # ensure the calculated amounts are not 0
        // calculated_asset1_out != 0
        // calculated_asset2_out != 0
    
        // # verify the receiver of the assets is the one whose local state is updated
        // gtxna 1 Accounts 1 != txn Sender
        // gtxna 1 Accounts 1 == gtxn 2 AssetReceiver
        // gtxna 1 Accounts 1 == (gtxn 3 AssetReceiver or gtxn 3 Receiver)
    
        // # from Pool to Pooler asset 1
        // gtxn 2 Sender (Pooler) == txn Sender (Pool)
        // gtxn 2 AssetReceiver (Pool) == gtxn 4 Sender (Pool)
        // gtxn 3 Sender (Pool) == txn Sender (Pool)
    
        // # from Pool to Pooler asset 2
        // gtxn 4 Sender (Pooler) == (gtxn 3 AssetReceiver or gtxn 3 Receiver) (Pool)
    
    
        // # from Pooler to Pool liquidity token
        // gtxn 4 Sender (Pooler) != txn Sender (Pool)
        // gtxn 4 AssetReceiver == txn Sender (Pool)
    
        // ensure group size is 5:
        // 0: Pay Fees (signed by Pooler)
        // 1: Call App (signed by Pool LogicSig)
        // 2: Asset Transfer/Pay (signed by Pool LogicSig)
        // 3: Asset Transfer/Pay (signed by Pool LogicSig)
        // 4: Asset Transfer/Pay (signed by Pooler)
        global GroupSize
        int 5
        ==
        assert
    
        // verify the receiver of the assets is the one whose local state is updated
        gtxna 1 Accounts 1
        txn Sender
        !=
        assert
    
        gtxna 1 Accounts 1
        gtxn 2 AssetReceiver
        ==
        assert
    
        gtxn 3 AssetReceiver
        gtxn 3 Receiver
        gtxn 3 TypeEnum
        int pay
        ==
        select
        gtxna 1 Accounts 1
        ==
        assert
    
        // 2: AssetTransfer - from Pool to Pooler asset 1
        gtxn 2 Sender
        txn Sender
        ==
        assert
    
        gtxn 2 AssetReceiver
        gtxn 4 Sender
        ==
        assert
    
        gtxn 3 Sender
        txn Sender
        ==
        assert
    
        // 3: AssetTransfer - from Pool to Pooler asset 2
        gtxn 3 AssetReceiver
        gtxn 3 Receiver
        gtxn 3 TypeEnum
        int pay
        == // if algo
        select
        gtxn 4 Sender
        ==
        assert
    
        // 4: AssetTransfer - from Pooler to Pool liquidity token
        gtxn 4 Sender
        txn Sender
        !=
        assert
    
        gtxn 4 AssetReceiver
        txn Sender
        ==
        assert
    
        gtxn 1 Fee
        gtxn 2 Fee
        +
        gtxn 3 Fee
        +
        store 1 // fee_total
        b check_fees
    
    
    swap:
        // ensure group size is 4:
        // 0: Pay Fees (signed by Swapper)
        // 1: Call App (signed by Pool LogicSig)
        // 2: Asset Transfer/Pay (signed by Swapper)
        // 3: Asset Transfer/Pay (signed by Pool LogicSig)
        global GroupSize
        int 4
        ==
        assert
    
        //  ensure accounts[1] is not Pool
        gtxna 1 Accounts 1
        txn Sender
        !=
        assert
    
        // ensure the sender of asset in is the one whose local state is updated
        gtxn 2 Sender
        gtxna 1 Accounts 1
        ==
        assert
    
        // ensure txn 2 sender is not the Pool
        gtxn 2 Sender
        txn Sender
        !=
        assert
    
        // ensure txn 3 sender is the Pool
        gtxn 3 Sender
        txn Sender
        ==
        assert
    
        // ensure txn 2 receiver is Pool
        gtxn 2 AssetReceiver
        gtxn 2 Receiver
        gtxn 2 TypeEnum
        int pay
        == // if Algo
        select
        txn Sender
        ==
        assert
    
        // ensure txn 3 receiver is Swapper (sender of txn 2)
        gtxn 3 AssetReceiver
        gtxn 3 Receiver
        gtxn 3 TypeEnum
        int pay
        == // if Algo
        select
        gtxn 2 Sender
        ==
        assert
    
        gtxn 1 Fee
        gtxn 3 Fee
        +
        store 1 // fee_total
        b check_fees
    
    
    redeem:
        // ensure group size is 3:
        // 0: Pay Fees (signed by Swapper)
        // 1: Call App (signed by Pool LogicSig)
        // 2: Asset Transfer/Pay (signed by Pool LogicSig)
        global GroupSize
        int 3
        ==
        assert
    
        //  ensure accounts[1] is not Pool
        gtxna 1 Accounts 1
        txn Sender
        !=
        assert
    
        // ensure the receiver of the asset is the one whose local state is updated
        gtxn 2 AssetReceiver
        gtxn 2 Receiver
        gtxn 2 TypeEnum
        int pay
        == // if algo
        select
        gtxna 1 Accounts 1
        ==
        assert
    
        gtxn 1 Fee
        gtxn 2 Fee
        +
        store 1 // fee_total
        b check_fees
    
    
    redeem_fees:
        // ensure group size is 3:
        // 0: Pay Fees (signed by User)
        // 1: Call App (signed by Pool LogicSig)
        // 2: Asset Transfer/Pay (signed by Pool LogicSig)
        global GroupSize
        int 3
        ==
        assert
    
        gtxn 1 Fee
        gtxn 2 Fee
        +
        store 1 // fee_total
        b check_fees
    
    
    
    check_fees:
        // ensure gtxn 0 amount covers all fees
         // ensure Pool is not paying the fee
        gtxn 0 Sender
        txn Sender
        !=
        assert
    
         // ensure Pool is receiving the fee
        gtxn 0 Receiver
        txn Sender
        ==
        assert
    
        gtxn 0 Amount
        load 1 // fee_total
        >=
        return`;
    let results = await client.compile(data2).do();
    console.log("Hash = " + results.hash);
    console.log("Result = " + results.result);
    let program = new Uint8Array(Buffer.from(results.result, "base64"));
  
    let lsig = algosdk.makeLogicSig(program);
    let sender1 = lsig.address();
    console.log("logic",sender1)

    let params = await client.getTransactionParams().do();      
    let index = 48509185;
    params.fee = 1000;
    params.flatFee = true;
    let amount = 961000;
    var sender = localStorage.getItem("wallet");
    let recv_escrow = lsig.address();
    let transaction1 = algosdk.makePaymentTxnWithSuggestedParams(sender, recv_escrow, amount, undefined, undefined, params);  
    
    let appArg = [];
    appArg.push(new Uint8Array(Buffer.from("bootstrap")));
    appArg.push(algosdk.encodeUint64(48509793));
    appArg.push(algosdk.encodeUint64(48509994));
    let foreignassets = [];
    foreignassets.push((48509793));
    foreignassets.push((48509994));
    const transaction2 = algosdk.makeApplicationOptInTxnFromObject({
        from: recv_escrow, 
        appIndex: index,
        appArgs: appArg,
        appForeignAssets: foreignassets,
        suggestedParams: params
      });
    

    const transaction3 = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: recv_escrow,
      assetName:"Tinyman Pool USDC-ALGO",
      unitName: "TM1POOL",
      assetURL: "https://tinyman.org",
      total: 10000000000000,
      decimals: 6,
      note: undefined,
      suggestedParams: params
    });

    const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: recv_escrow,
      to: recv_escrow,
      assetIndex: 48509793 ,
      note: undefined,
      amount: 0,
      suggestedParams: params
    });

    const transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: recv_escrow,
      to: recv_escrow,
      assetIndex: 48509994,
      note: undefined,
      amount: 0,
      suggestedParams: params
    });

    let txns = [ transaction1, transaction2, transaction3, transaction4, transaction5];
    let txgroup = algosdk.assignGroupID(txns);

    let txn_b64_1 = transaction1.toByte();
    let base64Txs1 = AlgoSigner.encoding.msgpackToBase64(txn_b64_1);
    let signedTxs1 = await AlgoSigner.signTxn([
      {
        txn: base64Txs1,
      }
    ]);
    let binarySignedTxs =  AlgoSigner.encoding.base64ToMsgpack(signedTxs1[0].blob);

    
    let rawSignedTxn2 = algosdk.signLogicSigTransactionObject(transaction2, lsig);
    let rawSignedTxn3 = algosdk.signLogicSigTransactionObject(transaction3, lsig);
    let rawSignedTxn4 = algosdk.signLogicSigTransactionObject(transaction4, lsig);
    let rawSignedTxn5 = algosdk.signLogicSigTransactionObject(transaction5, lsig);
    console.log("binary",binarySignedTxs);

    let signArr = [binarySignedTxs, rawSignedTxn2.blob, rawSignedTxn3.blob, rawSignedTxn4.blob, rawSignedTxn5.blob];
    let trans = await client.sendRawTransaction(signArr).do();
    console.log("Send complete");
    console.log("id", trans.txId);
    await waitForConfirmation(client, trans.txId);
    console.log("signed")
    alert("Bootstrap");

    console.log("tx2");
    
  }

  return (
    <div className="App">
      <button onClick={()=>bootstrap()}>Bootstrap</button>
    </div>
  );
}

export default App;
