import { StyleSheet, TextInput, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import  ProfileCard from '@/components/ProfileCard';
import { useState } from 'react';
import { Avatar, Card, Button } from 'react-native-paper';
import { getAuth } from 'firebase/auth';



const ProfileScreen = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [handicap, setHandicap] = useState('');



  const user = getAuth().currentUser;

  

    return (  
      <ProfileCard user={user}  />
    );
  };
  

export default ProfileScreen;
