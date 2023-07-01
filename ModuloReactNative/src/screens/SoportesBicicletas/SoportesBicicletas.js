import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, Switch, Pressable,TouchableHighlight } from "react-native";
import CustomInput from '../../components/CustomInput/CustonInput';
import Logo from "../../../assets/Recurso3.png"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "react-native-web";
import Logo1 from "../../../assets/imageUTN.png"
import Nav from "../../components/Nav/Nav";
import { Redirect, Route, Routes, NativeRouter,  useNavigate  } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { BASE_URL } from '../../url.js'






const SoportesBicicletas = ({navigation}) => {

    const [user, setUser] = useState('')
    const [key_token, setKey_token] = useState('')
    const [startDateTime, setStartDateTime] = useState('')
    const [soporte, setSoporte] = useState('')
    const URI = `http://${BASE_URL}:8081/user/record/`

    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [timerDuration, setTimerDuration] = useState(90000);
    const [resetTimer, setResetTimer] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);

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
    const keytoken = await AsyncStorage.getItem('token')
    console.log('token: ',keytoken)
    await setKey_token(keytoken)
    }

    const CustomButton = ({ text, onPress }) => {
        return (
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
          </Pressable>
        );
      };
    
    const redirigirAltaSoporteBicicleta = () => {
        navigation.navigate("AltaSoporteBici");
      };

    return (
        <>
        <Nav user={user} navigation={navigation} />
        <View style={styles.container}>
            <CustomButton text="ALTA" onPress={redirigirAltaSoporteBicicleta} />
        </View>
        </>
      );
    };
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'left',
          alignItems: 'left',
          paddingHorizontal: '5%',
        },
        button: {
          textAlign: 'center',
          backgroundColor: '#000000',
          width: '30%',
          height: '10%',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
          marginTop: 10,
          
        },
        buttonText: {
          color: '#FFFFFF',
          fontSize: '4vw',
        },
      });

export default SoportesBicicletas;