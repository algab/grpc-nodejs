require("dotenv").config();

const grpc = require("@grpc/grpc-js");

const services = require("./services");

function main() {
  const server = new grpc.Server();
  services(server);
  server.bindAsync(`0.0.0.0:${process.env.PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
    server.start();
  });
}

main();
