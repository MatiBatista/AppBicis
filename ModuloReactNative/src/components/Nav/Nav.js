import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Switch, Pressable } from "react-native";
import Logo from "../../../assets/Recurso3.png"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo1 from "../../../assets/imageUTN.png"





function Nav({navigation, user}) {


    const onSignOutPresed = () => {
        clearAllData();
        navigation.navigate('Login');
    };

    const clearAllData = () => {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys));
    };

    return (
        <View style={styles.barra}>
            <Image source={Logo1} style={styles.logo1} />
            <Text style={{ color: 'white', alignContent: 'flex-start', alignSelf: 'center', fontSize: 18 }}>Bienvenido: {user}</Text>
            <Pressable style={{ backgroundColor: '#3871F3', alignContent: 'center', width: '20%', padding: 10, marginVertical: 10, borderRadius: 5 }} onPress={onSignOutPresed}>
                <Text style={{ textAlign: "center", color: 'white' }}>Cerrar Sesion</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    logo1: {
        marginTop: 5,
        width: '100%',
        height:'100%',
        maxWidth: 75,
        maxHeight: 75,
        justifyContent: "center"
    },
    barra:{
        flexDirection: "row",
        marginTop: 45,
        backgroundColor: 'black',
        justifyContent: 'space-between',
        padding: 4
    }
})

export default Nav;