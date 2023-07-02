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
import {openModal} from "../modal/modal";
import QRCode from "react-native-qrcode-svg";





const VisualizarSoporteBici = ({ route, navigation }) => {
    const { variable } = route.params;
    const [key_token, setKey_token] = useState('')
    const [user, setUser] = useState('')
    const getToken = async () => {
        // Function to get the value from AsyncStorage
        const keytoken = await AsyncStorage.getItem('token')
        console.log('token: ',keytoken)
        await setKey_token(keytoken)
        }

    useEffect(() => {
      getUser()
      getToken();
    }, []);
  
    const getUser = async () => {
      // Function to get the value from AsyncStorage
      const key_user = await AsyncStorage.getItem('user')
      console.log('usuario: ',key_user)
      await setUser(key_user)
    }

    const QRCodeGenerator = ({ data }) => {
      return (
        <View>
          <QRCode value={data} size={200} />
        </View>
      );
    };
    

    const CustomButton = ({ text, onPress }) => {
        return (
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
          </Pressable>
        );
      };


  
    return (
      <>
        <Nav user={user} navigation={navigation} />
        <View style={styles.container}>
          <Text>{variable}</Text>
          <QRCodeGenerator data={variable}/>
        </View>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width:"100%",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      width:"100%",
      marginBottom: 10,
      marginTop: 10,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: '#CCCCCC',
      alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
      },
      });

export default VisualizarSoporteBici;