const http = require("http");
const { spawn } = require("child_process");
const { Copyleaks } = require("../dist");
const path = require('path');
const base64Img = require("./base64.img");

// Import example functions
const { TEST_MISC } = require('./examples/misc');
const { TEST_CreditsBalance, TEST_UsageHistory } = require('./examples/credits-usage');
const { TEST_submitUrlAsync } = require('./examples/url-submission');
const { TEST_submitFileAsync, TEST_submitOcrFileAsync } = require('./examples/file-submission');
const { TEST_deleteScanAsync, TEST_exportAsync } = require('./examples/delete-export');
const { TEST_submitAIDetectionNaturalLanguage, TEST_submitAiImageDetection } = require('./examples/ai-detection');
const { TEST_submitWritingAssistText, TEST_getCorrectionTypes } = require('./examples/writing-assistant');
const { TEST_submitTextModerationText } = require('./examples/text-moderation');

const hostname = "127.0.0.1";
const port = 3000;

const DEMO_EMAIL = "<EMAIL>"; // change this with your own copyleaks email.
const DEMO_KEY = "<API_KEY>"; // change this with your own copyleaks API key.
const WEBHOOK_URL = "<WEBHOOK_URL>"; //exe https://glacial-refuge-96501.herokuapp.com/10b0z2w1
const copyleaks = new Copyleaks();

let testingInProgress = false;

// Spawn webhook server on startup in order to listen to webhooks
const webhookServerPath = path.join(__dirname, 'webhook-server.js');

// Spawn webhook server on startup in order to listen to webhooks
const webhookServerProcess = spawn("node", [webhookServerPath]);
console.log(`Server is running...`);
console.log(`Press Ctrl+C to shutdown server`);

webhookServerProcess.stdout.on("data", (data) => {
  console.log(`[Webhook Server]: ${data}`);
});

webhookServerProcess.stderr.on("data", (data) => {
  console.error(`[Webhook Server ERROR]: ${data}`);
});

webhookServerProcess.on("close", (code) => {
  console.log(`[Webhook Server] exited with code ${code}`);
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  TEST_copyleaks();

  res.setHeader("Content-Type", "text/plain");
  res.end("started testing - check logs");
});

TEST_copyleaks = () => {
  if (testingInProgress) {
    return;
  }
  testingInProgress = true;

  // Login
  copyleaks.loginAsync(DEMO_EMAIL, DEMO_KEY).then(
    (loginResult) => {
      console.log("----------SUCCESS----------");
      console.log("loginAsync");
      if (loginResult) {
        console.log("result:");
        console.log(loginResult);
      }
      console.log("-------------------------");

      // Uncomment the functions you want to test:
      
      // TEST_MISC(copyleaks);
      // TEST_CreditsBalance(copyleaks, loginResult);
      // TEST_UsageHistory(copyleaks, loginResult);
      // TEST_submitUrlAsync(copyleaks, loginResult, WEBHOOK_URL);
      // TEST_submitFileAsync(copyleaks, loginResult, WEBHOOK_URL);
      // TEST_submitOcrFileAsync(copyleaks, loginResult, WEBHOOK_URL, base64Img);
      // TEST_deleteScanAsync(copyleaks, ["1653575562405", "1653575774429"], loginResult, WEBHOOK_URL);
      // TEST_exportAsync(copyleaks, loginResult, WEBHOOK_URL);
      // TEST_submitAIDetectionNaturalLanguage(copyleaks, loginResult);
      // TEST_submitWritingAssistText(copyleaks, loginResult);
      // TEST_getCorrectionTypes(copyleaks, loginResult);
      // TEST_submitTextModerationText(copyleaks, loginResult);
      
      TEST_submitAiImageDetection(copyleaks, loginResult, base64Img);
      
    },
    err => {
      console.error("----------ERROR----------");
      console.error("loginAsync:");
      console.error("Error Message:", err.message || err);
      
      // Enhanced error details
      if (err.response) {
        console.error("Response Status:", err.response.status);
        console.error("Response Status Text:", err.response.statusText);
        console.error("Response Data:", JSON.stringify(err.response.data, null, 2));
        console.error("Response Headers:", JSON.stringify(err.response.headers, null, 2));
      } else if (err.request) {
        console.error("Request made but no response received:");
        console.error("Request:", err.request);
      } else {
        console.error("Error setting up request:");
        console.error("Full Error Object:", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
      }
      
      if (err.code) {
        console.error("Error Code:", err.code);
      }
      if (err.config) {
        console.error("Request Config URL:", err.config.url);
        console.error("Request Config Method:", err.config.method);
        console.error("Request Config Headers:", JSON.stringify(err.config.headers, null, 2));
      }
      console.error("-------------------------");
    }
  );
};

server.listen(port, hostname, () => {
  console.log(`please visit http://${hostname}:${port}/ to start the test`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Received SIGINT. Graceful shutdown...');
  webhookServerProcess.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Graceful shutdown...');
  webhookServerProcess.kill();
  process.exit(0);
});