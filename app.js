import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

const App = () => {


    return (

        <View style={styles.container}>
            <StripeProvider publishableKey="pk_test_51NpbUBHJaZP62m3KKuApJPp7c67kL8vOpxwCr4ZDVxgDE1c01CpnNqSNbURSEzKnyGTOEtVLOV38NOq3pRDY29Px00WnKFvNsV" >
                <Payment />
            </StripeProvider>
            <StatusBar style="auto" />
        </View>
    )
}

export default App;

const styles = Stylesheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});