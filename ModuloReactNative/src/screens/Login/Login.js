import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet,Image, Switch } from "react-native";
import CustomInput from '../../components/CustomInput/CustonInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import Logo from "../../../assets/Recurso3.png"
import { Redirect, Route, Routes, NativeRouter,  useNavigate  } from 'react-router-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Svg, { Use, Image } from 'react-native-svg'









const Login = ({navigation}) => {

    const URI = `http://192.168.0.20:8081/public/authenticate`

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [textInputValue, setTextInputValue] = useState('');
    const [getValue, setGetValue] = useState('');
    //const navigate = useNavigate()

    const onSignInPresed = async (e) => {
        e.preventDefault()
        console.log(user, pass)
        if(user.length===0 || pass.length===0){
            alert("Complete Los Datos Faltantes!!");
            }else{
            const results = await axios.post(`${URI}`, {usuario:user, clave:pass})  
            if(results.status == 200){  //user == "patogonnet" && pass == "1234"){
                await AsyncStorage.setItem('user', user)
                await AsyncStorage.setItem('token', results.data['jwtToken'])
                navigation.navigate('Home')
            }else {
            console.warn('Not Sign in')
                 }
        
    }}

    const onRegisterPresed = async (e) => {
        e.preventDefault()
        navigation.navigate('Register')
        //navigate('/Register')
    }

    return(
        <View style={styles.container}>
                <Image source={Logo} style={styles.logo} /> 
            <CustomInput 
            placeholder="Usuario" 
            value={user} 
            setValue={setUser}
            />
            <CustomInput 
            placeholder="Contraseña" 
            value={pass} 
            setValue={setPass} 
            secureTextEntry
            />
            <CustomButton text="Ingresar" onPress={onSignInPresed}/>
            <CustomButton text="Registrarse" onPress={onRegisterPresed}/>
        </View>

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
        maxWidth: 300,
        maxHeight: 200,
        marginBottom: 50
    }
})


export default Login;