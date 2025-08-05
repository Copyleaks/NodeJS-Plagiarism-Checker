"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeprecationService = void 0;
class DeprecationService {
    static showDeprecationMessage() {
        // Trace equivalent - using console for logging
        console.warn("DEPRECATION NOTICE: AI Code Detection will be discontinued on August 29, 2025. Please remove AI code detection integrations before the sunset date.");
        // Red colored console output
        console.log('\x1b[31m%s\x1b[0m', '════════════════════════════════════════════════════════════════════');
        console.log('\x1b[31m%s\x1b[0m', 'DEPRECATION NOTICE !!!');
        console.log('\x1b[31m%s\x1b[0m', 'AI Code Detection will be discontinued on August 29, 2025.');
        console.log('\x1b[31m%s\x1b[0m', 'Please remove AI code detection integrations before the sunset date.');
        console.log('\x1b[31m%s\x1b[0m', '════════════════════════════════════════════════════════════════════');
    }
}
exports.DeprecationService = DeprecationService;
