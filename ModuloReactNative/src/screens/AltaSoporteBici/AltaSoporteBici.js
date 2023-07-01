import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, Switch, Pressable,TouchableHighlight } from "react-native";
import Nav from "../../components/Nav/Nav";

const AltaSoporteBici = ({navigation}) => {
    const [user, setUser] = useState('')
    useEffect ( function () {
        getUser()
    },[])

    const getUser = async () => {
        // Function to get the value from AsyncStorage
        const key_user = await AsyncStorage.getItem('user')
        console.log('usuario: ',key_user)
        await setUser(key_user)
      }


    return( 
        <>
        <Nav user={user} navigation={navigation} />
       <View>ALTA SOPORTES BICIS</View>
       </>
    )
};



export default AltaSoporteBici