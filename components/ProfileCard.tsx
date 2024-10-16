// import { View, Text, Image } from 'react-native'
// import React from 'react'
// import { StyleSheet } from 'react-native'
// import { User } from '@/types'



// interface ProfileCardProps {
//     User: User;
// }

// const ProfileCard: React.FC<ProfileCardProps> = ({ User }) => {

//     return (
//         <View style={styles.card}>
//             <Image source={{ uri: User.avatar }} style={styles.avatar} />
//             <Text style={styles.name}>{User.name}</Text>
//             <Text style={styles.bio}>{User.bio}</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//         elevation: 5,
//         alignItems: 'center',
//     },
//     avatar: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         marginBottom: 10,
//     },
//     name: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     bio: {
//         fontSize: 16,
//         textAlign: 'center',
//     },
// });

// export default ProfileCard;