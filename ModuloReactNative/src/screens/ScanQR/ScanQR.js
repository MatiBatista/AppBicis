import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, Pressable, Alert  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { BASE_URL } from '../../url.js'
import * as Haptics from 'expo-haptics';

const ScanQR = ({navigation}) => {


    const URI = `http://${BASE_URL}:8081/user/record`
    const URI2 = `http://${BASE_URL}:8081/user/soport/`
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [user, setUser] = useState('');
    const [soport, setSoport] = useState('');
    const [soportQR, setSoportQR] = useState('');
    const [valsoport, setValSoport] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [endDateTime, setEndDateTime] = useState('')
    
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
      getUser()
      getToken()
      getBarCodeScannerPermissions();
      ValidarRecordActivo()
    }, []);

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

    const validarSoporte = async (data) => {
      try{
        const keytoken = await AsyncStorage.getItem('token')
        console.log('validarSoport data', data)
        results = await axios.get(`${URI2}${data}`,{headers:{ 'Authorization': `Bearer ${keytoken}` }})//.then(res=> console.log(res)).catch(err => console.log(err))
        //return results.status
        return results.data
      }
      catch (err){
        return console.log(err)
      }
    }

     const putSoport = async (data) => {
      try{
        const keytoken = await AsyncStorage.getItem('token')
        results = await axios.put(`${URI2}${data}`,null,{headers:{ 'Authorization': `Bearer ${keytoken}` }})//.then(res=> console.log(res)).catch(err => console.log(err))
        console.log(results.status,'1')
        console.log(results.data, '2')
        return results.data
      }
      catch (err){
        return console.log(err, 'putSoport')
      }
    } 

    const postRecord = async () => {
      // Function to get the value from AsyncStorage
      const keytoken = await AsyncStorage.getItem('token')
      const key_user = await AsyncStorage.getItem('user')
      await putSoport(soportQR)
      console.log('soportQR', soportQR)
      await axios.post(`${URI}`,{ nombreUsuario: key_user,
      nombreSoporte: soportQR} ,{headers:{ 'Authorization': `Bearer ${keytoken}` }}).then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
      setModalVisible(!modalVisible)
      Alert.alert('Se inció estacionamiento')
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
      navigation.push('Home')
    }

    const putRecord = async () => {
      // Function to get the value from AsyncStorage
      const keytoken = await AsyncStorage.getItem('token')
      const key_user = await AsyncStorage.getItem('user')
      await axios.put(`${URI}`,{ nombreUsuario: key_user,
      nombreSoporte: soportQR} ,{headers:{ 'Authorization': `Bearer ${keytoken}` }}).then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
      await putSoport(soportQR)
      setModalVisible1(!modalVisible1)
      Alert.alert('Se finalizo estacionamiento')
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
      navigation.push('Home')
    }

    const ValidarRecordActivo = async () => {
      try{

        // Function to get the value from AsyncStorage
        const key_user = await AsyncStorage.getItem('user')
        const keytoken = await AsyncStorage.getItem('token')
        const results = await axios.get(`${URI}/${key_user}`, {headers:{ 'Authorization': `Bearer ${keytoken}` }})
        const data = await results.data
        console.log(data)
        const lastRecord = await data[data.length - 1]
        const endDT = await lastRecord.endDateTime
        const SoportActual = await lastRecord.soportName
        setEndDateTime(endDT)
        if (endDT == null){
          setSoport(SoportActual)
        }
        //return endDT, SoportActual
        //console.log('Actualiza EndDateTime', endDateTime)
      }
      catch (error){
        console.log(error)
      }
    }
  
    const handleBarCodeScanned = async ({ type, data }) => {
      setScanned(true);
      const vs = await validarSoporte(data);
      setValSoport(vs)
      setSoportQR(data)
      console.log('vs',vs)
      console.log('soporte', soport)
      console.log('data',data)
      await ValidarRecordActivo();
      console.log('soporte',soport)
      if (vs === ''){
        return Alert.alert(`Soporte Incorrecto`)
      }
      if (vs == false && soport != data){
        return Alert.alert(`Soporte Ocupado`)
      }
      if (endDateTime == null && soport != data){
        return Alert.alert(`Tenes un estacionamiento activo en ${soport}`);
      } 
      if(endDateTime == null && soport == data) {
        setSoport(data);
        setModalVisible1(true);
      }
      if ((endDateTime !== null || endDateTime === '') && vs == true){  
        setSoport(data);
        setModalVisible(true);
      }
      /* alert(`Se escaneo el codigo tipo: ${type} y dato: ${data}`); */
    };
  
    if (hasPermission === null) {
      return <Text>Solicitando permiso de cámara</Text>;
    }
    if (hasPermission === false) {
      return <Text>Sin acceso a la cámara</Text>;
    }
  
    return (
      <>
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            />
          {scanned && <Button title={'Toque para escanear de nuevo'} onPress={() => setScanned(false)} />}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Iniciar estacionamiento de la bicicleta? {soport}</Text>
                <View style={styles.modalView1}>  
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>  postRecord()/* setModalVisible(!modalVisible) */}>
                    <Text style={styles.textStyle}> Si   </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}> No  </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible1(!modalVisible1);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Finalizar estacionamiento de la bicicleta? {soport}</Text>
                <View style={styles.modalView1}>  
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>  putRecord()/* setModalVisible(!modalVisible) */}>
                    <Text style={styles.textStyle}> Si   </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible1(!modalVisible1)}>
                    <Text style={styles.textStyle}> No  </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"

    },
    modalView: {
      margin: 20,
      marginTop: 400,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalView1: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
})

  export default ScanQR;