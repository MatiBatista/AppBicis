import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, Switch, Pressable } from "react-native";
import CustomInput from '../../components/CustomInput/CustonInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import Logo from "../../../assets/Recurso3.png"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "react-native-web";
import Nav from "../../components/Nav/Nav";




const Notification = ({navigation}) => {

    const [user, setUser] = useState('')


    const onSignOutPresed = () => {
        clearAllData()
        navigation.navigate('Login')
    }

    useEffect ( function () {
        getUser()
        getToken()
    },[])

    const getUser = async () => {
        // Function to get the value from AsyncStorage
        const key_user = await AsyncStorage.getItem('user')
        console.log('usuario: ',key_user)
        await setUser(key_user)
      }

      const getToken = async () => {
        // Function to get the value from AsyncStorage
        const key_token = await AsyncStorage.getItem('token')
        console.log('token: ',key_token)
      }

    const registros = [
        {
          id: "1",
          fecha: "10/05/2023",
          description: "El dia de mañana no habra actividades",
        },
        {
          id: "2",
          fecha: "07/05/2023",
          description: "Recordar que tenes tiempo de retirar hasta las 22:30hs",
        },
        {
          id: "3",
          fecha: "21/04/2023",
          description: "Mensaje de Prueba",
        }]
        
    return(
        <>
            <Nav user={user} navigation={navigation} />
            <View style={styles.container}>
                <Text style={{fontSize: 20, alignSelf: "flex-start"}}>Notificaciones</Text>
                {registros.map((registro) => {
                    return (
                    <View key={registro.id}>
                        <Text style={styles.item}>{registro.fecha}  -  {registro.description}</Text>
                    </View>
                    );
                })}
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'flex-start',
        alignContent: 'center'
    },
    logo: {
        marginTop: 50,
        width: '100%',
        height:'100%',
        maxWidth: 150,
        maxHeight: 100
    },
    out: {
        width: '50%',
        marginLeft: 100,
        marginRight: 30,
        marginBottom: 20,
        alignItems: 'center',

    },
    text: {
        marginTop: 15,
        fontSize: 20
    }
})

export default Notification;