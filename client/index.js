const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../protos/city.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const city_proto = grpc.loadPackageDefinition(packageDefinition).location;

function main() {
    const client = new city_proto.City('localhost:50051', grpc.credentials.createInsecure());
    client.myCity({ name: "Mossoró" }, function (err, response) {
        console.log(response.message);
    });
}

main();
