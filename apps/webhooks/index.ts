import express from "express";
import bodyParser from "body-parser";
import { connect } from "amqplib";

// Initialize Express
const app = express();
const PORT = 8001;

app.use(bodyParser.json());

// RabbitMQ setup
const amqpUrl = "amqp://localhost"; // Your AMQP server URL

// Connect to RabbitMQ
const connection = await connect(amqpUrl);
const channel = await connection.createChannel();
await channel.assertQueue("paymentEvents", { durable: false });

// Webhook endpoint
app.post("/webhook", (req, res) => {
  // Here you would verify the request signature
  const event = req.body;
  console.log({ event });

  // Assuming verification passed, we enqueue the event
  if (channel) {
    channel.sendToQueue("paymentEvents", Buffer.from(JSON.stringify(event)));
    res.send("Event queued");
  } else {
    res.status(500).send("Queue not initialized");
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
