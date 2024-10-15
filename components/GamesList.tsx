import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GamesListProps {
    title: string;
    subtitle?: string; // Optional subtitle
}

const GamesList: React.FC<GamesListProps> = ({ title, subtitle }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text>{subtitle}</Text>}
        </View>
    );
};

export default GamesList;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        margin: 15,
        backgroundColor: '#0E7AFE',
        borderRadius: 15,

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    
});