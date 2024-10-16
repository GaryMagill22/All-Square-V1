import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleProp, ViewProps, ViewStyle, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { getAuth, updateProfile } from 'firebase/auth';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import CardTitle from 'react-native-paper/lib/typescript/components/Card/CardTitle';
import { User } from 'firebase/auth';

interface ProfileCardProps {
    user?: User | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
    const currentUser = getAuth().currentUser; // Get the logged-in user
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState(currentUser?.displayName || ''); // Initialize username
    const [handicap, setHandicap] = useState(40); // Initialize handicap
    const [isEditing, setIsEditing] = useState(false); // State to track edit mode
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    useEffect(() => {
        const user = getAuth().currentUser;
    }, []);

    const saveProfile = async () => {
        setIsLoading(true);
        try {
            if (currentUser) {
                await updateProfile(currentUser, { displayName: username }); // Update username
            } else {
                console.error('No current user to update');
            }
            console.log('Profile updated successfully!');
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle errors appropriately (e.g., display an error message)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.card}>
            <Card>
                <Avatar.Image style={styles.AvatarImage} size={80} source={require('../assets/images/avatar-circle.png')} />
                <Card.Title title={currentUser?.displayName} titleStyle={styles.cardTitle} />
                <Card.Content style={styles.cardContent}>
                    {isEditing ? (
                        <ScrollView style={styles.scrollView}>
                            <TextInput
                                label="First Name"
                                value={firstName}
                                onChangeText={setFirstName}
                            // placeholder="First Name"
                            />
                            <TextInput
                                label="Last Name"
                                value={lastName}
                                onChangeText={setLastName}
                            // placeholder="Last Name"
                            />
                            <TextInput
                                label="Username"
                                value={username}
                                onChangeText={setUsername}
                            // placeholder="Username"
                            />
                            <TextInput
                                label="Handicap"
                                value={handicap.toString()}
                                onChangeText={setHandicap}
                                // placeholder="Enter Handicap"
                                keyboardType="numeric"
                            />
                        </ScrollView>
                    ) : (
                        <>
                            <Text style={styles.profileText}>{currentUser?.email || 'Unknown Email'}</Text>
                            <Text style={styles.profileText}>Handicap: {handicap}</Text>
                        </>
                    )}
                </Card.Content>
                <Card.Actions>
                    {isEditing ? (
                        <Button mode="outlined" onPress={saveProfile} disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Profile'}
                        </Button>
                    ) : (
                        <Button mode="outlined" onPress={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    )}
                </Card.Actions>
            </Card>
        </View>
    );
};
export default ProfileCard;


const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
    },
    AvatarImage: {
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    cardContent: {
        alignItems: 'center',
    },
    profileText: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 5,
    },
    scrollView: {
        maxHeight: 1000,
        width: 200,
    },
});