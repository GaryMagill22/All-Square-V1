import { useStripe } from '@stripe/stripe-react-native';
import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

const Payment = () => {
    const stripe = useStripe();
    const [ name, setName ] = useState('');
    return (
        <View>
            <TextInput 
            value={name} 
            onChangeText={text => setName(text)} 
            placeholder="Name"
            />
            <Text>Payment</Text>
        </View>
    )
}

export default Payment;