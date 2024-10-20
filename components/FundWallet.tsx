// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Elements } from '@stripe/react-stripe-js';


// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import Payment from '../Components/Payment';

// // Public Key
// // const stripePromise = loadStripe('pk_test_51NpbUBHJaZP62m3KKuApJPp7c67kL8vOpxwCr4ZDVxgDE1c01CpnNqSNbURSEzKnyGTOEtVLOV38NOq3pRDY29Px00WnKFvNsV');

// const FundWallet = () => {
//     const { amount } = useParams();
//     const [clientSecret, setClientSecret] = useState(null);

//     useEffect(() => {
//         const fetchClientSecret = async () => {
//             try {
//                 const storedClientSecret = await AsyncStorage.getItem('client_secret');
//                 if (storedClientSecret) {
//                     setClientSecret(storedClientSecret);
//                 } else {
//                     // Fetch client secret from your backend
//                     const response = await fetch('/api/create-payment-intent', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({ amount: amount }),
//                     });

//                     const data = await response.json();
//                     setClientSecret(data.client_secret);
//                     await AsyncStorage.setItem('client_secret', data.client_secret);
//                 }
//             } catch (error) {
//                 console.error('Error fetching client secret:', error);
//             }
//         };

//         fetchClientSecret();
//     }, [amount]);

//     const appearance = {
//         theme: 'stripe',
//     };

//     const options = {
//         clientSecret,
//         appearance,
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Fund ${Math.ceil(amount)} into your wallet</Text>
//             <Elements stripe={stripePromise} options={options}>
//                 {clientSecret ? (
//                     <PaymentCheckout />
//                 ) : (
//                     <Text style={styles.error}>Something went wrong</Text>
//                 )}
//             </Elements>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 24,
//         marginBottom: 20,
//     },
//     error: {
//         color: 'red',
//     },
// });

// export default FundWallet;