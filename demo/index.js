const http = require("http");
const { spawn } = require("child_process");

const {
  Copyleaks,
  CopyleaksConfig,
  CopyleaksURLSubmissionModel,
  CopyleaksFileSubmissionModel,
  CopyleaksFileOcrSubmissionModel,
  CopyleaksDeleteRequestModel,
  CopyleaksExportModel,
  CopyleaksSourceCodeSubmissionModel,
  CopyleaksNaturalLanguageSubmissionModel,
  CopyleaksWritingAssistantSubmissionModel,
} = require("../dist");

const base64Img = require("./base64.img");

const hostname = "127.0.0.1";
const port = 3000;

const DEMO_EMAIL = "<EMAIL>"; // change this with your own copyleaks email.
const DEMO_KEY = "<API_KEY>"; // change this with your own copyleaks API key.
const WEBHOOK_URL = "<WEBHOOK_URL>"; //exe https://glacial-refuge-96501.herokuapp.com/10b0z2w1
const copyleaks = new Copyleaks();

let testingInProgress = false;

// Spawn webhook server on startup in order to listen to webhooks
const webhookServerProcess = spawn("node", ["./webhook-server.js"]);

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
      logSuccess("loginAsync", loginResult);

      // TEST_MISC();
      TEST_submitFileAsync(loginResult);

      // TEST_CreditsBalance(loginResult);

      // TEST_UsageHistory(loginResult);

      // TEST_submitUrlAsync(loginResult);

      // TEST_submitOcrFileAsync(loginResult);

      // TEST_deleteScanAsync(["1653575562405", "1653575774429"],loginResult);

      // TEST_exportAsync(loginResult);

      // TEST_submitAIDetectionNaturalLanguage(loginResult);

      // TEST_submitAIDetectionSourceCode(loginResult);

      // TEST_submitWritingAssistText(loginResult);

      // TEST_getCorrectionTypes(loginResult);
    },
    (err) => logError("loginAsync", err)
  );
};

function TEST_MISC() {
  // OCR Supported Languages
  copyleaks.getOCRSupportedLanguagesAsync().then(
    (loginResult) => {
      logSuccess("getOCRSupportedLanguagesAsync", loginResult);
    },
    (err) => logError("getOCRSupportedLanguagesAsync", err)
  );
  // Supported File Types
  copyleaks.getSupportedFileTypesAsync().then(
    (loginResult) => {
      logSuccess("getSupportedFileTypesAsync", loginResult);
    },
    (err) => logError("getSupportedFileTypesAsync", err)
  );
  // Release Notes
  copyleaks.getReleaseNotesAsync().then(
    (loginResult) => {
      logSuccess("getReleaseNotesAsync", loginResult);
    },
    (err) => logError("getReleaseNotesAsync", err)
  );
}

function TEST_CreditsBalance(loginResult) {
  copyleaks.getCreditsBalanceAsync(loginResult).then(
    (res) => logSuccess("getCreditsBalanceAsync", res),
    (err) => logError("getCreditsBalanceAsync", err)
  );
}

function TEST_UsageHistory(loginResult) {
  copyleaks
    .getUsagesHistoryCsvAsync(loginResult, "01-01-2020", "02-02-2020")
    .then(
      (res) => logSuccess("getUsagesHistoryCsvAsync", res),
      (err) => logError("getUsagesHistoryCsvAsync", err)
    );
}

function TEST_submitUrlAsync(loginResult) {
  var submission = new CopyleaksURLSubmissionModel("https://copyleaks.com", {
    sandbox: true,
    webhooks: {
      status: `${WEBHOOK_URL}/submit-url-webhook/{STATUS}`,
      newResult: `${WEBHOOK_URL}/submit-url-webhook/new-results`,
    },
  });

  copyleaks.submitUrlAsync(loginResult, Date.now() + 1, submission).then(
    (res) => logSuccess("submitUrlAsync", res),
    (err) => {
      logError("submitUrlAsync", err);
    }
  );
}

function TEST_submitFileAsync(loginResult) {
  var submission = new CopyleaksFileSubmissionModel(
    "aGVsbG8gd29ybGQ=",
    "nodejs-sdk-demo.txt",
    {
      sandbox: true,
      webhooks: {
        status: `${WEBHOOK_URL}/submit-file-webhook/{STATUS}`,
      },
    }
  );

  copyleaks.submitFileAsync(loginResult, Date.now() + 1, submission).then(
    (res) => logSuccess("submitFileAsync", res),
    (err) => {
      logError("submitFileAsync", err);
    }
  );
}

function TEST_submitOcrFileAsync(loginResult) {
  var submission = new CopyleaksFileOcrSubmissionModel(
    "en",
    base64Img,
    "nodejs-sdk-demo.txt",
    {
      sandbox: true,
      webhooks: {
        status: `${WEBHOOK_URL}/submit-file-ocr-webhook/{STATUS}`,
      },
    }
  );

  copyleaks.submitFileOcrAsync(loginResult, Date.now() + 1, submission).then(
    (res) => logSuccess("submitFileOcrAsync", res),
    (err) => {
      logError("submitFileOcrAsync", err);
    }
  );
}

