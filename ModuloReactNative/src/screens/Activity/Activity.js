import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, Switch, Pressable, ScrollView } from "react-native";
import CustomInput from '../../components/CustomInput/CustonInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import Logo from "../../../assets/Recurso3.png"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "react-native-web";
import Nav from "../../components/Nav/Nav";
import { BASE_URL } from '../../url.js'
import axios from "axios";
import { Table, Row, Rows } from 'react-native-table-component';
import Moment from 'moment';

const Activity = ({navigation}) => {


    const URI = `http://${BASE_URL}:8081/user/record/`
    const [user, setUser] = useState('')
    const [records, setRecords] = useState([])
    const tableHead = ['Fecha Inicio','Fecha Fin', 'Soporte'];


    const onSignOutPresed = () => {
        clearAllData()
        navigation.navigate('Login')
    }

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
    const key_token = await AsyncStorage.getItem('token')
    console.log('token: ',key_token)
    }

    const getRecord = async () => {
        try{
            const key_user = await AsyncStorage.getItem('user')
            const keytoken = await AsyncStorage.getItem('token')
            const results = await axios.get(`${URI}${key_user}`, {headers:{ 'Authorization': `Bearer ${keytoken}` }})
            const data = await results.data
            console.log(data)
            const tableData = await data.map((item) => [
                Moment(item.startDateTime).format('DD/MM/YYYY hh:ss'),
                item.endDateTime !== null ? Moment(item.endDateTime).format('DD/MM/YYYY hh:ss') : '' ,
                item.soportName,
              ]);
            setRecords(tableData)
            console.log(records)
        }
        catch (err){
            console.log(err)
        }
    }


    return(
        <>
            <Nav user={user} navigation={navigation} />
            <View style={styles.container}> 

                <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
                  <Row data={tableHead} style={styles.head} textStyle={styles.text1} />
                  <Rows data={records}  textStyle={styles.text1}/>
                </Table>    
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'
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
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text1: { margin: 6 },
    table: { borderWidth: 1, borderColor: '#000000' },
})

export default Activity;