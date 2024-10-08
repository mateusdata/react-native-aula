import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper';

interface FormatUser {
    name: string
    phone: string
}
export default function ListContacts({ navigation }: any) {
    const [users, setUsers] = useState<FormatUser[]>([]);
    
    useEffect(()=>{
        async function recovereData() {
            try {
                const response:any = await AsyncStorage.getItem("users");

                if(response !== null){
                    setUsers(response)
                }
            } catch (error) {
                
            }
        }

        recovereData()
    },[])

    return (
        <View style={styles.container}>

            <ScrollView>
                {
                    users.map((item, index) => (
                        <View key={index} style={styles.user}>
                            <View >
                                <Image
                                    resizeMode='center' style={styles.image}
                                    source={{ uri: `https://reactnative.dev/docs/assets/p_cat${index == 0 ? 1 : 2}.png` }} />
                            </View>

                            <View>
                                <Text style={styles.titleUser} >{item.name}</Text>
                                <Text>{item.phone}</Text>
                            </View>

                        </View>

                    ))
                }
            </ScrollView>

            <Button
                onPress={() => navigation.navigate("Contacts")}
                mode='contained'
                buttonColor="#407AFF"
                style={styles.button}>
                Adicionar
            </Button>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 0,
        width: "100%",
        padding: 12

    },
    button: {
        fontFamily: "Poppins_600SemiBold",
        borderRadius: 5,
        padding: 5,
        marginTop: 15,
    },
    image: {
        height: 70,
        width: 70
    },
    user: {
        backgroundColor: '#fff',
        borderWidth: 0,
        flexDirection: "row",
        alignItems: "center",
        gap: 2
    },
    titleUser: {
        fontWeight: "700"
    }
});
