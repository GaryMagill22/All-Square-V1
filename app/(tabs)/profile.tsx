// import { StyleSheet, TextInput, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import ProfileCard from '@/components/ProfileCard';
import { useState } from 'react';
// import { Avatar, Card, Button } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
// import { StripeProvider } from '@stripe/stripe-react-native';
// import { StatusBar } from 'expo-status-bar';
// import Payment from '@/components/Payment';



const ProfileScreen = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [handicap, setHandicap] = useState('');



  const user = getAuth().currentUser;



  return (
    <View>
        <ProfileCard user={user} />
    </View>
  );
};


export default ProfileScreen;
