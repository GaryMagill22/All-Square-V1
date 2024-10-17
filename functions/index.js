const functions = require("firebase-functions");

exports.myFunction = functions.https.onRequest((req, res) => {
  res.json({message: "Hello from a serverless application!"});
});

