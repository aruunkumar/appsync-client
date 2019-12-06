"use strict";
/**
* This shows how to use standard Apollo client on Node.js
*/
// Require exports file with endpoint and auth info
const aws_exports = require('./aws-exports').default;

global.WebSocket = require('ws');

require('es6-promise').polyfill();
require('isomorphic-fetch');


// Require AppSync module
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;

const url = aws_exports.ENDPOINT;
const region = aws_exports.REGION;
const type = AUTH_TYPE.API_KEY;

// If you want to use API key-based auth
const apiKey = aws_exports.AWS_SECRET_ACCESS_KEY;


// If you want to use AWS...
const AWS = require('aws-sdk');
// AWS.config.update({
//     region: aws_exports.REGION,
//     credentials: new AWS.Credentials({
//         accessKeyId: aws_exports.AWS_ACCESS_KEY_ID,
//         secretAccessKey: aws_exports.AWS_SECRET_ACCESS_KEY
//     })
// });
// const credentials = AWS.config.credentials;

// Import gql helper and craft a GraphQL query
const gql = require('graphql-tag');
const query = gql(`
query aggregateData {
    getRDSToDos {
         NAME
          DESCRIPTION
          PRIORITY
      }
      listToDos {
       items {
          id
          name
          description
          priority
        }
      }
    }`);
// query AllPosts {
// allPosts {
//     id
//     title
//     content
//     author
// }
// }`);



// Set up Apollo client

const client = new AWSAppSyncClient({
    url: url,
    region: region,
    auth: {
        type: type,
        apiKey: apiKey
   //     credentials: credentials,
    },
    disableOffline: true      //Uncomment for AWS Lambda
});


client.hydrated().then(function (client) {
    //Now run a query
     client.query({ query: query })
    //client.query({ query: query, fetchPolicy: 'network-only' })   //Uncomment for AWS Lambda
        .then(function logData(data) {
            console.log('results of query: ', data.data.getRDSToDos[2]);
        })
        .catch(console.error);

    //Now subscribe to results
    // const observable = client.subscribe({ query: subquery });

    // const realtimeResults = function realtimeResults(data) {
    //     console.log('realtime data: ', data);
    // };

    // observable.subscribe({
    //     next: realtimeResults,
    //     complete: console.log,
    //     error: console.log,
    // });
});