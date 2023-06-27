import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, Switch, Pressable } from "react-native";
import CustomInput from '../../components/CustomInput/CustonInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import Logo from "../../../assets/Recurso3.png"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "react-native-web";
import Nav from "../../components/Nav/Nav";




const Activity = ({navigation}) => {

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
          sentido: "->  ",
          hora: "07:00",
        },
        {
          id: "2",
          sentido: "<-  ",
          hora: "12:00",
        },
        {
          id: "3",
          sentido: "->  ",
          hora: "14:00",
        }]
        
        const registros1 = [
            {
              id: "1",
              sentido: "->  ",
              hora: "07:00",
              fecha: "09/05/2023"
            },
            {
              id: "2",
              sentido: "<-  ",
              hora: "11:00",
              fecha: "09/05/2023"
            },
            {
              id: "3",
              sentido: "->  ",
              hora: "14:00",
              fecha: "09/05/2023"
            }]

    return(
        <>
            <Nav user={user} navigation={navigation} />
            <View style={styles.container}>
                <Text style={{fontSize: 20, alignSelf: "flex-start"}}>Hoy</Text>
                {registros.map((registro) => {
                    return (
                    <View key={registro.id}>
                        <Text style={styles.item} >{registro.sentido}    {registro.hora}</Text>
                    </View>
                    );
                })}
            </View>
            <View style={styles.container}>
                <Text style={{fontSize: 20, alignSelf: "flex-start"}}>Anterior</Text>
                {registros1.map((registro) => {
                    return (
                    <View key={registro.id}>
                        <Text style={styles.item} >{registro.sentido}    {registro.hora} {registro.fecha}</Text>
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
        alignItems: 'center',
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

export default Activity;