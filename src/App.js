// // import './App.css';

// // // import express from 'express';
// // // import {cors} from 'cors';

// // import { useEffect } from "react";
// // import { useState } from "react";
// // import axios from 'axios';



// // function App() {


// //  const postValues =async()=>{
   
// //   const requestOptions = {
// //     method:'POST',
// //     param: { 
       
// //             client_id:"cEZoGE19mLmQdIPPjXtj2osurm8NRLHK",
// //             client_secret:"VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW",
// //             grant_type:"client_credentials",
// //             scope:"email"		 
// // }
// //   }
// // const response = await axios.post("https://api.elementpad.io/elementsapi/oauth2/token?client_id=cEZoGE19mLmQdIPPjXtj2osurm8NRLHK&client_secret=VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW&grant_type=client_credentials&scope=email");
// // // const response = await axios.request("https://api.elementpad.io/elementsapi/oauth2/token", requestOptions);
// // // const data = await response.json();  
// // console.log("dataresponse",response) ;  
// //  }

 

// //  const getvalues = async()=>{
   
// //   let s = await axios.get("https://api.elementpad.io/elementsapi/v1/users/",{headers:{
// //     'Authorization': "Bearer ymzWoN5xlj7GMyN39Xhf4fFf52yVtJCS"
// //     //,
// //     //"Access-Control-Allow-Origin":"*",
// //     //"Access-Control-Allow-Credentials": true,
// //     //"Content-Type":'application/json'
// // }})
// // // let s = await axios.post("https://api.elementpad.io/elementsapi/v1/users/?Authorization=Bearer bOxj41yiRCTLoW7cMCsKa8DoQ9Ufhu2w")
// //   console.log("get",s)
  
    
// // }


// // const getanotherquerry = async() =>{
// //   axios.get(`https://jsonplaceholder.typicode.com/users`,{
// //         headers:{
// //           'Authorization':"RLvP6UdNMiSbtUWUqmmigXETTI1saVGb"
// //       }
// //       })
// //        .then((res)=>console.log("response",res.data))  
// // }


// // const getvaluenew = async()=>{   
// //   let s = await axios.get("https://api.elementpad.io/elementsapi/v1/users/",
// //   {headers:{
// //     'Authorization': "Bearer ymzWoN5xlj7GMyN39Xhf4fFf52yVtJCS",
// //     "Access-Control-Allow-Origin":"*",
// //     "Content-Type":"application/json",
// //     "Accept":"application/json"
// //   }
// //   }
// //   )
// //   console.log("getNew",s)    
// // }


// // const postValuesNew =async()=>{
// // const jsonform={
// //   "assetId":7,
// //   "assetName":"AName7"
// // }
// // const response = await axios.post("https://api.elementpad.io/elementsapi/v1/stableCoin",
// // {headers:{  
// //   "Access-Control-Allow-Origin":"*",
// //   "Content-Type":"application/json",
// //   "Accept":"application/json"
// // }
// // }
// // ,jsonform);
// // // const response = await axios.request("https://api.elementpad.io/elementsapi/oauth2/token", requestOptions);
// // // const data = await response.json();  
// // console.log("dataresponse",response) ;  
// //  }

// //   return (
// //     <div className="App">
                   
// //                     <button onClick={()=>postValues()}>
// //                        POST
// //                     </button>
// // <br></br>
// //                     <button onClick={()=>getvalues()}>
// //                        GET
// //                     </button>


                   
// // <br></br>
// //                     <button onClick={()=>getanotherquerry()}>
// //                        Sample
// //                     </button>
// //                     <br></br>
// //                     <button onClick={()=>getvaluenew()}>
// //                        GET-New
// //                     </button>
// //                     <button onClick={()=>postValuesNew()}>
// //                        POST-New
// //                     </button>


                   




                    
// //     </div>
// //   );
// // }

// // export default App;


// import './App.css';

// // import express from 'express';
// // import {cors} from 'cors';

// import { useEffect } from "react";
// import { useState } from "react";
// import axios from 'axios';
// import url from './configurl';



