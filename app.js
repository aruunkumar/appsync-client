"use strict";
const express = require('express');
const app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
   graphqlFn(req, res)
//   res.render('todo-table', { todos })
});
app.listen(80, function(){
  console.log("Listening on port 80!")
});

function graphqlFn (req, res) {
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
    const apiKey = aws_exports.AWS_SECRET_ACCESS_KEY;

    // Import gql helper and craft a GraphQL query
    const gql = require('graphql-tag');
    const query = gql(`
    query aggregateData {
        getRDSToDos {
         ID  
         NAME
         DESCRIPTION
         PRIORITY
      }
      getDynamoToDos {
        id
        name
        description
        priority
      }
    }`);

    const client = new AWSAppSyncClient({
        url: url,
        region: region,
        auth: {
            type: type,
            apiKey: apiKey
        },
        disableOffline: true      //Uncomment for AWS Lambda
    });

    client.hydrated().then(function (client) {
        //Now run a query
        client.query({ query: query })
        //client.query({ query: query, fetchPolicy: 'network-only' })   //Uncomment for AWS Lambda
            .then(function logData(data) {
                console.log('results of query: ', data.data.getRDSToDos[0]);
                const todos = [];
                data.data.getDynamoToDos.forEach(element => {
                    todos.push(element);
                });
                let RDSToDos = data.data.getRDSToDos.map(item => {
                    return {
                        id: item.ID,
                        name: item.NAME,
                        description: item.DESCRIPTION,
                        priority: item.PRIORITY
                    }
                });
                RDSToDos.forEach(item => {
                  todos.push(item);
                });
                console.log('Final list: ', todos);
                res.render('todo-table', { todos })
            })
            .catch(console.error);

    });
};