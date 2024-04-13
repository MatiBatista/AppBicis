import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, ScrollView, SafeAreaView } from "react-native";
import CustomInput from '../../components/CustomInput/CustonInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import Logo from "../../../assets/Recurso3.png"
//import { useNavigate } from 'react-router-native';
import axios from "axios";
import { BASE_URL } from '../../url.js'




const Register = ({navigation}) => {

    const URI = `${BASE_URL}/public/user`

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [repeaterPass, setRepeaterPass] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dni, setDni] = useState('')
    const [mail, setMail] = useState('')
    const [numPhone, setNumPhone] = useState('')


    const onSignUpPresed = async (e) => {
        e.preventDefault()
        if(user.length===0 || pass.length===0 || repeaterPass.length===0
            || name.length===0 || lastName.length===0 || dni.length===0
            || mail.length===0 || numPhone.length===0){
            alert("Complete Los Datos Faltantes!!");
            }else{
            const results = await axios.post(`${URI}`, 
                {username:user, 
                password:pass,
                name: name,
                lastName: lastName,
                dni: dni,
                email: mail,
                numPhone: numPhone
                })  
            if(results.status == 200){  //user == "patogonnet" && pass == "1234"){
                console.warn('Se generó el usuario con exito')    
                navigation.navigate('Login')
            }else {
            console.warn('No se puede generar el usuario')
                 }
                }
        
    }

    const backToLogin = async (e) => {
        e.preventDefault()
        navigation.navigate('Login')
    }

    return( 
        <>
            <Image source={Logo} style={styles.logo}/>
            <ScrollView style={styles.container}> 
                <CustomInput 
                placeholder="Usuario" 
                value={user} 
                setValue={setUser}
                />
                <CustomInput 
                placeholder="Nombre" 
                value={name} 
                setValue={setName}
                />
                <CustomInput 
                placeholder="Apellido" 
                value={lastName} 
                setValue={setLastName}
                />
                <CustomInput 
                placeholder="DNI" 
                value={dni} 
                setValue={setDni}
                />
                <CustomInput 
                placeholder="correo" 
                value={mail} 
                setValue={setMail}
                />
                <CustomInput 
                placeholder="telefono" 
                value={numPhone} 
                setValue={setNumPhone}
                />
                <CustomInput 
                placeholder="Contraseña" 
                value={pass} 
                setValue={setPass} 
                secureTextEntry
                />
                <CustomInput 
                placeholder="Contraseña" 
                value={repeaterPass} 
                setValue={setRepeaterPass} 
                secureTextEntry
                />
                <CustomButton text="Registrar" onPress={onSignUpPresed}/>
                <CustomButton text="Volver al Login" onPress={backToLogin}/>
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    

        container: {
        flex: 1,
        //marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        //alignItems: 'center',
          
        },
        logo: {
        //marginTop: 20,
        width: '100%',
        height:'100%',
        maxWidth: 150,
        maxHeight: 100,
        marginBottom: 30,
        alignSelf: 'center'
    }
})

export default Register