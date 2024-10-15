import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from '../../FirebaseConfig'; // Import your Firebase DB
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';

interface Game {
    id: string;
    name: string;
    minPlayers: number;
    maxPlayers: number;
    howToPlay: string;
}





const Games = () => {
    const [games, setGames] = useState<Game[]>([]);



    const fetchGames = async () => {
        const gamesCollection = collection(FIREBASE_DB, "games");
        try {
            const querySnapshot = await getDocs(gamesCollection);
            const games: Game[] = [];
            querySnapshot.forEach((doc) => {
                const gameData = doc.data() as Game;
                games.push(gameData);
            });
            console.log("Fetched games:", games); // Or use these games in your UI
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };
    useEffect(() => {
        fetchGames();
    }, []);
    fetchGames();


    return (


        <View style={{ flex: 1 }}>
            {games.map((game: Game, index: number) => (
                <View key={index} style={{ marginBottom: 15 }}>  {/* Added margin for spacing */}
                    
                    <View style={{ padding: 15 }}>
                        <Text>{game.name}</Text>
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
}

export default Games;