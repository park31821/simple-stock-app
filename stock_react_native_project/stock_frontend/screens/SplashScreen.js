import React from 'react';
import { StyleSheet, View,TouchableOpacity, Text } from 'react-native';
import { scaleSize } from '../constants/Layout';


export default function LandingPage({navigation}){

    return(
        <>
        <Text style={styles.title}>Welcome to the Stocks App!</Text>
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.signUpContainer}  
                onPress={() => navigation.navigate("Register")}
            >
                <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.logInContainer}  
                onPress={() => navigation.navigate("Log In")}
            >
                <Text style={styles.text}>Log In</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        textAlign: 'center',
        marginBottom: '20%',
        justifyContent: 'center'
    },

    title: {
        color: 'white',
        textAlign:'center',
        marginTop:'20%',
        fontSize:scaleSize(25),
    },

    signUpContainer: {
        backgroundColor: 'green',
        width:'50%',
        height:'15%',
        alignSelf:'center',
        justifyContent:'center', 
        borderRadius: scaleSize(12),
        marginBottom: '10%',
    },

    logInContainer: {
        backgroundColor: 'grey',
        width:'50%',
        height:'15%',
        alignSelf:'center',
        justifyContent:'center', 
        borderRadius: scaleSize(12),
        marginBottom: '10%',
    },

    text: {
        fontWeight: 'bold',
        fontSize: scaleSize(24),
        textAlign:'center',
        color: 'white'
    }
  });