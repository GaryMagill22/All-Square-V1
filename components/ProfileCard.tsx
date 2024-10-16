import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleProp, ViewProps, ViewStyle, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { getAuth, updateProfile } from 'firebase/auth';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import CardTitle from 'react-native-paper/lib/typescript/components/Card/CardTitle';
import { User } from 'firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                <Text style={styles.profileText}>{currentUser?.email || 'Unknown Email'}</Text>
                <Text style={styles.profileText}>Handicap: {handicap}</Text>
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
                                onChangeText={(text) => setHandicap(Number(text))}
                                // placeholder="Enter Handicap"
                                keyboardType="numeric"
                            />
                        </ScrollView>
                    ) : (
                        <View >
                            <View style={styles.walletContainer}>
                                <Text style={styles.title}>Wallet Balance: </Text>
                                <Text style={styles.balance}>$356.76</Text>
                            </View>
                            <View style={styles.fundContainer} >
                                <Button style={styles.button} mode="elevated" >Deposit Funds</Button>
                                <Button style={styles.button} mode="elevated" >Withdraw Funds</Button>
                            </View>
                        </View>
                    )}
                </Card.Content>
                <Card.Actions style={styles.actionContainer}>
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
        borderRadius: 15,
        padding: 10,
    },
    AvatarImage: {
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    cardContent: {
        alignItems: 'center',
        height: 200,
    },
    profileText: {
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 10,
    },
    scrollView: {
        maxHeight: 1000,
        width: 200,
    },
    walletContainer: {
        flexDirection: 'column',
        gap: 10,
        marginBottom: 10,
        backgroundColor: '#B8B3BA',
        borderRadius: 15,
        padding: 10,
        height: 'auto',
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        fontStyle: 'normal',
    },
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    fundContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    button: {
        backgroundColor: '#EEE9F0',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    balance: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    }
});