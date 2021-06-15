const express = require('express');
const app = express();

const PROTO_PATH = './proto/greeter.proto';
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);

const grpc = require('@grpc/grpc-js');
const greetProto = grpc.loadPackageDefinition(packageDefinition).greeter;

const GRPC_TARGET = 'localhost:8081';

const greet = (name, httpRes) => {
  const client = new greetProto.Greeter(GRPC_TARGET, grpc.credentials.createInsecure());

  client.greet({name}, (err, res) => {
    if (!err) {
      httpRes.json(res.greeting);
    }
  });
};

app.get('/greet', (req, res) => {
  console.log('[REST API] New request on /greet');

  const name = req.query.name || 'World';
  greet(name, res);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`[REST API] Server started on port ${PORT}`))