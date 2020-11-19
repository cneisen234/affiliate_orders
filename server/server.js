const SlackBot = require('slackbots')
const axios = require('axios')
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");
const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./pool");
const app = express();
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("build"));

let config = {
  headers: {
    "X-Auth-Client": "tw2come9pccgmcr0ybk555jkqcceiih",
    "X-Auth-Token": "13n6uxj2je2wbnc0vggmz8sqjl93d1d",
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
const bot = new SlackBot({
  token: "xoxb-18234618080-1485620851799-hzRxtdbDZJSuh7w7wiTOQ4cF",
  name: "AffiliateOrders",
});

// start handler

bot.on('start', () => {
    const params = {
        icon_emoji: ':email:'
    }

    bot.postMessageToChannel(
      "osiaffilate",
      "Connected",
      params
    );
})

//error handler
bot.on('error', (err) => console.log("the error is", err));

//message handler
bot.on('message', (data) => {
      const params = {
        icon_emoji: ":email:",
      };
    if (data.type !== 'message') {
        return;
    }
    let text = data.text
    if (data.channel === "C0139RJPUEM" && text.includes("Referral ")) {
      splitText = text.split(" ");
      console.log("this is splitText", splitText)
      let emailIndex = splitText.indexOf("the");
      console.log("this is emailIndex", emailIndex)
      let checkIndex = splitText.indexOf('details:\n*User:*')
      console.log("this is checkIndex", checkIndex)
       
        let newEmailIndex = emailIndex + 1;
        console.log("this is newEmailIndex", newEmailIndex)
         let email = splitText[newEmailIndex];
         console.log("this is email", email);
        let newEmail = email.slice(25, email.length - 11);
        console.log("this is newEmail", newEmail);
      if ( checkIndex !== -1) {
        newEmailIndex = checkIndex + 1;
        console.log("this is newEmailIndex updated", newEmailIndex);
         email = splitText[newEmailIndex];
         console.log("this is email updated", email);
         newEmail = email.slice(8, email.length - 11);
         console.log("this is newEmail updated", newEmail);
      } 
      console.log("this is newEmailIndex", newEmailIndex);
      // let orderNumberIndex = splitText.indexOf("am\n*Transaction'");
      // console.log("this is orderNumberIndex", orderNumberIndex);
      let checkIndex2 = splitText.indexOf("Amount:*");
      console.log("this is checkIndex2", checkIndex2);
      let checkIndex3 = splitText.indexOf("ID:*");
      console.log("This is checkIndex3", checkIndex3)
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
      }
      else if (checkIndex2 !== -1) {
        newOrderNumberIndex = splitText.length - 5;
        console.log("this is newOrderNumberIndex", newOrderNumberIndex);
        orderNumber = splitText[newOrderNumberIndex];
        console.log("this is orderNumber", orderNumber);
          newOrderNumber = orderNumber.slice(0, 7);
          console.log("this is newerOrderNumber", newOrderNumber);
      }
      
      let newerEmail = newEmail.slice(newEmail.length / 2 + 1);
      console.log("this is newerEmail", newerEmail)
      axios
        .get(
          `https://api.bigcommerce.com/stores/et4qthkygq/v2/orders/${newOrderNumber}`,
          config
        )
        .then(function (response) {
          // handle success
          if (response.data !== []) {
            console.log(response.data);
            axios
              .get(
                `https://api.bigcommerce.com/stores/et4qthkygq/v2/orders/${newOrderNumber}/products`,
                config
              )
              .then(function (response) {
                // handle success
                if (response.data !== []) {
                  let titleString = `<div>The following are the order details for your recent sale</div>
<div>Order number: ${newOrderNumber} </br></br>`;
                  let array = response.data;
                  let newArray = [];
                  let optionsArray = [];
                  for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    newArray.push(`<div>Item ${index + 1}</div>
<div>Item Name: ${element.name}</div>
<div>SKU Number: ${element.sku}</div>`);
sku = element.sku
                    let options = element.product_options;
                       const query2Text =
                         'INSERT INTO "sku" (email, order_number, sku) VALUES ($1, $2, $3) RETURNING id';
                       pool.query(query2Text, [
                         newerEmail,
                         newOrderNumber,
                         sku,
                       ]);
                    for (let j = 0; j < options.length; j++) {
                      const opt = options[j];
                      optionsArray.push(
                        `<div>${opt.display_name}: ${opt.display_value}</div>`
                      );
                      product_options = `${opt.display_name}: ${opt.display_value}`
                        const query3Text =
                          'INSERT INTO "options" (email, sku, order_number, product_options) VALUES ($1, $2, $3, $4) RETURNING id';
                        pool.query(query3Text, [newerEmail, sku, newOrderNumber, product_options]);
                    }
                    let optionsJoined = optionsArray.join();
                    newArray.push(optionsJoined);
                    newArray.push("<br><br> --------------------------------------------");
                    optionsArray = [];
                    qty = array.length
                  }
                  let joinedArray = newArray.join();
                  let finalArray = titleString + joinedArray;
                  console.log(finalArray);
                    //now lets add admin information to the user table
                    const queryText =
                      'INSERT INTO "item" (email, order_number, qty ) VALUES ($1, $2, $3) RETURNING id';
                    pool
                      .query(queryText, [newerEmail, newOrderNumber, qty])
                        // .then((result) => res.status(201).send(result.rows))
                        // .catch(function (error) {
                        //   console.log(
                        //     "Sorry, there was an error with your query: ",
                        //     error
                        //   );
                        //   res.sendStatus(500); // HTTP SERVER ERROR
                        // })

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
                  //ES6
                  // sgMail.send(msg).then(
                  //   () => {},
                  //   (error) => {
                  //     console.error(error);

                  //     if (error.response) {
                  //       console.error(error.response.body);
                  //     }
                  //   }
                  // );
                  //ES8
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
                   bot.postMessageToChannel(
                     "osiaffilate",
                     `Order details have been emailed to ${newerEmail}`,
                     params
                   );
                   
              })
              .catch(function (error) {
                // handle error
                console.log(error);
                   bot.postMessageToChannel(
                     "osiaffilate",
                     `Email failed to send, please contact web support`,
                     params
                   );
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
});
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

app.get("/sku", (req, res) => {
  console.log("We are about to get the item list");

  const queryText = `SELECT * FROM "sku";`;
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

app.get("/options", (req, res) => {
  console.log("We are about to get the item list");

  const queryText = `SELECT * FROM "options";`;
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
// app.get("/numsku", (req, res) => {
//   console.log("We are about to get the sku list", email);
//  const queryText =
//                       'SELECT array_agg(DISTINCT sku) as sku, COUNT(*) FROM sku where email=$1 GROUP BY sku;';
//   pool
//     .query(queryText, [email])
//     .then((result) => {
//       res.send(result.rows);
      
//     })
//     .catch((error) => {
//       console.log(`Error on item query ${error}`);
//       res.sendStatus(500);
//     });
});
// });
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running on: ", PORT);
});