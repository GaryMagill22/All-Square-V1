import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { defaultStyles } from '../constants/Styles'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFunctions, httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { FirebaseError } from 'firebase/app';







const Page = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;





  interface WalletResult {
    customerId: string;
  }

  const signIn = async (): Promise<void> => {
    setLoading(true);
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        // User successfully signed in
        // Initialize or get the user's wallet
        const functions = getFunctions();
        const createWallet = httpsCallable<unknown, WalletResult>(functions, 'createOrGetStripeCustomerWithWallet');

        try {
          const result: HttpsCallableResult<WalletResult> = await createWallet();
          const customerId = result.data.customerId;

          if (customerId) {
            console.log('Stripe Customer ID:', customerId);

            // Store the customerId using AsyncStorage
            await AsyncStorage.setItem('stripeCustomerId', customerId);

            // Navigate to home screen
            router.replace('/home');
          } else {
            throw new Error('No customer ID returned');
          }
        } catch (walletError) {
          console.error('Error initializing wallet:', walletError);
          // Show error to the user
          Alert.alert(
            'Wallet Initialization Failed',
            'Failed to initialize wallet: ' + ((walletError as Error).message || 'Unknown error')
          );
          // You might want to decide whether to proceed to home screen or stay on login page
          // For now, we'll stay on the login page
        }
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      Alert.alert('Sign In Failed', ((error as FirebaseError).message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  // const signIn = async () => {
  //   setLoading(true)
  //   try {
  //     const user = await signInWithEmailAndPassword(auth, email, password)
  //     if (user) router.replace('/home')
  //   } catch (error: any) {
  //     console.log(error)
  //     alert('Sign in failed: ' + error.message);
  //   }
  //   setLoading(false)
  // }


  const signUp = async () => {
    setLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        // Redirect to profile page for user to complete their profile
        router.replace('/profile');
      }
    } catch (error: any) {
      // ... error handling
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={1}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      )}
      {/* <Image style={styles.logo} source={require('../assets/images/logo-white.png')} /> */}

      <Text style={styles.title}>
        {type === 'login' ? 'Welcome back' : 'Create your account'}
      </Text>

      <View style={{ marginBottom: 20 }}>
        <TextInput
          autoCapitalize='none'
          placeholder='Email'
          style={styles.inputField}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          autoCapitalize='none'
          placeholder='Password'
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {type === 'login' ? (
        <TouchableOpacity onPress={signIn} style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={signUp} style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Create acount</Text>
        </TouchableOpacity>
      )}

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnPrimary: {
    backgroundColor: "#007bff",
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  }
})

export default Page;