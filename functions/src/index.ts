
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
const {getDatabase} = require("firebase-admin/database");

// Export your Express app as a Firebase Function
exports.api = functions.https.onRequest(app);

// Example function for testing
exports.helloWorld = functions.https.onRequest((req, res) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    res.send("Hello from Firebase!");
});
