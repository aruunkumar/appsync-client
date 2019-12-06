"use strict";
var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
    html = fs.readFileSync('index.html');

var log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            if (req.url === '/') {
                log('Received message: ' + body);
            } else if (req.url = '/scheduled') {
                log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
            }

            res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
            res.end();
        });
    } else if ((req.method === 'GET') && req.url === '/'){
        console.log('Inside GET block');
        graphqlFn();
        res.writeHead(200);
        res.write(html);
        res.end();
    } else {
        console.log('Method:', req.method);
        res.writeHead(200);
        res.end();
    }
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');

function graphqlFn () {
console.log('inside graphql Fn');    
    global.WebSocket = require('ws');
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Require exports file with endpoint and auth info
const aws_exports = require('./aws-exports').default;

// Require AppSync module
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;

const url = aws_exports.ENDPOINT;
const region = aws_exports.REGION;
const type = AUTH_TYPE.API_KEY;

// If you want to use API key-based auth
const apiKey = 'gumfjdkbc5frfnr5qz5dy4rjf4';
// If you want to use a jwtToken from Amazon Cognito identity:
const jwtToken = 'xxxxxxxx';

// If you want to use AWS...
const AWS = require('aws-sdk');
AWS.config.update({
    region: aws_exports.REGION,
    credentials: new AWS.Credentials({
        accessKeyId: aws_exports.AWS_ACCESS_KEY_ID,
        secretAccessKey: aws_exports.AWS_SECRET_ACCESS_KEY
    })
});
const credentials = AWS.config.credentials;

// Import gql helper and craft a GraphQL query
const gql = require('graphql-tag');
const query = gql(`
query AllPosts {
allPost {
    id
    title
    content
    author
}
}`);

const client = new AWSAppSyncClient({
    url: url,
    region: region,
    auth: {
        type: type,
        credentials: credentials,
    }
    //disableOffline: true      //Uncomment for AWS Lambda
});

client.hydrated().then(function (client) {
    //Now run a query
    console.log('Start of query')
    client.query({ query: query })
    //client.query({ query: query, fetchPolicy: 'network-only' })   //Uncomment for AWS Lambda
        .then(function logData(data) {
            console.log('results of query: ', data);
        })
        .catch(console.error);


});
};