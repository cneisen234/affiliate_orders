require("dotenv").config();
const { WebClient } = require("@slack/web-api");
const { createEventAdapter } = require("@slack/events-api");
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const { RTMClient } = require("@slack/rtm-api");
const axios = require('axios')
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./pool");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("build"));

let config = {
  headers: {
    "X-Auth-Client": process.env.BG_AUTH_CLIENT,
    "X-Auth-Token": process.env.BG_AUTH_TOKEN,
  },
};
  //  if (process.env.NODE_ENV === "production") {
  //    // Exprees will serve up production assets
  //    app.use(express.static("client/build"));

  //    // Express serve up index.html file if it doesn't recognize route
  //    const path = require("path");
  //    app.get("*", (req, res) => {
  //      res.sendFile(path.resolve(__dirname, "public", "index.html"));
  //    });
  //  }

  app.post("/events", async (req, res) => {
    if (req.body.challenge) {
    let status = 200;
    res.status(status).send(req.body.challenge);
    console.log("this is running on message to verify challenge")
    } else {
    console.log(req.body.text)
    console.log(req.body.channel)
      //   console.log(
      //   `Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`
      // );
    //     if (data.type !== "message") {
    //       return;
    //     }
    //       if (data.channel === "C0139RJPUEM" && text.includes("Referral ")) {
    //   console.log(
    //     `Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`
    //   );
      
    // }
  }
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("server running on: ", PORT);
  });
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

const conversationId = "C0139RJPUEM";

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(token);

// Calling `rtm.on(eventName, eventHandler)` allows you to handle events (see: https://api.slack.com/events)
// When the connection is active, the 'ready' event will be triggered



// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start().then(() => {
  // Listening on path '/slack/events' by default
    (async () => {
      // See: https://api.slack.com/methods/chat.postMessage
      const res = await web.chat.postMessage({
        icon_emoji: ":email:",
        channel: conversationId,
        text: "Testing connection",
      });

      // `res` contains information about the posted message
      
      console.log("Message sent: ", res);
    })();
    console.log("bot listening on port", PORT);
});

    slackEvents.on("message", (event) => {
  
      // (async () => {
      //   // See: https://api.slack.com/methods/chat.postMessage
      //   const res = await web.chat.postMessage({
      //     icon_emoji: ":email:",
      //     channel: conversationId,
      //     text: "Testing message",
      //   });

        // `res` contains information about the posted message
        console.log("Message sent: ", res);
      // })();
      
    });



//message handler
// bot.on('message', (data) => {
//       const params = {
//         icon_emoji: ":email:",
//       };
//     if (data.type !== 'message') {
//         return;
//     }
//     let text = data.text
//     if (data.channel === "C0139RJPUEM" && text.includes("Referral ")) {
//       splitText = text.split(" ");
//       console.log("this is splitText", splitText)
//       let emailIndex = splitText.indexOf("the");
//       console.log("this is emailIndex", emailIndex)
//       let checkIndex = splitText.indexOf('details:\n*User:*')
//       console.log("this is checkIndex", checkIndex)
       
//         let newEmailIndex = emailIndex + 1;
//         console.log("this is newEmailIndex", newEmailIndex)
//          let email = splitText[newEmailIndex];
//          console.log("this is email", email);
//         let newEmail = email.slice(25, email.length - 11);
//         console.log("this is newEmail", newEmail);
//       if ( checkIndex !== -1) {
//         newEmailIndex = checkIndex + 1;
//         console.log("this is newEmailIndex updated", newEmailIndex);
//          email = splitText[newEmailIndex];
//          console.log("this is email updated", email);
//          newEmail = email.slice(8, email.length - 11);
//          console.log("this is newEmail updated", newEmail);
//       } 
//       console.log("this is newEmailIndex", newEmailIndex);
//       // let orderNumberIndex = splitText.indexOf("am\n*Transaction'");
//       // console.log("this is orderNumberIndex", orderNumberIndex);
//       let checkIndex2 = splitText.indexOf("Amount:*");
//       console.log("this is checkIndex2", checkIndex2);
//       let checkIndex3 = splitText.indexOf("ID:*");
//       console.log("This is checkIndex3", checkIndex3)
//           let newOrderNumberIndex = splitText.length - 3;
//           console.log("this is newOrderNumberIndex", newOrderNumberIndex);
//          let orderNumber = splitText[newOrderNumberIndex];
//           console.log("this is orderNumber", orderNumber);
//           let newOrderNumber = orderNumber.slice(5, 12);
//           console.log("this is newerOrderNumber", newOrderNumber);
//       if (checkIndex3 !== -1) {
//          newOrderNumberIndex = checkIndex3 + 1;
//          console.log("this is newOrderNumberIndex", newOrderNumberIndex);
//          orderNumber = splitText[newOrderNumberIndex];
//          console.log("this is orderNumber", orderNumber);
//          newOrderNumber = orderNumber.slice(0, 7);
//          console.log("this is newerOrderNumber", newOrderNumber);
//       }
//       else if (checkIndex2 !== -1) {
//         newOrderNumberIndex = splitText.length - 5;
//         console.log("this is newOrderNumberIndex", newOrderNumberIndex);
//         orderNumber = splitText[newOrderNumberIndex];
//         console.log("this is orderNumber", orderNumber);
//           newOrderNumber = orderNumber.slice(0, 7);
//           console.log("this is newerOrderNumber", newOrderNumber);
//       }
      
