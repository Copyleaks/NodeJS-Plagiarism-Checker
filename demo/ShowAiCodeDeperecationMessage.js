function ShowAiCodeDeperecationMessage() {
  const showNoticeOnce = (function () {
    let hasShown = false;

    return function () {
      // Only show once per process
      if (hasShown) return;
      hasShown = true;

      // Don't show if CI environment or non-interactive terminal
      if (process.env.CI || process.env.CONTINUOUS_INTEGRATION || !process.stdout.isTTY) {
        return;
      }

      const yellow = '\x1b[33m';
      const red = '\x1b[31m';
      const reset = '\x1b[0m';

      // Using console.warn so it goes to stderr and doesn't interfere with stdout
      console.warn(`${yellow}
⚠️  NOTICE: AI Code Detection will be discontinued on August 29, 2025.
    Please remove AI code detection integrations before the sunset date.${reset}`);
    };
  })();

  // Show notice on import
  showNoticeOnce();
}
module.exports = { ShowAiCodeDeperecationMessage };