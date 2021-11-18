import React, { useState} from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from 'react-native';
import { scaleSize } from '../constants/Layout';
import { checkUser } from '../api';

const CheckId = (id, password, navigation) => {
    const filter = {
        method: 'POST',
        body: `ID=${id}&Password=${password}`,
        headers:{
            "Content-type": "application/x-www-form-urlencoded"
        },
    }
    
    checkUser(filter, navigation, id);
    
}




export default function LogIn({navigation}){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");  

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Log In</Text>
                </View>
                <TextInput 
                    style={styles.input} 
                    placeholder="ID" 
                    placeholderTextColor="white"
                    value={id}
                    onChangeText={setId}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Password" 
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={()=>{
                    CheckId(id, password, navigation)
                    setId("");
                    setPassword("");
                    }}>
                    <Text style={styles.buttonText}>Log In</Text> 
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        paddingLeft: scaleSize(60),
        paddingRight: scaleSize(60)
    },

    form: {
        alignSelf: 'stretch'
    },

    titleContainer: {
        paddingBottom: scaleSize(10),
        marginBottom: scaleSize(40),
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
    },

    title:{
        color:'white',
        fontSize: 24,
    },

    input: {
        color:'white',
        alignSelf: 'stretch',
        height: scaleSize(40),
        marginBottom: scaleSize(30),
        borderBottomColor: '#fff',
        borderBottomWidth: 1,

    },

    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: scaleSize(20),
        backgroundColor: '#59cbbd',
        marginTop: scaleSize(30)
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
  });