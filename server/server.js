require("dotenv").config();
const { WebClient } = require("@slack/web-api");
const { createEventAdapter } = require("@slack/events-api");
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const { RTMClient } = require("@slack/rtm-api");
const axios = require('axios')
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const moment = require("moment");
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


app.get("/orderdetails1", (req, res) => {
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v3/catalog/products?inventory_level=0&limit=2500&page=1`,
      config
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/orderdetails2", (req, res) => {
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v3/catalog/products?inventory_level=0&limit=2500&page=2`,
      config
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/orderdetails3", (req, res) => {
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v3/catalog/products?inventory_level=0&limit=2500&page=3`,
      config
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/orderdetails4", (req, res) => {
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v3/catalog/products?inventory_level=0&limit=2500&page=4`,
      config
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/orderdetails5", (req, res) => {
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v3/catalog/products?inventory_level=0&limit=2500&page=5`,
      config
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/orderdetails6", (req, res) => {
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v3/catalog/products?inventory_level=0&limit=2500&page=6`,
      config
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/orderdetails7", (req, res) => {
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v3/catalog/products?inventory_level=0&limit=2500&page=7`,
      config
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/orderdetails8", (req, res) => {
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v3/catalog/products?inventory_level=0&limit=2500&page=8`,
      config
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/orderdetails9", (req, res) => {
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v3/catalog/products?inventory_level=0&limit=2500&page=9`,
      config
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

let daterange = moment().subtract(6, "hours").subtract(1, "years");

app.delete("/deleteitemrange", (req, res) => {
  pool
    .query('DELETE FROM "item" WHERE created_at<=$1', [daterange])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE ", error);
      res.sendStatus(500);
    });
});

app.delete("/deleteskurange", (req, res) => {
  pool
    .query('DELETE FROM "sku" WHERE created_at<=$1', [daterange])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE ", error);
      res.sendStatus(500);
    });
});

  app.post("/events", async (req, res) => {
    if (req.body.challenge) {
    let status = 200;
    res.status(status).send(req.body.challenge);
    console.log("this is running on message to verify challenge")
    } else {
        let status = 200;
        res.sendStatus(status)
         let text = req.body.event.text;
         let channel = req.body.event.channel;
         let type = req.body.event.type;
        if (type !== "message") {
          return;
        }
          if (channel === "C0139RJPUEM" && text.includes("Referral ")) {
         splitText = text.split(" ");
         console.log("this is splitText", splitText);
         let emailIndex = splitText.indexOf("the");
         console.log("this is emailIndex", emailIndex);
         let checkIndex = splitText.indexOf("details:\n*User:*");
         console.log("this is checkIndex", checkIndex);

         let newEmailIndex = emailIndex + 1;
         console.log("this is newEmailIndex", newEmailIndex);
         let email = splitText[newEmailIndex];
         console.log("this is email", email);
         let newEmail = email.slice(25, email.length - 11);
         console.log("this is newEmail", newEmail);
         if (checkIndex !== -1) {
           newEmailIndex = checkIndex + 1;
           console.log("this is newEmailIndex updated", newEmailIndex);
           email = splitText[newEmailIndex];
           console.log("this is email updated", email);
           newEmail = email.slice(8, email.length - 11);
           console.log("this is newEmail updated", newEmail);
         }
         console.log("this is newEmailIndex", newEmailIndex);
         let checkIndex2 = splitText.indexOf("Amount:*");
         console.log("this is checkIndex2", checkIndex2);
         let checkIndex3 = splitText.indexOf("ID:*");
         console.log("This is checkIndex3", checkIndex3);
         let newOrderNumberIndex = splitText.length - 3;
         console.log("this is newOrderNumberIndex", newOrderNumberIndex);
         let orderNumber = splitText[newOrderNumberIndex];
         console.log("this is orderNumber", orderNumber);
         let newOrderNumber = orderNumber.slice(5, 12);
         console.log("this is newerOrderNumber", newOrderNumber);
         if (checkIndex3 !== -1) {
           newOrderNumberIndex = checkIndex3 + 1;
           console.log("this is newOrderNumberIndex", newOrderNumberIndex);
           orderNumber = splitText[newOrderNumberIndex];
           console.log("this is orderNumber", orderNumber);
           newOrderNumber = orderNumber.slice(0, 7);
           console.log("this is newerOrderNumber", newOrderNumber);
         } else if (checkIndex2 !== -1) {
           newOrderNumberIndex = splitText.length - 5;
           console.log("this is newOrderNumberIndex", newOrderNumberIndex);
           orderNumber = splitText[newOrderNumberIndex];
           console.log("this is orderNumber", orderNumber);
           newOrderNumber = orderNumber.slice(0, 7);
           console.log("this is newerOrderNumber", newOrderNumber);
         }

         let newerEmail = newEmail.slice(newEmail.length / 2 + 1);
         console.log("this is newerEmail", newerEmail);
         axios
           .get(
             `https://api.bigcommerce.com/stores/et4qthkygq/v2/orders/${newOrderNumber}`,
             config
           )
           .then(function (response) {
             // handle success
             if (response.data !== []) {
                     let nowMonth =
                       Number(moment().subtract(6, "hours").month()) + 1;
                     let nowYear = Number(moment().subtract(6, "hours").year());
                     let prevYear = Number(
                       moment().subtract(6, "hours").year()
                     );
                     let nowDay = Number(moment().subtract(6, "hours").date());
                     let hour = Number(moment().subtract(6, "hours").hour());
                     let min = Number(moment().subtract(6, "hours").minute());
                     let sec = Number(moment().subtract(6, "hours").second());
                     if (hour < 10) {
                       hour = "0" + String(hour);
                     }
                     if (min < 10) {
                       min = "0" + String(min);
                     }
                     if (sec < 10) {
                       sec = "0" + String(sec);
                     }
                     if (nowMonth === 1) {
                       prevYear = moment().year() - 1;
                     }
                      let normalHour = Number(hour);
                      let AmPm = "AM";
                      if (normalHour > 12) {
                        AmPm = "PM";
                        normalHour = normalHour - 12;
                      } else if (normalHour === 12) {
                        AmPm = "PM";
                      } else if (normalHour === 00) {
                        AmPm = "AM";
                        normalHour = 12;
                      }
               console.log(response.data);
               console.log(response.data.date_created);
               let created_at = `${nowMonth}/${nowDay}/${nowYear} ${normalHour}:${min}:${sec}${AmPm}`;
               console.log(response.data.subtotal_ex_tax);
               let order_total = response.data.subtotal_ex_tax;
               axios
                 .get(
                   `https://api.bigcommerce.com/stores/et4qthkygq/v2/orders/${newOrderNumber}/products`,
                   config
                 )
                 .then(function (response) {
                   // handle success
                   if (response.data !== []) {
                     
                     let titleString = `  <div><img
        src="https://cdn11.bigcommerce.com/s-et4qthkygq/images/stencil/177x60/htwlogo_web_1573140308__59565.original.png"
       width="150"
      /></div>
                     <div style="color:black; padding-left: 30px; background-color:#DCDCDC; font-family:Arial Narrow, sans-serif; opacity:0.5;"><i>The following are the order details for your recent sale</div>
<table style="border-collapse: collapse; font-family:Arial Narrow, sans-serif;"><tr><td style="width: 20%; border: 1px solid white; padding: 5px; margin: 5px; background-color: #006bd6; color: white;">Order number:</td><td style="width: 80%; border: 1px solid #909090; padding: 5px; margin: 5px;"> ${newOrderNumber} </td></tr>`;
                     let array = response.data;
                     let newArray = [];
                     let optionsArray = [];
                     for (let index = 0; index < array.length; index++) {
                       const element = array[index];
                       newArray.push(`<tr><td style="width: 20%; border: 1px solid white; padding: 5px; margin: 5px; background-color: #006bd6; color: white;">Item</td><td style="width: 80%; border: 1px solid #909090; padding: 5px; margin: 5px;"> ${
                         index + 1
                       }</td></tr>
<tr><td style="width: 20%; border: 1px solid white; padding: 5px; margin: 5px; background-color: #006bd6; color: white;">Item Name:</td><td style="width: 80%; border: 1px solid #909090; padding: 5px; margin: 5px;"> ${
                         element.name
                       }</td></tr>
<tr><td style="width: 20%; border: 1px solid white; padding: 5px; margin: 5px; background-color: #006bd6; color: white;">SKU Number:</td><td style="width: 80%; border: 1px solid #909090; padding: 5px; margin: 5px;"> ${
                         element.sku
                       }</td></tr>`);
                       sku = element.sku;
                       name = element.name;
                       let options = element.product_options;
                       const query2Text =
                         'INSERT INTO "sku" (email, order_number, sku, description, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id';
                       pool.query(query2Text, [
                         newerEmail,
                         newOrderNumber,
                         sku,
                         name,
                         created_at,
                       ]);
                       for (let j = 0; j < options.length; j++) {
                         const opt = options[j];
                         optionsArray.push(
                           `<tr><td style="width: 20%; border: 1px solid white; padding: 5px; margin: 5px; background-color: #006bd6; color: white;">${opt.display_name}:</td><td style="width: 80%; border: 1px solid #909090; padding: 5px; margin: 5px;"> ${opt.display_value}</td></tr>`
                         );
                       }
                       let optionsJoined = optionsArray.join("");
                       newArray.push(optionsJoined);
                       newArray.push(
                         "</table><br><br><br>"
                       );
                       optionsArray = [];
                       qty = array.length;
                     }
                     let joinedArray = newArray.join("");
                     let finalArray = titleString + joinedArray;
                     console.log(finalArray);
                     const queryText =
                       'INSERT INTO "item" (email, order_number, order_total, qty, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id';
                     pool
                       .query(queryText, [
                         newerEmail,
                         newOrderNumber,
                         order_total,
                         qty,
                         created_at,
                       ])

                       .catch(function (error) {
                         console.log("Sorry, there is an error", error);
                         res.sendStatus(500);
                       });
                     const msg = {
                       personalizations: [
                         {
                           to: [
                             {
                               email: newerEmail,
                             },
                           ],
                           bcc: [
                             {
                               email: "chris.neisen@heattransferwarehouse.com",
                             },
                           ],
                         },
                       ],
                       from: "sales@heattransferwarehouse.com", // Use the email address or domain you verified above
                       subject: `Sale details for order ${newOrderNumber}`,
                       html: finalArray,
                     };
                     (async () => {
                       try {
                         await sgMail.send(msg);
                       } catch (error) {
                         console.error(error);

                         if (error.response) {
                           console.error(error.response.body);
                         }
                       }
                     })();
                   }
                    (async () => {
                      // See: https://api.slack.com/methods/chat.postMessage
                      const res = await web.chat.postMessage({
                        icon_emoji: ":email:",
                        channel: conversationId,
                        text:
                          `Order details have been emailed to ${newerEmail}`,
                      });

                      // `res` contains information about the posted message

                      console.log("Message sent");
                    })();
                
                 })
                 .catch(function (error) {
                   // handle error
                   console.log(error);
                    (async () => {
                      // See: https://api.slack.com/methods/chat.postMessage
                      const res = await web.chat.postMessage({
                        icon_emoji: ":email:",
                        channel: conversationId,
                        text: `Email failed to send, please contact web support`,
                      });

                      // `res` contains information about the posted message

                      console.log("Message sent");
                    })();
                 });
             }
           })
           .catch(function (error) {
             // handle error
             console.log(error);
           });
      
    } else {
      return;
    }
  }
  });
  
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

