import Register from '../../screens/Register/Register';
import Login from '../../screens/Login/Login';
import Home from '../../screens/Home/Home';
import ScanQR from '../../screens/ScanQR/ScanQR';
import Activity from '../../screens/Activity/Activity';
import Notification from '../../screens/Notification/Notification';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeAdmin from '../../screens/Home/HomeAdmin';
import SoportesBicicletas from "../../screens/SoportesBicicletas/SoportesBicicletas.js"

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
<<<<<<< HEAD

=======
import SoportesBicicletas from '../../screens/SoportesBicicletas/SoportesBicicletas';
import AltaSoporteBici from '../../screens/AltaSoporteBici/AltaSoporteBici';
import VisualizarSoporteBici from '../../screens/visualizarSoporteBici/visualizarSoporteBici';
import MyModal from '../../screens/modal/modal';
>>>>>>> 64a2b52e9451c8c0cb8e51557b7203a4fc996e10

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

export default function Navigation(){
    return(
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, /* contentStyle: {backgroundColor: '#1C819F'}  */}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
<<<<<<< HEAD
          <Stack.Screen name="Home" component={MyTabs} />
          <Stack.Screen name="Activity" component={Activity} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="ScanQR" component={ScanQR} />
          <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
          <Stack.Screen name="SoportesBicicletas" component={SoportesBicicletas} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}
=======
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
>>>>>>> 64a2b52e9451c8c0cb8e51557b7203a4fc996e10

  