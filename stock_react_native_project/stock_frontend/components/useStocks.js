import {useState, useEffect} from "react";
import { getAllStocks } from "../api";
import { AsyncStorage } from "react-native";

// Load all stocks from the API and save them to AsyncStorage.

const USER_LS = "allStocks";

export const useStocks = () =>{
    const [allStocks, setAllStocks] = useState([]);
    const [loading, setLoading] = useState([true]);

    const getData = async () => {

        try{
            if(!AsyncStorage.getItem(USER_LS)){
                const {data} = await getAllStocks();
                data.sort((a,b) => {
                    if(a.symbol < b.symbol){
                        return -1;
                    }else{
                        return 1;
                    }
                })
                await AsyncStorage.setItem(USER_LS, JSON.stringify(data));
                setAllStocks(data);
            }else{
                let data = JSON.parse(await AsyncStorage.getItem(USER_LS));
                setAllStocks(data);
            }
            
        }catch(e){
            console.log(e);
            setLoading(false);
        }finally{
            setLoading(false);
            
        } 
    };

    useEffect(()=>{
        getData();
    },[]);

    return {allStocks, loading};
};

