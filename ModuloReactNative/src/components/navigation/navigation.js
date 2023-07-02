import Register from '../../screens/Register/Register';
import Login from '../../screens/Login/Login';
import Home from '../../screens/Home/Home';
import ScanQR from '../../screens/ScanQR/ScanQR';
import Activity from '../../screens/Activity/Activity';
import Notification from '../../screens/Notification/Notification';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import HomeAdmin from '../../screens/Home/HomeAdmin';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SoportesBicicletas from '../../screens/SoportesBicicletas/SoportesBicicletas';
import AltaSoporteBici from '../../screens/AltaSoporteBici/AltaSoporteBici';
import VisualizarSoporteBici from '../../screens/visualizarSoporteBici/visualizarSoporteBici';
import MyModal from '../../screens/modal/modal';

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
      <Tab.Navigator
          screenOptions={{ headerShown: false,tabBarActiveTintColor: '#1C819F'}}>
            <Tab.Screen name="Inicio"  options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }} component={Home} />
            <Tab.Screen name="Activity" options={{
                tabBarLabel: 'Actividad',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="card-text-outline" color={color} size={size} />
                ),
                }}
              component={Activity} />
            <Tab.Screen name="ScanQR" options={{
                tabBarLabel: 'ScanQR',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
                ),
                }} 
              component={ScanQR} />
            <Tab.Screen name="Notification" options={{
                tabBarLabel: 'Notificaciones',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="bell" color={color} size={size} />
                ),
                }} 
            component={Notification} />
        </Tab.Navigator>
    )
  }
  

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [role, setRole] = useState(''); // Estado para almacenar el rol

  const handleLogin = (userRole) => {
    setRole(userRole); // Actualizar el rol al iniciar sesión
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {role === '' ? (
          <>
          <Stack.Screen name="Login">
            {(props) => <Login {...props} handleLogin={handleLogin} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            {role === 'admin' && (
              <>
              <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
              <Stack.Screen name="SoportesBicicletas" component={SoportesBicicletas} />
              <Stack.Screen name="AltaSoporteBici" component={AltaSoporteBici} />
              <Stack.Screen name="VisualizarSoporteBici" component={VisualizarSoporteBici} />
              <Stack.Screen name="ModalVisualizarSoporteBici" component={MyModal} />
              </>
            )}
            {role === 'user' && (
              <>
                <Stack.Screen name="Home" component={MyTabs} />
                <Stack.Screen name="Activity" component={Activity} />
                <Stack.Screen name="ScanQR" component={ScanQR} />
                <Stack.Screen name="Notificacion" component={Notification} />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 