// const amqp = require('amqplib');

// class MessageBroker {
//   constructor() {
//     this.connection = null;
//     this.channel = null;
//   }

//   async connect() {
//     this.connection = await amqp.connect(process.env.RABBITMQ_URL);
//     this.channel = await this.connection.createChannel();
//   }

//   async publishMessage(queue, message) {
//     if (!this.channel) {
//       await this.connect();
//     }
//     await this.channel.assertQueue(queue, { durable: false });
//     this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
//   }

//   async consumeMessage(queue, callback) {
//     if (!this.channel) {
//       await this.connect();
//     }
//     await this.channel.assertQueue(queue, { durable: false });
//     this.channel.consume(queue, (msg) => {
//       if (msg !== null) {
//         const content = JSON.parse(msg.content.toString());
//         callback(content);
//         this.channel.ack(msg);
//       }
//     });
//   }
// }

// module.exports = new MessageBroker();