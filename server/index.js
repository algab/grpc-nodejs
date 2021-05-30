const grpc = require("@grpc/grpc-js");
const proto = require("@grpc/proto-loader");

const packageDefinition = proto.loadSync(`${__dirname}/../protos/city.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const city_proto = grpc.loadPackageDefinition(packageDefinition).location;

function myCity(call, callback) {
    callback(null, { message: 'My City is ' + call.request.name });
}

function main() {
    const port = "50051";
    const server = new grpc.Server();
    server.addService(city_proto.City.service, { myCity });
    server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Server Running on Port ${port}`);
        server.start();
    });
}

main();
