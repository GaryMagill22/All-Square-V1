import React from 'react';
import { View, Text } from 'react-native';

interface GamesListProps {
    title: string;
    subtitle?: string; // Optional subtitle
}

const GamesList: React.FC<GamesListProps> = ({ title, subtitle }) => {
    return (
        <View style={{ padding: 15, backgroundColor: '#f5f5f5' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
            {subtitle && <Text>{subtitle}</Text>}
        </View>
    );
};

export default GamesList;