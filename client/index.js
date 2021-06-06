require("dotenv").config();

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./protos/sports.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const sports_proto = grpc.loadPackageDefinition(packageDefinition);

function main() {
  const client = new sports_proto.Sports(`localhost:${process.env.PORT}`, grpc.credentials.createInsecure());
  client.searchSport({ id: "224" }, (err, response) => {
    console.log(response);
  });
  client.listSports(({}), (err, response) => {
    console.log(response.data[1]);
  });
}

main();
