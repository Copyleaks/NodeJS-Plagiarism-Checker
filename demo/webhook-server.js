const {
  CompletedWebhookModel,
} = require("../dist/models/submissions/webhooks/completedWebhookModel");
const {
  ErrorWebhookModel,
} = require("../dist/models/submissions/webhooks/errorWebhookModel");
const {
  IndexedWebhookModel,
} = require("../dist/models/submissions/webhooks/indexedWebhookModel");
const {
  CreditsCheckedWebhookModel,
} = require("../dist/models/submissions/webhooks/creditsCheckedWebhookModel");
const {
  NewResultWebhookModel,
} = require("../dist/models/submissions/webhooks/newResultsWebhookModel");
const express = require("express");
const bodyParser = require("body-parser");

const hostname = "127.0.0.1";
const webhookPort = 3001; // if you are using ngrok then run it on this port

// this class is for creating express server that listen to the webhooks, in this example we are listening to the  submit-url-webhook webhooks
// you can change it, or change how to handle the response.
// you can easily access the response data by using or pre-built classes thats imported above
const app = express();

// Middleware
app.use(bodyParser.json());

//  COMPLETED webhook
app.post("/submit-url-webhook/completed", (req, res) => {
  console.log("[Webhook Server]: COMPLETED status received");
  try {
    const completed = new CompletedWebhookModel(req.body);
    console.log("Deserialized into CompletedWebhook:", completed);
  } catch (err) {
    console.error("[Webhook Server ERROR - completed]:", err.message);
  }
  res.status(200).send("Completed webhook received");
});

//  ERROR webhook
app.post("/submit-url-webhook/error", (req, res) => {
  console.log("[Webhook Server]: ERROR status received");
  try {
    const errorData = new ErrorWebhookModel(req.body);
    console.log("Deserialized into ErrorWebhook:", errorData);
  } catch (err) {
    console.error("[Webhook Server ERROR - error]:", err.message);
  }
  res.status(200).send("Error webhook received");
});

//  INDEXED webhook
app.post("/submit-url-webhook/indexed", (req, res) => {
  console.log("[Webhook Server]: INDEXED status received");
  try {
    const indexed = new IndexedWebhookModel(req.body);
    console.log("Deserialized into IndexedWebhook:", indexed);
  } catch (err) {
    console.error("[Webhook Server ERROR - indexed]:", err.message);
  }
  res.status(200).send("Indexed webhook received");
});

//  CREDITS CHECKED webhook
app.post("/submit-url-webhook/creditsChecked", (req, res) => {
  console.log("[Webhook Server]: CREDITS CHECKED status received");
  try {
    const creditsChecked = new CreditsCheckedWebhookModel(req.body);
    console.log("Deserialized into CreditsCheckedWebhook:", creditsChecked);
  } catch (err) {
    console.error("[Webhook Server ERROR - creditsChecked]:", err.message);
  }
  res.status(200).send("Credits Checked webhook received");
});

//  NEW RESULTS webhook
app.post("/submit-url-webhook/new-results", (req, res) => {
  console.log("[Webhook Server]: CREDITS CHECKED status received");
  try {
    const newResults = new NewResultWebhookModel(req.body);
    console.log("Deserialized into NewResultWebhookModel:", newResults);
  } catch (err) {
    console.error(
      "[Webhook Server ERROR - NewResultWebhookModel]:",
      err.message
    );
  }
  res.status(200).send("Credits Checked webhook received");
});

app.listen(webhookPort, () => {
  console.log(`[Webhook Server] listening on port ${webhookPort}`);
});
