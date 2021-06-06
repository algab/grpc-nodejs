const grpc = require("@grpc/grpc-js");
const proto = require("@grpc/proto-loader");

const sports = require("./sports");

const packageDefinition = proto.loadSync('./protos/sports.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoSports = grpc.loadPackageDefinition(packageDefinition);

module.exports = (server) => {
  server.addService(protoSports.Sports.service, sports);
};
