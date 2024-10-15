
import { StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { useNavigation } from 'expo-router';
import React from 'react';


export default function Home() {

  const navigation = useNavigation();




  const navigateToGames = () => {
    navigation.navigate('games' as never);
  };




  return (

    <View style={styles.mainContainer}>
      <TouchableOpacity style={defaultStyles.iosButton} onPress={navigateToGames}>
        <Text style={defaultStyles.iosButtonText}>Games</Text>
      </TouchableOpacity>

      <TouchableOpacity style={defaultStyles.iosButton}>
        <Text style={defaultStyles.iosButtonText}>Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={defaultStyles.iosButton}>
        <Text style={defaultStyles.iosButtonText}>Create Lobby</Text>
      </TouchableOpacity>

      <TouchableOpacity style={defaultStyles.iosButton}>
        <Text style={defaultStyles.iosButtonText}>Join Game</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
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
