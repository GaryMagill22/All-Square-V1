import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FIREBASE_DB } from '@/FirebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import Games from '.'



const _layout = () => {
    
    return (


        <View style={{ flex: 1 }}>
        <Games/>
        </View>
    );
    
};
    
    export default _layout