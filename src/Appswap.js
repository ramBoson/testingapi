import './App.css';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import algosdk from 'algosdk';
import { useEffect } from "react";
import { useState } from "react";
const myAlgoWallet = new MyAlgoConnect();



function App() {


  const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
  const myAlgoConnect = new MyAlgoConnect();
  
  const[s1,sets1]= useState("");
  const[s2,sets2]= useState("");
  const[ilt,setilt]= useState("");
  const[input1,set_input1]= useState("");
  const[input2,set_input2]= useState("");
  const[redeemfeesamount,setp]= useState("");
  const[swapamount,set_inp_goal] = useState("");
  const[burnamount,set_inp_burn] = useState("");
  const[samount,sets] = useState("");
  const[tokenid1,settoken1] = useState("");
  const[tokenid2,settoken2] = useState("");
  
  const waitForConfirmation = async function (algodclient, txId) {
    let status = (await algodclient.status().do());
    let lastRound = status["last-round"];
      while (true) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
          //Got the completed Transaction
          console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
          break;
        }
        lastRound++;
        await algodclient.statusAfterBlock(lastRound).do();
      }
    };

    async function readLocalState(client, account, index1){
        let accountInfoResponse = await client.accountInformation(account).do();
        // let val = await client.ApplicationInformation(appId);
        // console.log("val",val)
        console.log("accinfo",accountInfoResponse);
       
        for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
          if (accountInfoResponse['apps-local-state'][i].id == index1) {
              console.log("Application's global state:");
              for (let n = 0; n < accountInfoResponse['apps-local-state'][i]['key-value'].length; n++) {
                 // console.log(accountInfoResponse['apps-local-state'][i]['key-value']);
                  let enc = accountInfoResponse['apps-local-state'][i]['key-value'][n];
                  if(enc['key'] === "czE="){
                    sets1(enc.value.uint)
                  }
                  if(enc['key'] === "czI="){
                    sets2(enc.value.uint)
                  }
                  if(enc['key'] === "aWx0"){
                    setilt(enc.value.uint)
                  }
                  if(enc['key'] === "cA=="){
                    setp(enc.value.uint)
                  }
              }
              
          }
      }
    }

    useEffect(() =>{first()},[])

    const first = async () =>{
      // const dec = algosdk.decodeAddress("K3ASZETXZ47FOFEEDG7WVU4PNFOTKE32HFWAE7ODFLUUYAYVKDBJRWLRV4")
      // const a =Buffer.from(algosdk.encodeUint64("bwAAAAADKo34")).toString('base64');
      // console.log("add",a);
      readLocalState(algodClient,"NVTAV2SATFKN65YACDSSZT6SLUBUWAJGNQNSTI7MFRSZD3OVPDYOY27OPE",52397037);
    }


  
          const swap =async (appid,asset_in_amount) => {

            const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
        
            
            let index = parseInt(appid);
            console.log("appId inside donate", index)
        
            let data = `#pragma version 4
    
            // Tinyman Pool LogicSig
            // Documentation: https://docs.tinyman.org
            
            // This code should be read in conjunction with validator_approval.teal.
            // The validation logic is split between these two programs.
            
            // ensure ASSET_ID_1 > ASSET_ID_2
            int Token1   
            int Token2   
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
            int 52397037
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
                int Token2
                int 0 // Algo
                ==
                select
                global GroupSize
                ==
                assert
            
                gtxna 1 ApplicationArgs 1
                btoi
                int Token1
                ==
                gtxna 1 ApplicationArgs 2
                btoi
                int Token2
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
                      > // inverse of 0 is max int
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
                int Token1
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
                int Token2
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
                int Token2   
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

            let k = s1 * s2 ;
            let asset_in_amount_minus_fee = (asset_in_amount * 997) / 1000
                
            let swap_fees = asset_in_amount - asset_in_amount_minus_fee
                
            let l = asset_in_amount_minus_fee - swap_fees;
            let asset_out_amount = s2 - (k / (s1 + l ))   
            
            
            let replaced1 = data.replaceAll("Token1",(tokenid1));
            console.log("first")
            let replaced2 = replaced1.replaceAll("Token2",tokenid2);
            let results = await algodClient.compile(replaced2).do();
            console.log("Hash = " + results.hash);
            console.log("Result = " + results.result);
            
            let program = new Uint8Array(Buffer.from(results.result, "base64"));
            
            let lsig = algosdk.makeLogicSig(program);
            console.log("Escrow =", lsig.address());
            try {
              const accounts = await myAlgoWallet.connect();
              const addresses = accounts.map(account => account.address);
              const params = await algodClient.getTransactionParams().do();
              
              let sender = addresses[0];
              let recv_escrow = lsig.address();
              let amount = 2000;
              
              let note1=[];
              note1.push(new Uint8Array(Buffer.from("fee")));
              let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: sender, 
                to: recv_escrow, 
                amount: amount, 
                //  note: note1,  
                 suggestedParams: params
               });
             
               let appArg = [];
               appArg.push(new Uint8Array(Buffer.from("swap")));
               appArg.push(new Uint8Array(Buffer.from("fi")));

               let foreignassets = [];
              //  let decAddr = algosdk.decodeAddress(addresses[0]);
              //  foreignassets.push(decAddr.publicKey);
               foreignassets.push(parseInt(tokenid1));
               foreignassets.push(parseInt(tokenid2));
               foreignassets.push(53120504);
               const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                   from: recv_escrow, 
                   appIndex: index,
                   appArgs: appArg,
                   appAccounts:addresses[0],
                   accounts: [addresses[0]],
                   foreignAssets:foreignassets,
                   suggestedParams: params
                 });
        
               
                
                const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: addresses[0],
                  to: recv_escrow,
                  assetIndex: parseInt(tokenid1),
                  note: undefined,
                  accounts:addresses[0],
                  amount: parseInt(asset_in_amount), 
                  suggestedParams: params
                });
    
                const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: recv_escrow ,
                  to: addresses[0],
                  assetIndex:parseInt(tokenid2), 
                  note: undefined,
                  accounts: recv_escrow,
                  amount: parseInt(parseInt(asset_out_amount).toFixed(0)),
                  suggestedParams: params
                });
                
              
        
            
              const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4]);
              const txs = [ transaction1, transaction2, transaction3, transaction4];
              txs[0].group = groupID;
              txs[1].group = groupID;
              txs[2].group = groupID;
              txs[3].group = groupID;
              
              
              // const signedTx1 = await myAlgoWallet.signTransaction(txs[0].toByte());
              const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
              // const signedTx3 = await myAlgoWallet.signTransaction(txs[2].toByte());

              const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
              // const signedTx5 = await myAlgoWallet.signTransaction(txs[4].toByte());
              const signedTxnarray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte()])
        console.log("signedtxn",signedTxnarray);
          const response = await algodClient.sendRawTransaction([signedTxnarray[0].blob, signedTx2.blob, signedTxnarray[1].blob, signedTx4.blob]).do();
          console.log("TxID", JSON.stringify(response, null, 1));
          await waitForConfirmation(algodClient, response.txId);
            } catch (err) {
              console.error(err);
            }
        
        
          
                //  mapTotal();
                //  mapGoal();
                
                  
                  // Use the AlgoSigner encoding library to make the transactions base
                  
          
            }


              
function setvalue(asset_in_amount){
  // let s = document.getElementById('chatinput1').value;
  set_inp_goal(asset_in_amount);
    
    
    
    let k = s1 * s2 ;
    let asset_in_amount_minus_fee = (asset_in_amount * 997) / 1000
        
    let swap_fees = asset_in_amount - asset_in_amount_minus_fee
        
    let l = asset_in_amount_minus_fee - swap_fees;
    let asset_out_amount = s2 - (k / (s1 + l ))   
    console.log("s",asset_out_amount);
    
    sets(asset_out_amount)
    //document.getElementById('chatinput').innerHTML = asset_out_amount;

}

  return (
    <div className="App">
                     

            {/* crowdfunding buttons */}

            <br></br>
         
            <br></br>
        
                    <br></br><br></br>
                   
                    <label><input type='number' placeholder='Enter TokenID'onChange = {event => settoken1(event.target.value)}></input></label> 
        <input
        id="goal"
        type='number'
        placeholder='Enter The swap amount'
        name="desc"
        required
        id='chatinput1'
        // onChange={setvalue()}
        onChange = {event => setvalue(event.target.value)}  
        /><br/>
        
        <label><input type='number' placeholder='Enter TokenID'onChange = {event => settoken2(event.target.value)}></input></label> 
       
<input type='text' name='fname' class='chatinput' id='chatinput' value={samount} ></input>
                   <br></br>
                    <button onClick={()=>swap(52397037,swapamount)}>
                       Swap
                    </button>
                    <br></br><br></br>
                   




                    
    </div>
  );
}

export default App;