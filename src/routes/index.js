const express = require("express");
const awsServerlessExpress = require('aws-serverless-express');
const AWS = require("aws-sdk");
const app = require("../app");
const router = express.Router();

//ローカルかリモートかで、dynamodbのconfigを切り替える
const dynamoConfig = process.env.NODE_ENV === "development" ? {
  region: "localhost",
  endpoint: "http://localhost:8888", 
} : {};
const ddc = new AWS.DynamoDB.DocumentClient(dynamoConfig);

//一覧
router.get('/todos', (req, res, next) => {
  ddc.scan({
    TableName: "sls-todos"
  }).promise()
  .then((result) => res.send(result))
  .catch(next);
});

//追加
router.post('/todo', (req, res, next) => {
  ddc.put({
    TableName: "sls-todos", 
    Item: req.body.Item
  }).promise()
  .then((result) => res.send(result))
  .catch(next);
});

//取得
router.get('/todo/:id', (req, res, next) => {
  ddc.get({
    TableName: "sls-todos",
    Key:{
      id: req.params.id,
    }
  }).promise()
  .then((result) => res.send(result))
  .catch(next);
});

//更新
router.put('/todo/:id', (req, res, next) => {
  req.body.Item.id = req.params.id;
  ddc.get({
    TableName: "sls-todos",
    Item: req.body.Item
  }).promise()
  .then((result) => res.send({ message: "update success!" }))
  .catch(next);
});

//削除
router.delete('/todo/:id', (req, res, next) => {
  ddc.delete({
    TableName: "sls-todos",
    Key:{
      id: req.params.id,
    }
  }).promise()
  .then((result) => res.send({ message: "delete success!" }))
  .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.use("/", router);

const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);