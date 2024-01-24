import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import TicketCreatedListener from "./events/ticket-created-listener";

console.clear();

// Cluster ID, client ID, options
const client = nats.connect("ticketing", randomBytes(4).toString("hex"), {
    url: "http://localhost:4222"
});


client.on("connect", () => {
    console.log("Listener connected to NATS");

    client.on("close", () => {
        console.log("NATS connection closed");
        process.exit();
    });

    new TicketCreatedListener(client).listen();
});

// Graceful shutdown
process.on("SIGINT", () => client.close());
process.on("SIGTERM", () => client.close());
