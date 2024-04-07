// Process paymentEvents queue messages
import { connect } from "amqplib";
import axios from "axios";

// Connect to RabbitMQ
const amqpUrl = "amqp://localhost"; // Your AMQP server URL
const connection = await connect(amqpUrl);
const channel = await connection.createChannel();

// This makes sure the queue is declared before attempting to consume from it
await channel.assertQueue("paymentEvents", {
  durable: false,
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises -- async/await feature needed
await channel.consume("paymentEvents", async (msg) => {
  if (msg !== null) {
    console.log("Received:", msg.content.toString());
    const event = JSON.parse(msg.content.toString());

    // Send a POST request to the apiEndPoint specified in the message
    try {
      const response = await axios.post(event.apiEndPoint, {
        productId: event.productId,
        amount: event.amount,
        fromPubkey: event.fromPubkey,
      });
      console.log("POST request successful:", response.data);
    } catch (error) {
      console.error("Failed to send POST request:", error);
    }

    channel.ack(msg);
  }
});

console.log("Consumer started");