const conversationId = "C0139RJPUEM";



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
        text: "Connected",
      });

      // `res` contains information about the posted message
      
      console.log("Message sent: ", res);
    })();
    console.log("bot listening on port", PORT);
});



app.get("/itemlist", (req, res) => {
  console.log("We are about to get the item list");

  const queryText = `select * from "item" ORDER BY id DESC`;
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

app.get("/getviewed", (req, res) => {
  console.log("We are about to get the item list");

  const queryText = `SELECT * FROM viewed`;
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

app.post("/viewed", (req, res) => {
  //api to set priority of new stock items
  const { sku } = req.body;
  const queryText = 'INSERT INTO "viewed" (sku) VALUES ($1)';

  pool
    .query(queryText, [sku])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error UPDATE ", error);
      res.sendStatus(500);
    });
});

app.delete("/unviewed/:id", (req, res) => {
  //api to set priority of new stock items
 pool
   .query('DELETE FROM "viewed" WHERE sku=$1', [req.params.id])
   .then((result) => {
     res.sendStatus(204); //No Content
   })
   .catch((error) => {
     console.log("Error DELETE ", error);
     res.sendStatus(500);
   });
});

app.post("/checkemail", (req, res) => {
  let skuinfo = req.body; 
      let {
      email,
      startDate,
      endDate,
    } = skuinfo;
      const queryText =
        "SELECT array_agg(DISTINCT sku) as sku, array_agg(DISTINCT description) as description, COUNT(*) FROM sku where email=$1 AND created_at>=$2 AND created_at<=$3 GROUP BY sku;";
      pool
        .query(queryText, [email, startDate, endDate])
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

app.get("/skus", (req, res) => {
  console.log("We are about to get the item list");

  const queryText = `select * from sku order by "created_at"`;
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

 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
   console.log("server running on: ", PORT);
 });