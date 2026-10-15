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

// Receives the webhooks of the URL submission example and parses them with the SDK models.
const app = express();

app.use(bodyParser.json());

app.post("/submit-url-webhook/completed", (req, res) => {
  console.log("[Webhook Server]: COMPLETED status received");
  try {
    const completed = new CompletedWebhookModel(req.body);
    console.log("Deserialized into CompletedWebhook:", completed);

    // getAIDetectionResult() throws on malformed JSON; this try/catch still lets the webhook be acknowledged.
    if (completed.getAIDetectionAlert()) {
      try {
        const aiResult = completed.getAIDetectionResult();
        console.log("AI text detection result:", JSON.stringify(aiResult, null, 2));
      } catch (err) {
        console.error("[Webhook Server] could not decode the AI alert:", err.message);
      }
    }

    res.status(200).send(`Completed webhook received ${JSON.stringify(completed, null, 2)}`);
  } catch (err) {
    console.error(`[Webhook Server ERROR - completed]:`, err.message);
  }
});

app.post("/submit-url-webhook/error", (req, res) => {
  console.log("[Webhook Server]: ERROR status received");
  try {
    const errorData = new ErrorWebhookModel(req.body);
    console.log("Deserialized into ErrorWebhook:", errorData);
    res.status(200).send(`Error webhook received ${JSON.stringify(errorData, null, 2)}`);
  } catch (err) {
    console.error("[Webhook Server ERROR - error]:", err.message);
  }
});

app.post("/submit-url-webhook/indexed", (req, res) => {
  console.log("[Webhook Server]: INDEXED status received");
  try {
    const indexed = new IndexedWebhookModel(req.body);
    console.log("Deserialized into IndexedWebhook:", indexed);
    res.status(200).send(`Indexed webhook received ${JSON.stringify(indexed, null, 2)}`);
  } catch (err) {
    console.error("[Webhook Server ERROR - indexed]:", err.message);
  }
});

app.post("/submit-url-webhook/creditschecked", (req, res) => {
  console.log("[Webhook Server]: CREDITS CHECKED status received");
  try {
    const creditsChecked = new CreditsCheckedWebhookModel(req.body);
    console.log("Deserialized into CreditsCheckedWebhook:", creditsChecked);
    res.status(200).send(`Credits Checked webhook received ${JSON.stringify(creditsChecked,null,2)}`);
  } catch (err) {
    console.error("[Webhook Server ERROR - creditsChecked]:", err.message);
  }
});

app.post("/submit-url-webhook/new-results", (req, res) => {
  console.log("[Webhook Server]: CREDITS CHECKED status received");
  try {
    const newResults = new NewResultWebhookModel(req.body);
    console.log("Deserialized into NewResultWebhookModel:", newResults);
    res.status(200).send(`Credits Checked webhook received ${JSON.stringify(newResults,null,2)}`);
  } catch (err) {
    console.error(
      "[Webhook Server ERROR - NewResultWebhookModel]:",
      err.message
    );
  }
});

app.listen(webhookPort, () => {
  console.log(`[Webhook Server] listening on port ${webhookPort}`);
});
