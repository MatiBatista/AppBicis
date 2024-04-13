import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, Switch, Pressable,TouchableHighlight, Alert } from "react-native";
import CustomInput from '../../components/CustomInput/CustonInput';
import CustomButton from "../../components/CustomButton/CustomButton";
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
import Moment from 'moment';




const Home = ({navigation}) => {

    const [user, setUser] = useState('')
    const [key_token, setKey_token] = useState('')
    const [startDateTime, setStartDateTime] = useState('')
    const [soporte, setSoporte] = useState('')
    const URI = `${BASE_URL}/user/record/`
 

    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [timerDuration, setTimerDuration] = useState(90000);
    const [resetTimer, setResetTimer] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);

    useEffect ( function () {
            getUser()
            getToken()
            getRecord()
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

    const getRecord = async () => {
        try{
            const key_user = await AsyncStorage.getItem('user')
            const keytoken = await AsyncStorage.getItem('token')
            const results = await axios.get(`${URI}${key_user}`, {headers:{ 'Authorization': `Bearer ${keytoken}` }})
            const data = await results.data
            console.log(data)
            const lastRecord = await data[data.length - 1]
            console.log(lastRecord)
            if(lastRecord.endDateTime == null){
                setStartDateTime(lastRecord.startDateTime)
                setSoporte(lastRecord.soportName)
            } 
        }
        catch (err){
            console.log(err)
        }
    }

    const onScanQR = async () => {
        Alert.alert('Escanear QR del soporte donde esta la bicicleta')
        navigation.navigate('ScanQR')
       
    }



    return(
        <>
            <Nav user={user} navigation={navigation} />
            <View style={styles.container} >
                <Image source={Logo} style={styles.logo}/>
                <Text style={styles.text}>Franja horario bicicletero</Text>
                <View style={styles.DiaHorario} >
                    <Text style={{fontSize: 20, color: 'white'}}>Lunes a Viernes de <Text style={{fontSize: 20, fontStyle: "italic", color: 'white'}}>07:00 a 22:30</Text></Text>
                       
                </View>
            {startDateTime == '' ? <Text></Text> : 
            <>
            {/* <View style={styles.sectionStyle}>
                <Stopwatch
                    laps
                    msecs
                    start={isStopwatchStart}
                    //To start
                    reset={resetStopwatch}
                    //To reset
                    options={options}
                    //options for the styling
                    getTime={(time) => {
                    console.log(time);
                    }}
                />
                <TouchableHighlight
                    onPress={() => {
                    setIsStopwatchStart(!isStopwatchStart);
                    setResetStopwatch(false);
                    }}>
                    <Text style={styles.buttonText}>
                    {!isStopwatchStart ? 'START' : 'STOP'}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                    setIsStopwatchStart(false);
                    setResetStopwatch(true);
                    }}>
                    <Text style={styles.buttonText}>RESET</Text>
                </TouchableHighlight>
                </View> */}
                <Text style={styles.text}>Estacionamiento Activo</Text>
                <View style={styles.DiaHorario2} >    
                    <Text style={styles.text2}>Soporte: {soporte}</Text>
                    <Text style={styles.text2}>Iniciado: {Moment(startDateTime).format('DD/MM/YYYY hh:ss')}</Text>
                </View>
            </>}
            {startDateTime == '' ? <CustomButton text="Iniciar Estacionamiento"  onPress={onScanQR}/> : <CustomButton text="Finalizar Estacionamiento" onPress={onScanQR}/>}
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        alignContent: 'center'
    },
    logo: {
        marginTop: 20,
        width: '100%',
        height:'100%',
        maxWidth: 75,
        maxHeight: 50
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
        fontSize: 20,
    },
    text2: {
        padding: 10,
        fontSize: 20,
        color: 'white'
    },
    DiaHorario: {
        backgroundColor: '#808080' ,
        alignContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: "100%",
        padding: 20,
        marginVertical:15
    },
    DiaHorario2: {
        backgroundColor: '#1C819F' ,
        alignItems: "flex-start",
        borderRadius: 10,
        width: "100%",
        padding: 30,
        marginVertical:15
    },



  /*   sectionStyle: {
        flex: 1,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        fontSize: 20,
        marginTop: 10,
      }, */
})

/* const options = {
    container: {
      backgroundColor: '#FF0000',
      padding: 5,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
    },
    text: {
      fontSize: 25,
      color: '#FFF',
      marginLeft: 7,
    },
  }; */

export default Home;