//       let newerEmail = newEmail.slice(newEmail.length / 2 + 1);
//       console.log("this is newerEmail", newerEmail)
//       axios
//         .get(
//           `https://api.bigcommerce.com/stores/et4qthkygq/v2/orders/${newOrderNumber}`,
//           config
//         )
//         .then(function (response) {
//           // handle success
//           if (response.data !== []) {
//             console.log(response.data);
//             console.log(response.data.date_created);
//             let created_at = response.data.date_created
//             console.log(response.data.subtotal_ex_tax);
//             let order_total = response.data.subtotal_ex_tax;
//             axios
//               .get(
//                 `https://api.bigcommerce.com/stores/et4qthkygq/v2/orders/${newOrderNumber}/products`,
//                 config
//               )
//               .then(function (response) {
//                 // handle success
//                 if (response.data !== []) {
//                   let titleString = `<div>The following are the order details for your recent sale</div>
// <div>Order number: ${newOrderNumber} </br></br>`;
//                   let array = response.data;
//                   let newArray = [];
//                   let optionsArray = [];
//                   for (let index = 0; index < array.length; index++) {
//                     const element = array[index];
//                     newArray.push(`<div>Item ${index + 1}</div>
// <div>Item Name: ${element.name}</div>
// <div>SKU Number: ${element.sku}</div>`);
// sku = element.sku
//                     let options = element.product_options;
//                        const query2Text =
//                          'INSERT INTO "sku" (email, order_number, sku, created_at) VALUES ($1, $2, $3, $4) RETURNING id';
//                        pool.query(query2Text, [
//                          newerEmail,
//                          newOrderNumber,
//                          sku,
//                          created_at,
//                        ]);
//                     for (let j = 0; j < options.length; j++) {
//                       const opt = options[j];
//                       optionsArray.push(
//                         `<div>${opt.display_name}: ${opt.display_value}</div>`
//                       );
//                     }
//                     let optionsJoined = optionsArray.join();
//                     newArray.push(optionsJoined);
//                     newArray.push("<br><br> --------------------------------------------");
//                     optionsArray = [];
//                     qty = array.length
//                   }
//                   let joinedArray = newArray.join();
//                   let finalArray = titleString + joinedArray;
//                   console.log(finalArray);
//                     //now lets add admin information to the user table
//                     const queryText =
//                       'INSERT INTO "item" (email, order_number, order_total, qty, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id';
//                     pool
//                       .query(queryText, [newerEmail, newOrderNumber, order_total, qty, created_at])
//                         // .then((result) => res.status(201).send(result.rows))
//                         // .catch(function (error) {
//                         //   console.log(
//                         //     "Sorry, there was an error with your query: ",
//                         //     error
//                         //   );
//                         //   res.sendStatus(500); // HTTP SERVER ERROR
//                         // })

//                         .catch(function (error) {
//                           console.log("Sorry, there is an error", error);
//                           res.sendStatus(500);
//                         });
//                   const msg = {
//                     personalizations: [
//                       {
//                         to: [
//                           {
//                             email: newerEmail,
//                           },
//                         ],
//                         bcc: [
//                           {
//                             email: "chris.neisen@heattransferwarehouse.com",
//                           },
//                         ],
//                       },
//                     ],
//                     from: "sales@heattransferwarehouse.com", // Use the email address or domain you verified above
//                     subject: `Sale details for order ${newOrderNumber}`,
//                     html: finalArray,
//                   };
//                   (async () => {
//                     try {
//                       await sgMail.send(msg);
//                     } catch (error) {
//                       console.error(error);

//                       if (error.response) {
//                         console.error(error.response.body);
//                       }
//                     }
//                   })();
//                 }
//                    bot.postMessageToChannel(
//                      "osiaffilate",
//                      `Order details have been emailed to ${newerEmail}`,
//                      params
//                    );
                   
//               })
//               .catch(function (error) {
//                 // handle error
//                 console.log(error);
//                    bot.postMessageToChannel(
//                      "osiaffilate",
//                      `Email failed to send, please contact web support`,
//                      params
//                    );
//               });
//           }
//         })
//         .catch(function (error) {
//           // handle error
//           console.log(error);
//         });
//     } else {
//       return;
//     }
// });
app.get("/itemlist", (req, res) => {
  console.log("We are about to get the item list");

  const queryText = `SELECT * FROM "item";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on item query ${error}`);
      res.sendStatus(500);
    });
});



app.get("/total", (req, res) => {
  console.log("We are about to get the item list");

  const queryText = `SELECT array_agg(DISTINCT email) as email, COUNT(*) FROM sku GROUP BY email;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on item query ${error}`);
      res.sendStatus(500);
    });
});

app.post("/checkemail", (req, res) => {
  let skuinfo = req.body; 
      let {
      email,
    } = skuinfo;
    console.log("this is the payload before it reaches the get", email)
      console.log("We are about to get the sku list", email);
      const queryText =
        "SELECT array_agg(DISTINCT sku) as sku, COUNT(*) FROM sku where email=$1 GROUP BY sku;";
      pool
        .query(queryText, [email])
        .then((result) => {
          res.send(result.rows);
        })
        .catch((error) => {
          console.log(`Error on item query ${error}`);
          res.sendStatus(500);
        });
});

app.post("/orderdetails", (req, res) => {
  let order_number = req.body.order_number;
  console.log("this is the payload before it reaches the get", order_number);
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v2/orders/${order_number}/products`,
      config
    )
    .then(function (response) {
      console.log("this is the response", response.data)  
   
        res.send(response.data);
      })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
});
app.get("/email", (req, res) => {
  console.log("We are about to get the item list");

  const queryText = `select array_agg(DISTINCT email) as email from item group by email`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on item query ${error}`);
      res.sendStatus(500);
    });
});