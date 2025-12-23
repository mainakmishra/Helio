const nodemailer = require('nodemailer');
const logger = require('./logger');

const sendEmail = async (options) => {
    // Use standardized Gmail service with IPv4 forcing
    // This resolves issues where IPv6 routing fails in cloud environments (Render)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        family: 4, // Force IPv4
        logger: true,
        debug: true,
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 30000
    });

    const message = {
        from: `Helio App <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html
    };

    // Retry Logic
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
        try {
            const info = await transporter.sendMail(message);
            logger.info(`Email sent: ${info.messageId}`);
            return info;
        } catch (error) {
            attempts++;
            logger.error(`Email send attempt ${attempts} failed: ${error.message}`);

            if (attempts >= maxAttempts) {
                // Return valuable feedback instead of just crashing
                logger.error("All email retry attempts failed.");
                throw error;
            }

            // Wait 2 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
};

module.exports = sendEmail;
