const express = require("express");
const router = express.Router();
const axios = require("axios");
const CircuitBreaker = require("../utils/CircuitBreaker");
const logger = require("../utils/logger");

// Wrap the API call
const executeCode = async (config) => {
    return await axios(config);
};

const breaker = new CircuitBreaker(executeCode, { failureThreshold: 3, resetTimeout: 10000 });

router.post("/", async (req, res) => {
    const { code, language, input } = req.body;


    // Map common language names to JDoodle versions
    const languageMap = {
        'javascript': 'nodejs',
        'typescript': 'typescript',
        'python': 'python3',
        'c++': 'cpp',
        'c': 'c',
        'java': 'java',
        'go': 'go',
        'rust': 'rust',
        'bash': 'bash'
    };

    const targetLanguage = languageMap[language] || language;

    if (!process.env.jDoodle_clientId || !process.env.jDoodle_clientSecret) {
        logger.error('Missing JDoodle credentials in environment');
        return res.status(500).json({ error: "Server misconfiguration: Missing compiler credentials" });
    }

    const program = {
        script: code,
        language: targetLanguage,
        versionIndex: "0",
        clientId: process.env.jDoodle_clientId,
        clientSecret: process.env.jDoodle_clientSecret,
        stdin: input
    };

    const config = {
        method: "post",
        url: "https://api.jdoodle.com/v1/execute",
        headers: { "Content-Type": "application/json" },
        data: program,
    };

    try {
        const response = await breaker.fire(config);
        res.json({ run: response.data });
    } catch (error) {
        logger.error('Error executing code: %s', error.message);
        if (error.message === "Service Unavailable (Circuit Open)") {
            return res.status(503).json({ error: "Service busy, please try again later." });
        }
        if (error.response && error.response.status === 429) {
            return res.status(429).json({ error: "Daily compilation limit exceeded. Please try again tomorrow." });
        }
        res.status(500).json({ error: "Failed to execute code. Check server logs." });
    }
});

module.exports = router;
