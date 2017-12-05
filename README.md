# sls-todo
Sample of Serverless Framework + Express.

## prerequiste
- configured aws-cli (ACCESS_KEY and SECRET)
- signed up to [serverless.com](serverless.com)

```
$ npm install -g serverless
```

## usage
### setup

```
$ git clone https://github.com/YoshiyukiKato/sls-todo.git
$ cd sls-todo && npm install
```

```
$ sls dynamodb install
$ sls dynamo start
```

And then, run in local.

```
$ sls offline
```

### deploy
Deploy to AWS. Before deploy, please set an environment variable `DYNAMO_ACCESS_ROLE`.

```
$ sls deploy
```

### remove
Remove from AWS

```
$ sls remove
```