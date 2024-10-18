const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret);

admin.initializeApp();

exports.createOrGetStripeCustomerWithWallet =
functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be logged in");
  }

  const uid = context.auth.uid;
  const userRef = admin.firestore().collection("users").doc(uid);

  const userDoc = await userRef.get();
  if (userDoc.exists && userDoc.data().stripeCustomerId) {
    return {customerId: userDoc.data().stripeCustomerId};
  }

  const customer = await stripe.customers.create({
    metadata: {firebaseUID: uid},
  });

  await stripe.customers.updateBalance(customer.id, {
    balance: 0,
  });

  await userRef.set({stripeCustomerId: customer.id}, {merge: true});

  return {customerId: customer.id};
});

