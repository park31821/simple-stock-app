import React from "react";
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import { StocksProvider} from '../contexts/StocksContext';
import LandingPage from '../screens/SplashScreen';
import SignUp from "../screens/SignUpScreen";
import LogIn from "../screens/LogInScreen";

const Stack = createStackNavigator();

export default function AppContainer(props) {
    
    return (
        <View style={styles.container}>
            <StocksProvider>
            
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <NavigationContainer theme={DarkTheme}>
                    <Stack.Navigator>
                        <Stack.Screen name="Sign In" component={LandingPage}/>
                        <Stack.Screen name="Register" component={SignUp}/>
                        <Stack.Screen name="Log In" component={LogIn}/> 
                        <Stack.Screen name="Home" component={BottomTabNavigator} />                       
                    </Stack.Navigator>
                </NavigationContainer>
            </StocksProvider>

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
