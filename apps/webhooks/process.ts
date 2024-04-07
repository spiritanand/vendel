// Process queue messages
import { connect } from "amqplib";

// Conect to RabbitMQ
const amqpUrl = "amqp://localhost"; // Your AMQP server URL
const connection = await connect(amqpUrl);
const channel = await connection.createChannel();

// This makes sure the queue is declared before attempting to consume from it
await channel.assertQueue("paymentEvents", {
  durable: false,
});

await channel.consume("paymentEvents", (msg) => {
  if (msg !== null) {
    console.log("Received:", msg.content.toString());
    channel.ack(msg);
    // Further processing, like decrypting and notifying sellers
  }
});

console.log("Consumer started");
