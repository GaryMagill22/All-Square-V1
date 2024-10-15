import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from '../../FirebaseConfig'; // Import your Firebase DB


interface Game {
    id: string;
    name: string;
    minPlayers: number;
    maxPlayers: number;
    howToPlay: string;
}

const Games = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [expandedGameId, setExpandedGameId] = useState<string | null>(null); // Track expanded game ID

    const fetchGames = async () => {
        const gamesCollection = collection(FIREBASE_DB, "games");
        try {
            const querySnapshot = await getDocs(gamesCollection);
            const games: Game[] = [];
            querySnapshot.forEach((doc) => {
                const gameData = doc.data() as Game;
                games.push(gameData);
            });
            // console.log("Fetched games:", games); // Or use these games in your UI
            setGames(games);
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const handleGamePress = (gameId: string) => {
        setExpandedGameId((prevExpandedGameId) => {
            if (prevExpandedGameId === gameId) {
                return null; // Collapse the game if it's already expanded
            } else {
                return gameId; // Expand the clicked game
            }
        });
    };

    const renderItem = ({ item }: { item: Game }) => (
        <View key={item.id} style={styles.container} >
            <TouchableOpacity onPress={() => handleGamePress(item.id)}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
            {expandedGameId === item.id && ( // Conditionally render additional info
                <View style={{ paddingLeft: 15 }}>
                    <Text>Min Players: {item.minPlayers}</Text>
                    <Text>Max Players: {item.maxPlayers}</Text>
                    <Text>How to Play: {item.howToPlay}</Text>
                </View>
            )}
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={games}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

export default Games;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});