import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible'; // Import for accordion
import { FIREBASE_DB } from '../FirebaseConfig'; // Import your Firebase DB
import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';


interface Game {
    id: string;
    name: string;
    howToPlay: string;
}


const GameAccordion: React.FC<{ games: Game[] }> = ({ games }) => {

    const [activeGame, setActiveGame] = useState(null); // State for active game

    // interface GameAccordionProps {
    //     games: Game[];
    // }

    // const handleGameClick = (gameId: string) => {
    //     setActiveGame(gameId === activeGame ? null : gameId);
    // };



    const fetchGames = async () => {
        const gamesCollection = collection(FIREBASE_DB, "games");
        try {
            const querySnapshot = await getDocs(gamesCollection);
            const games: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                const gameData = doc.data();
                games.push(gameData);
            });
            console.log("Fetched games:", games); // Or use these games in your UI
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    fetchGames();



    return (


        <View style={{ flex: 1 }}>
            {games.map((game: Game, i: React.Key | null | undefined) => (
                <View key={i} style={{ marginBottom: 15 }}>  {/* Added margin for spacing */}
                    <TouchableOpacity
                        style={{ backgroundColor: '#f5f5f5', padding: 15 }}
                    // onPress={() => handleGameClick(game.id)}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{game.name}</Text>
                    </TouchableOpacity>
                    <View style={{ padding: 15 }}>
                        <Text>{game.howToPlay}</Text>
                    </View>
                </View>
            ))}
            {/* Replace with your desired navigation solution (e.g., React Navigation) */}
            {/* <Link to="/home" className="btn btn-outline-primary btn-sm m-2">
    Home
    </Link> */}
        </View>
    );
};

export default GameAccordion;
