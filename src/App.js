// import './App.css';

// // import express from 'express';
// // import {cors} from 'cors';

// import { useEffect } from "react";
// import { useState } from "react";
// import axios from 'axios';



// function App() {


//  const postValues =async()=>{
   
//   const requestOptions = {
//     method:'POST',
//     param: { 
       
//             client_id:"cEZoGE19mLmQdIPPjXtj2osurm8NRLHK",
//             client_secret:"VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW",
//             grant_type:"client_credentials",
//             scope:"email"		 
// }
//   }
// const response = await axios.post("https://api.elementpad.io/elementsapi/oauth2/token?client_id=cEZoGE19mLmQdIPPjXtj2osurm8NRLHK&client_secret=VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW&grant_type=client_credentials&scope=email");
// // const response = await axios.request("https://api.elementpad.io/elementsapi/oauth2/token", requestOptions);
// // const data = await response.json();  
// console.log("dataresponse",response) ;  
//  }

 

//  const getvalues = async()=>{
   
//   let s = await axios.get("https://api.elementpad.io/elementsapi/v1/users/",{headers:{
//     'Authorization': "Bearer ymzWoN5xlj7GMyN39Xhf4fFf52yVtJCS"
//     //,
//     //"Access-Control-Allow-Origin":"*",
//     //"Access-Control-Allow-Credentials": true,
//     //"Content-Type":'application/json'
// }})
// // let s = await axios.post("https://api.elementpad.io/elementsapi/v1/users/?Authorization=Bearer bOxj41yiRCTLoW7cMCsKa8DoQ9Ufhu2w")
//   console.log("get",s)
  
    
// }


// const getanotherquerry = async() =>{
//   axios.get(`https://jsonplaceholder.typicode.com/users`,{
//         headers:{
//           'Authorization':"RLvP6UdNMiSbtUWUqmmigXETTI1saVGb"
//       }
//       })
//        .then((res)=>console.log("response",res.data))  
// }


// const getvaluenew = async()=>{   
//   let s = await axios.get("https://api.elementpad.io/elementsapi/v1/users/",
//   {headers:{
//     'Authorization': "Bearer ymzWoN5xlj7GMyN39Xhf4fFf52yVtJCS",
//     "Access-Control-Allow-Origin":"*",
//     "Content-Type":"application/json",
//     "Accept":"application/json"
//   }
//   }
//   )
//   console.log("getNew",s)    
// }


// const postValuesNew =async()=>{
// const jsonform={
//   "assetId":7,
//   "assetName":"AName7"
// }
// const response = await axios.post("https://api.elementpad.io/elementsapi/v1/stableCoin",
// {headers:{  
//   "Access-Control-Allow-Origin":"*",
//   "Content-Type":"application/json",
//   "Accept":"application/json"
// }
// }
// ,jsonform);
// // const response = await axios.request("https://api.elementpad.io/elementsapi/oauth2/token", requestOptions);
// // const data = await response.json();  
// console.log("dataresponse",response) ;  
//  }

//   return (
//     <div className="App">
                   
//                     <button onClick={()=>postValues()}>
//                        POST
//                     </button>
// <br></br>
//                     <button onClick={()=>getvalues()}>
//                        GET
//                     </button>


                   
// <br></br>
//                     <button onClick={()=>getanotherquerry()}>
//                        Sample
//                     </button>
//                     <br></br>
//                     <button onClick={()=>getvaluenew()}>
//                        GET-New
//                     </button>
//                     <button onClick={()=>postValuesNew()}>
//                        POST-New
//                     </button>


                   




                    
//     </div>
//   );
// }

// export default App;


import './App.css';

// import express from 'express';
// import {cors} from 'cors';

import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import url from './configurl';



function App() {


 const postValues =async()=>{
   
  const requestOptions = {
    method:'POST',
    
    param: { 
       
            client_id:"cEZoGE19mLmQdIPPjXtj2osurm8NRLHK",
            client_secret:"VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW",
            grant_type:"client_credentials",
            scope:"email"		 
         },
    headers:{
          'Authorization': `Bearer vATR2p2l8cv0BVbpEQ2u9KzdXGW5nMgZ`,
          "Access-Control-Allow-Headers" : "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
          "Access-Control-Allow-Credentials":"true"
    }
  }
// const response = await axios.post("https://api.elementpad.io/elementsapi/oauth2/token?client_id=cEZoGE19mLmQdIPPjXtj2osurm8NRLHK&client_secret=VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW&grant_type=client_credentials&scope=email");

const response = await axios.post("https://api.elementpad.io/elementsapi/oauth2/token", requestOptions);
// const data = await response.json();  
console.log("dataresponse",response) ;  
 }

 

//  const getvalues = async()=>{
//   let access_token = "4ARS96PN27JeY7NyubNjArv9jc4FOL4o";
//   let s =  await axios.request(`https://api.elementpad.io/elementsapi/v1/users`,{headers:{
//         'Authorization': `Bearer vATR2p2l8cv0BVbpEQ2u9KzdXGW5nMgZ`,
//         "Access-Control-Allow-Headers" : "*",
//         "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
//         "Access-Control-Allow-Credentials":"true"
//   }}
//   )
// //   let s = await fetch("https://3.139.93.222:42102/elementsapi/v1/users/",{headers:{
// //     'Authorization': "Bearer 4Ro0FgB38F68WXzIdusdCCMLFwu4t9cu",
// //     "Access-Control-Allow-Headers" : "Content-Type",
// //             "Access-Control-Allow-Origin": "https://api.elementpad.io/",
// //             "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
// // }},{mode:'no-cors'})
// // let s = await axios.post("https://api.elementpad.io/elementsapi/v1/users/?Authorization=Bearer bOxj41yiRCTLoW7cMCsKa8DoQ9Ufhu2w")
//   console.log("get",s)
  
    
// }

const getvalues = async()=>{
  //4ARS96PN27JeY7NyubNjArv9jc4FOL4o
  //vATR2p2l8cv0BVbpEQ2u9KzdXGW5nMgZ
  let access_token = "7YcAred0aaxEP2RLxn913eMkMT4HRMvR";
  let s =  await axios.request(`https://api.elementpad.io/elementsapi/v1/users`,{headers:{
        'Authorization': `Bearer 7YcAred0aaxEP2RLxn913eMkMT4HRMvR`,
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
        "Access-Control-Allow-Credentials":"true"
  }}
  )
//   let s = await fetch("https://3.139.93.222:42102/elementsapi/v1/users/",{headers:{
//     'Authorization': "Bearer 4Ro0FgB38F68WXzIdusdCCMLFwu4t9cu",
//     "Access-Control-Allow-Headers" : "Content-Type",
//             "Access-Control-Allow-Origin": "https://api.elementpad.io/",
//             "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
// }},{mode:'no-cors'})
// let s = await axios.post("https://api.elementpad.io/elementsapi/v1/users/?Authorization=Bearer bOxj41yiRCTLoW7cMCsKa8DoQ9Ufhu2w")
  console.log("get",s)
  
    
}


const getanotherquerry = async() =>{
  axios.get(`https://jsonplaceholder.typicode.com/users`)
       .then((res)=>console.log("response",res.data))  
}


  return (
    <div className="App">
                   
                    <button onClick={()=>postValues()}>
                       POST
                    </button>
<br></br>
                    <button onClick={()=>getvalues()}>
                       GET
                    </button>


                   
<br></br>
                    <button onClick={()=>getanotherquerry()}>
                       Sample
                    </button>




                    
    </div>
  );
}

export default App;