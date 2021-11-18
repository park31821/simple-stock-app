import React, { useState, useContext, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { getStockHisory, updateWatchList } from "../api";
import { useStocks } from "../components/useStocks";

const StocksContext = React.createContext();

const saveWatchList = async (user, filter, watchList) =>{
  await AsyncStorage.setItem('watchList', JSON.stringify(watchList));
  filter.body = `ID=${user}&WatchList=${JSON.stringify(watchList)}`;
  updateWatchList(filter);
}

// Extracts data from API

const extractHistory = obj => {
  let savedData = Object.entries(obj['Time Series (Daily)']);
  savedData.map(x => {
      x[1]['date'] = x[0];
      x.shift();
      return x;
  });
  savedData = savedData.map(data => data[0]);
  return savedData;
}


export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);
  
  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext);
  const [loading, setLoading] = useState(true);
  const {allStocks} = useStocks();
  let watchList = {};

  // Load Watchlist from AsyncStorage

  async function loadData () {
    let loadedArray = await AsyncStorage.getItem('watchList');
    try{
      if(loadedArray === null){
        setState(watchList);
      }else{
        setState(JSON.parse(loadedArray));
      }
    } catch (e){
      console.log(`An error has occurred: ${e}`);
    } finally{
      setLoading(false);
    }
  }

  // Executes when the stock from SearchScreen in pressed.

  async function addToWatchlist(newSymbol) {
    const user = await AsyncStorage.getItem('user_id');
    const filter = {
      method: 'POST',
      body: `ID=${user}`,
      headers:{
          "Content-type": "application/x-www-form-urlencoded"
      },
    }
    try{
      const loadedArray = await AsyncStorage.getItem('watchList')
      if(loadedArray === null){
        const {data} = await getStockHisory(newSymbol);
        watchList[newSymbol] = extractHistory(data);
        let companyName = allStocks.filter(stock => stock.symbol === newSymbol)
        watchList[newSymbol][0] = {'companyName': companyName[0].name};
        setState(watchList);
        saveWatchList(user,filter,watchList);
        
      }else{
        watchList = JSON.parse(loadedArray);
        let currentStock = watchList[newSymbol];

        if(!currentStock){
          const {data} = await getStockHisory(newSymbol);
          watchList[newSymbol] = extractHistory(data);
          let companyName = allStocks.filter(stock => stock.symbol === newSymbol)
          watchList[newSymbol][0] = {'companyName': companyName[0].name};
          setState(watchList);
          saveWatchList(user, filter,watchList);

          
        } else {
            setState(watchList);
        }
      }
    } catch(e){
      console.log(`An error has occurred: ${e}`);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return { watchList: state,  loading, addToWatchlist };
};