function TEST_deleteScanAsync(scansId, loginResult) {
  if (scansId.length) {
    const model = new CopyleaksDeleteRequestModel(
      // add your own scan ids to remove
      scansId.map((id) => ({ id })),
      false,
      `${WEBHOOK_URL}/delete`
    );
    copyleaks.deleteAsync(loginResult, model).then(
      (res) => logSuccess("deleteAsync", res),
      (err) => {
        logError("deleteAsync", err);
      }
    );
  }
}

function TEST_exportAsync(loginResult) {
  var scanId = "1610625417127"; // change this with your own scanId

  const model = new CopyleaksExportModel(
    `${WEBHOOK_URL}/export/scanId/${scanId}/completion`,
    [
      // results
      {
        id: "2a1b402420", // change this with your own result Id
        endpoint: `${WEBHOOK_URL}/export/${scanId}/result/2a1b402420`,
        verb: "POST",
        headers: [
          ["key", "value"],
          ["key2", "value2"],
        ],
      },
    ],
    {
      // crawled version
      endpoint: `${WEBHOOK_URL}/export/${scanId}/crawled-version`,
      verb: "POST",
      headers: [
        ["key", "value"],
        ["key2", "value2"],
      ],
    }
  );

  copyleaks.exportAsync(loginResult, scanId, scanId, model).then(
    (res) => logSuccess("exportAsync", res),
    (err) => {
      logError("exportAsync", err);
    }
  );
}

function TEST_submitAIDetectionNaturalLanguage(loginResult) {
  const sampleText =
    "Lions are social animals, living in groups called prides, typically consisting of several females, their offspring, and a few males. Female lions are the primary hunters, working together to catch prey. Lions are known for their strength, teamwork, and complex social structures.";
  const submission = new CopyleaksNaturalLanguageSubmissionModel(sampleText);
  submission.sandbox = true;

  copyleaks.aiDetectionClient
    .submitNaturalTextAsync(loginResult, Date.now() + 1, submission)
    .then((response) => {
      logSuccess("TEST_submitAIDetectionNaturalLanguage", response);
    })
    .catch((error) => {
      logError("TEST_submitAIDetectionNaturalLanguage", error);
    });
}

function TEST_submitAIDetectionSourceCode(loginResult) {
  const sampleCode = `
  def add(a, b):
      return a + b
  
  def multiply(a, b):
      return a * b
  
  def main():
      x = 5
      y = 10
      sum_result = add(x, y)
      product_result = multiply(x, y)
      print(f'Sum: {sum_result}')
      print(f'Product: {product_result}')
  
  if __name__ == '__main__':
      main()
  `;
  const submission = new CopyleaksSourceCodeSubmissionModel(
    sampleCode,
    "example.py"
  );
  submission.sandbox = true;

  copyleaks.aiDetectionClient
    .submitNaturalTextAsync(loginResult, Date.now() + 1, submission)
    .then((response) => {
      logSuccess("TEST_submitAIDetectionSourceCode", response);
    })
    .catch((error) => {
      logError("TEST_submitAIDetectionSourceCode", error);
    });
}

function TEST_submitWritingAssistText(loginResult) {
  const sampleText =
    "Lions are the only cat that live in groups, called pride. A prides typically consists of a few adult males, several feales, and their offspring. This social structure is essential for hunting and raising young cubs. Female lions, or lionesses are the primary hunters of the prid. They work together in cordinated groups to take down prey usually targeting large herbiores like zbras, wildebeest and buffalo. Their teamwork and strategy during hunts highlight the intelligence and coperation that are key to their survival.";
  const submission = new CopyleaksWritingAssistantSubmissionModel(sampleText);
  submission.sandbox = true;

  copyleaks.writingAssistantClient
    .submitTextAsync(loginResult, Date.now() + 1, submission)
    .then((response) => {
      logSuccess("TEST_submitWritingAssistText", response);
    })
    .catch((error) => {
      logError("TEST_submitWritingAssistText", error);
    });
}

function TEST_getCorrectionTypes(loginResult) {
  copyleaks.writingAssistantClient
    .getCorrectionTypesAsync(loginResult, "en")
    .then((response) => {
      logSuccess("TEST_submitAIDetectionNaturalLanguage", response);
    })
    .catch((error) => {
      logError("TEST_submitAIDetectionNaturalLanguage", error);
    });
}

function logError(title, err) {
  console.error("----------ERROR----------");
  console.error(`${title}:`);
  console.error(err);
  console.error("-------------------------");
}

function logSuccess(title, result) {
  console.log("----------SUCCESS----------");
  console.log(`${title}`);
  if (result) {
    console.log(`result:`);
    console.log(result);
  }
  console.log("-------------------------");
}

server.listen(port, hostname, () => {
  console.log(`please visit http://${hostname}:${port}/ to start the test`);
});
