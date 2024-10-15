import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GamesList from './GamesList'; // Import your custom component
import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';
import { FIREBASE_DB } from '@/FirebaseConfig'; // Import your Firebase configuration
import { defaultStyles } from '@/constants/Styles';


interface Game {
    id: string;
    name: string;
    minPlayers: number;
    maxPlayers: number;
    howToPlay: string;
}

const GameAccordian: React.FC<{}> = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [expandedGames, setExpandedGames] = useState<string[]>([]); // Track expanded game IDs

    const handleGameClick = (gameId: string) => {
        setExpandedGames((prevExpanded) =>
            prevExpanded.includes(gameId)
                ? prevExpanded.filter((id) => id !== gameId) // Remove if already expanded
                : [...prevExpanded, gameId] // Add if not expanded
        );
    };

    const fetchGames = async () => {
        const gamesCollection = collection(FIREBASE_DB, "games");
        try {
            const querySnapshot = await getDocs(gamesCollection);
            const gamesData: Game[] = [];
            querySnapshot.forEach((doc) => {
                const gameData = doc.data() as Game;
                gamesData.push(gameData);
            });
            setGames(gamesData);
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <View >
            {games.map((game: Game) => (
                <TouchableOpacity key={game.name} onPress={() => handleGameClick(game.name)}>
                    <GamesList title={game.name} />
                    {expandedGames.includes(game.name) && ( // Conditionally render details
                        <View style={{ padding: 15 }}>
                            <Text >Min Players: {game.minPlayers}</Text>
                            <Text>Max Players: {game.maxPlayers}</Text>
                            <Text>How to Play: {game.howToPlay}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default GameAccordian;