// function App() {


//  const postValues =async()=>{
   
//   const requestOptions = {
//     method:'POST',
    
//     param: { 
       
//             client_id:"cEZoGE19mLmQdIPPjXtj2osurm8NRLHK",
//             client_secret:"VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW",
//             grant_type:"client_credentials",
//             scope:"email"		 
//          },
//     headers:{
//           'Authorization': `Bearer vATR2p2l8cv0BVbpEQ2u9KzdXGW5nMgZ`,
//           "Access-Control-Allow-Headers" : "*",
//           "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
//           "Access-Control-Allow-Credentials":"true"
//     }
//   }
// // const response = await axios.post("https://api.elementpad.io/elementsapi/oauth2/token?client_id=cEZoGE19mLmQdIPPjXtj2osurm8NRLHK&client_secret=VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW&grant_type=client_credentials&scope=email");

// const response = await axios.post("https://api.elementpad.io/elementsapi/oauth2/token", requestOptions);
// // const data = await response.json();  
// console.log("dataresponse",response) ;  
//  }

 

// //  const getvalues = async()=>{
// //   let access_token = "4ARS96PN27JeY7NyubNjArv9jc4FOL4o";
// //   let s =  await axios.request(`https://api.elementpad.io/elementsapi/v1/users`,{headers:{
// //         'Authorization': `Bearer vATR2p2l8cv0BVbpEQ2u9KzdXGW5nMgZ`,
// //         "Access-Control-Allow-Headers" : "*",
// //         "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
// //         "Access-Control-Allow-Credentials":"true"
// //   }}
// //   )
// // //   let s = await fetch("https://3.139.93.222:42102/elementsapi/v1/users/",{headers:{
// // //     'Authorization': "Bearer 4Ro0FgB38F68WXzIdusdCCMLFwu4t9cu",
// // //     "Access-Control-Allow-Headers" : "Content-Type",
// // //             "Access-Control-Allow-Origin": "https://api.elementpad.io/",
// // //             "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
// // // }},{mode:'no-cors'})
// // // let s = await axios.post("https://api.elementpad.io/elementsapi/v1/users/?Authorization=Bearer bOxj41yiRCTLoW7cMCsKa8DoQ9Ufhu2w")
// //   console.log("get",s)
  
    
// // }

// const getvalues = async()=>{
//   //4ARS96PN27JeY7NyubNjArv9jc4FOL4o
//   //vATR2p2l8cv0BVbpEQ2u9KzdXGW5nMgZ
//   let access_token = "7YcAred0aaxEP2RLxn913eMkMT4HRMvR";
//   let s =  await axios.request(`https://api.elementpad.io/elementsapi/v1/users`,{headers:{
//         'Authorization': `Bearer 7YcAred0aaxEP2RLxn913eMkMT4HRMvR`,
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


// const getanotherquerry = async() =>{
//   axios.get(`https://jsonplaceholder.typicode.com/users`)
//        .then((res)=>console.log("response",res.data))  
// }


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




                    
//     </div>
//   );
// }

// export default App;


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
    method: 'POST',
    headers:{
          'Authorization': `Bearer vATR2p2l8cv0BVbpEQ2u9KzdXGW5nMgZ`,
          "Access-Control-Allow-Headers" : "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
          "Access-Control-Allow-Credentials":"true"
    },
    body: JSON.stringify({ 
            client_id:"cEZoGE19mLmQdIPPjXtj2osurm8NRLHK",
            client_secret:"VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW",
            grant_type:"client_credentials",
            scope:"email"		 
    })
  };
  // const requestOptions = {
  //   method:'POST',    
  //   param: { 
       
  //           client_id:"cEZoGE19mLmQdIPPjXtj2osurm8NRLHK",
  //           client_secret:"VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW",
  //           grant_type:"client_credentials",
  //           scope:"email"		 
  //   },
  //   headers:{
  //         'Authorization': `Bearer vATR2p2l8cv0BVbpEQ2u9KzdXGW5nMgZ`,
  //         "Access-Control-Allow-Headers" : "*",
  //         "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
  //         "Access-Control-Allow-Credentials":"true"
  //   }
  // }
