const yellow = '\x1b[33m';
const red = '\x1b[31m';
const reset = '\x1b[0m';

// Get package info
const pkg = require('../package.json');

console.log(`
${yellow}================================================================${reset}
${red}⚠️  IMPORTANT NOTICE: ${pkg.name} v${pkg.version}${reset}
${yellow}================================================================${reset}
${yellow}AI Code Detection will be discontinued on August 29, 2025.${reset}
${yellow}Please remove AI code detection integrations before the sunset date.${reset}
${yellow}================================================================${reset}
`);
