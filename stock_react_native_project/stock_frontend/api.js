import axios from "axios";
import { AsyncStorage } from "react-native";

// API Address

const SERVER_URL = 'http://172.22.27.218:3001';

const api = axios.create({
  baseURL: "https://www.alphavantage.co/query",
  params:{
      apikey: "4N7PWZO4K5KEQ83G"
  }
});

const api2 = axios.create({
    baseURL: "https://financialmodelingprep.com/api/v3",
    params:{
        apikey:"1d1a86fa49e866279effef61ce0990fd"
    }
});


// Fucnction to manage API

export const getAllStocks = () => api2.get("/nasdaq_constituent");

export const getStockHisory = (symbol) => api.get("/",{
    params: {
        function: "TIME_SERIES_DAILY",
        symbol: symbol,
    }
})


// Function to manage Server

export const insertUser = (filter, navigation, id) =>{

    fetch(`${SERVER_URL}/api/add`, filter)
    .then((res) => res.json())
    .then((res) => {
        if(res["Code"] == 201){
            AsyncStorage.setItem('user_id', id);
            getWatchList(filter);
            navigation.navigate("Home");
        }else if(res["Code"] == 400){
            alert("Please fill out the details.");

        }else{
            alert("This ID already exists.");
        }
        console.log(res);
    })
}

export const updateWatchList = (filter) =>{
    fetch(`${SERVER_URL}/api/update`, filter)
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
      })
}

export const checkUser = (filter, navigation, id) =>{

    fetch(`${SERVER_URL}/api/validate`, filter)
    .then((res) => res.json())
    .then((res) => {
        if(res["Error"] == false){
            AsyncStorage.setItem('user_id', id);
            getWatchList(filter);
            navigation.navigate("Home");
        }else{
            alert(res['Message']);
        }
        console.log(res);
    })
}

export const getWatchList = (filter) =>{

    fetch(`${SERVER_URL}/api/getWatchList`, filter)
    .then((res) => res.json())
    .then(async(res) => {
        if(res["Error"] == false){
            AsyncStorage.removeItem('watchList');
            if(res["WatchList"] != null){
                AsyncStorage.setItem('watchList', res["WatchList"]);
            }
        }else{
            alert(res['Message']);
        }

        console.log(`${res['Message']} with Code ${res['Code']}`);
    })
}

