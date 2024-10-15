import { View, Text } from 'react-native'
import React from 'react'
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { FIREBASE_DB } from '../../FirebaseConfig'; // Import your Firebase DB


const games = () => {

    

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
        <View>
            <Text>games</Text>
        </View>
    )
}

export default games