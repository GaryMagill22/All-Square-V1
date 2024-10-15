import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible'; // Import for accordion (if you're using it)
import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';
import { FIREBASE_DB } from '@/FirebaseConfig'; // Import your Firebase configuration

interface Game {
    id: string;
    name: string;
    minPlayers: number;
    maxPlayers: number;
    howToPlay: string;
}

const Page: React.FC<{}> = () => {
    const [games, setGames] = useState<Game[]>([]); // State to store fetched games
    const [activeGame, setActiveGame] = useState<string | null>(null); // State for active game (if you're using Collapsible)

    const handleGameClick = (gameId: string) => {
        setActiveGame(gameId === activeGame ? null : gameId);
    };

    const fetchGames = async () => {
        const db = getFirestore(); // Get Firestore instance
        const gamesCollection = collection(db, "games"); // Reference the "games" collection
        try {
            const querySnapshot = await getDocs(gamesCollection);
            const gamesData: Game[] = []; // Initialize an empty array
            querySnapshot.forEach((doc) => {
                const gameData = doc.data() as Game;
                gamesData.push(gameData);
            });
            setGames(gamesData); // Update state with fetched games
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    useEffect(() => {
        fetchGames(); // Fetch games on component mount
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {games.map((game: Game, i: number) => ( // Use index for key
                <View key={i} style={{ marginBottom: 15 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#f5f5f5', padding: 15 }}
                        onPress={() => handleGameClick(game.id)} // Pass game ID for state update
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{game.name}</Text>
                    </TouchableOpacity>
                    {/* Conditionally render additional info using activeGame state (if applicable) */}
                    {activeGame === game.id && ( // Check if game is active (optional)
                        <View style={{ padding: 15 }}>
                            <Text>Min Players: {game.minPlayers}</Text>
                            <Text>Max Players: {game.maxPlayers}</Text>
                            <Text>How to Play: {game.howToPlay}</Text>
                        </View>
                    )}
                </View>
            ))}
            {/* Replace with your desired navigation solution (e.g., React Navigation) */}
            {/* <Link to="/home" className="btn btn-outline-primary btn-sm m-2">
    Home
    </Link> */}
        </View>
    );
};

export default Page;