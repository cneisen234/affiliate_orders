const SlackBot = require('slackbots')
const axios = require('axios')
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("server/public"));


let config = {
  headers: {
    "X-Auth-Client": process.env.X_AUTH_CLIENT,
    "X-Auth-Token": process.env.X_AUTH_TOKEN,
  },
};

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
      let newEmailIndex = emailIndex + 2
      console.log("this is newEmailIndex", newEmailIndex);
      let email = splitText[newEmailIndex];
      console.log("this is email", email)
      let orderNumberIndex = splitText.indexOf("ID:*");
      console.log("this is orderNumberIndex", orderNumberIndex);
      let newOrderNumberIndex = orderNumberIndex + 1
      console.log("this is newOrderNumberIndex", newOrderNumberIndex);
      let orderNumber = splitText[newOrderNumberIndex];
      console.log("this is orderNumber", orderNumber)
      let newEmail = email.slice(8, email.length - 11);
      console.log("this is newEmail", newEmail)
      let newerEmail = newEmail.slice(newEmail.length / 2 + 1);
      console.log("this is newerEmail", newerEmail)
      let newOrderNumber = orderNumber.slice(0, 7);
      console.log("this is newerOrderNumber", newOrderNumber);
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
                    let options = element.product_options;
                    for (let j = 0; j < options.length; j++) {
                      const opt = options[j];
                      optionsArray.push(
                        `<div>${opt.display_name}: ${opt.display_value}</div>`
                      );
                    }
                    let optionsJoined = optionsArray.join();
                    newArray.push(optionsJoined);
                    newArray.push("<br><br> --------------------------------------------");
                    optionsArray = [];
                  }
                  let joinedArray = newArray.join();
                  let finalArray = titleString + joinedArray;
                  console.log(finalArray);
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running on: ", PORT);
});