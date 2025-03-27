const logger = (type, message) => {
    const colors = {
        success: '\x1b[32m', // Green
        info: '\x1b[34m', // Blue
        warning: '\x1b[33m', // Yellow
        error: '\x1b[31m' // Red
    };

    console.log(`${colors[type]}${type}: ${message}\x1b[0m`);
}

export default logger