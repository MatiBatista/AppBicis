import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanQR = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [user, setUser] = useState('');
    const [soport, setSoport] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
  
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
      getUser()
      getToken()
  
      getBarCodeScannerPermissions();
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
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setSoport(data);
      setModalVisible(true);
      /* alert(`Se escaneo el codigo tipo: ${type} y dato: ${data}`); */
      /* navigation.navigate('Inicio'); */
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
                    onPress={() => setModalVisible(!modalVisible)}>
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