// const response = await axios.post("https://api.elementpad.io/elementsapi/oauth2/token?client_id=cEZoGE19mLmQdIPPjXtj2osurm8NRLHK&client_secret=VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW&grant_type=client_credentials&scope=email");

const response = await axios.post("https://api.elementpad.io/elementsapi/oauth2/token", requestOptions);
// const data = await response.json();  
console.log("dataresponse",response) ;  
 }


 const newaxiosmethod=async()=>{   
  const requestOptions = {
    method: 'POST',    
      "headers": [
        {
          "source": "/api/(.*)",
          "headers": [
            { "key": "Access-Control-Allow-Credentials", "value": "true" },
            { "key": "Access-Control-Allow-Origin", "value": "*" },
            { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
          ]
        }
      ],
    
    // headers:{
    //       'Authorization': `Bearer 6e5Zf60srxBtXYjz5F1IoPwC40AJcg3d`,
    //       "Access-Control-Allow-Headers" : "*",
    //       "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
    //       "Access-Control-Allow-Credentials":"true"
    // },
    body: JSON.stringify({ 
            client_id:"cEZoGE19mLmQdIPPjXtj2osurm8NRLHK",
            client_secret:"VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW",
            grant_type:"client_credentials",
            scope:"email"		 
    })
  };
  console.log("Before Axios")
  await axios.post("https://api.elementpad.io/elementsapi/oauth2/token",requestOptions)
 .then(async(responseuser) => {
   console.log("uploadeduser",responseuser)                                         
 })
 .catch((e) => {
   console.log("error",e);     
 })                                                  

 }


 
 //res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
 //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 

 const getvalues = async()=>{
  //4ARS96PN27JeY7NyubNjArv9jc4FOL4o
  //vATR2p2l8cv0BVbpEQ2u9KzdXGW5nMgZ
  let access_token = "XsQzv4q16GWMv9bolPuYPPdQOUMncoUa";
  let s =  await axios.request(`https://api.elementpad.io/elementsapi/v1/users`,{headers:{
        'Authorization': `Bearer XsQzv4q16GWMv9bolPuYPPdQOUMncoUa`,
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
        "Access-Control-Allow-Credentials":"true",
        "accept": "application/json, text/plain, */*",
        "authorization": "REDACTED",
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

const getuser = async()=>{

const options = {
  method: 'GET',
  url: 'https://api.elementpad.io/elementsapi/v1/users',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer vhQxkXyA0X0oE1Rm20A03J7Azhp6skkH'
  }
};
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

}

const getanotherquerry = async() =>{
  const options = {
    method: 'POST',
    url: 'https://api.elementpad.io/elementsapi/oauth2/token',
    headers: {'Content-Type': 'application/json'},
    data: {
      client_id: 'cEZoGE19mLmQdIPPjXtj2osurm8NRLHK',
      client_secret: 'VNe8u0lpgcCvE9NsE7Khcft7gA22RMvW',
      grant_type: 'client_credentials',
      scope: 'email'
    }
  };
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  //axios.get(`https://jsonplaceholder.typicode.com/users`)
    //   .then((res)=>console.log("response",res.data))  
}


const extraget=()=>{
  const options = {
    method: 'GET',
    url: 'https://7oigah6lib.execute-api.us-east-2.amazonaws.com/DEV',
    //https://7oigah6lib.execute-api.us-east-2.amazonaws.com/DEV
    // headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer vhQxkXyA0X0oE1Rm20A03J7Azhp6skkH'
    // }
  };
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  
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

                    <button onClick={()=>getuser()}>
                       Sample-2 Get
                    </button>

                    <br></br>
                    <button onClick={()=>newaxiosmethod()}>
                       New POST
                    </button>
                    <br></br>
                    <button onClick={()=>extraget()}>
                       Extra
                    </button>




                    
    </div>
  );
}

export default App;