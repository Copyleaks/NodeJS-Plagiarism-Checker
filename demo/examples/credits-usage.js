const { logSuccess, logError } = require('../utils/logger');

function TEST_CreditsBalance(copyleaks, loginResult) {
  copyleaks.getCreditsBalanceAsync(loginResult).then(
    (res) => logSuccess("getCreditsBalanceAsync", res),
    (err) => logError("getCreditsBalanceAsync", err)
  );
}

function TEST_UsageHistory(copyleaks, loginResult) {
  copyleaks
    .getUsagesHistoryCsvAsync(loginResult, "01-01-2020", "02-02-2020")
    .then(
      (res) => logSuccess("getUsagesHistoryCsvAsync", res),
      (err) => logError("getUsagesHistoryCsvAsync", err)
    );
}

module.exports = { TEST_CreditsBalance, TEST_UsageHistory };