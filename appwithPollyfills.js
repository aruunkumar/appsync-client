'use strict';
const aws_exports = require('./aws-exports').default;
// CONFIG
const AppSync = {
    "graphqlEndpoint": aws_exports.ENDPOINT,
    "region": aws_exports.REGION,
    "authenticationType": aws_exports.authenticationType,
    "apiKey": aws_exports.AWS_SECRET_ACCESS_KEY,
};
const ApiId = aws_exports.AWS_ACCESS_KEY_ID;

// POLYFILLS
global.WebSocket = require('ws');
global.window = global.window || {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    WebSocket: global.WebSocket,
    ArrayBuffer: global.ArrayBuffer,
    addEventListener: function () { },
    navigator: { onLine: true }
};
global.localStorage = {
    store: {},
    getItem: function (key) {
        return this.store[key]
    },
    setItem: function (key, value) {
        this.store[key] = value
    },
    removeItem: function (key) {
        delete this.store[key]
    }
};
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Require AppSync module
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;

// INIT
// Set up AppSync client
console.log('URL:', AppSync.graphqlEndpoint);
console.log('region:', AppSync.region);
console.log('type:', AUTH_TYPE.API_KEY);
console.log('apikey:', AppSync.apiKey);
const client = new AWSAppSyncClient({
    url: AppSync.graphqlEndpoint,
    region: AppSync.region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: AppSync.apiKey
    }
});
console.log('Client: ', client);
// GRAPHQL
const gql = require('graphql-tag');

const Query = gql(`
query AllPosts {
allPosts {
    id
    title
    content
    author
}
}`);

// APP CODE
client.hydrated().then(function (client) {
    // Now run a query
    client.query({ query: Query})
        .then(function log(data) {
            data = JSON.stringify(data);
            data = JSON.parse(data);
            console.log('(Query Data) All Posts ----------->', data);
        })
        .catch(console.error);
});