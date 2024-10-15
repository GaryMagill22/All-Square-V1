import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FIREBASE_DB } from '@/FirebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import Games from './index'
import GameAccordian from '@/components/GameAccordian'



const _layout = () => {

    return (


        <View style={{ flex: 1 }}>
            <GameAccordian />
        </View>
    );

};

export default _layout