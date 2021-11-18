import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text, ScrollView} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import {SearchBar} from 'react-native-elements';
import { scaleSize } from '../constants/Layout';
import { useStocks } from '../components/useStocks';

export default function SearchScreen({ navigation }) {
  const { addToWatchlist } = useStocksContext();
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const {allStocks} = useStocks();
  const [exist, setExist] = useState(true);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.text}>Type a compnay name or stock symbol</Text>
        <SearchBar 
          style={styles.input}
          value={search}
          onChangeText={event => {
            let filteredResults = allStocks.filter(data => data.symbol.includes(event.toUpperCase()) || data.name.toUpperCase().includes(event.toUpperCase()));
            setSearch(event)
            setResults(filteredResults);
            if(filteredResults.length === 0){
              setExist(false);
            }else{
              setExist(true);
          }
          }} 
        />

        {/* /* List of results */}

        <ScrollView>
          {exist === false ? (
              <Text style={styles.text}>No Results Found!</Text>
          ):(
              results.map(result=>{
                  return(
                    <TouchableOpacity key={Math.random()} style={styles.list} onPress={() => {
                      addToWatchlist(result.symbol);
                      navigation.navigate('Stocks');
                      }}> 
                      <Text style={styles.symbol}>{result.symbol}</Text>
                      <Text style={styles.name}>{result.name}</Text>
                    </TouchableOpacity>
                  )
                  
              })
          )}
        </ScrollView>
        
        
      </View>
    </TouchableWithoutFeedback>    
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginTop: scaleSize(20),
    textAlign: 'center',
    marginBottom: scaleSize(20)
  },

  symbol: {
    color:'white',
    textAlign:'left',
    fontSize: scaleSize(20),
  },
  name:{
    color:'white',
    textAlign:'left',
    fontSize: scaleSize(15),
  },
  
  list: {
    margin: scaleSize(10),
  }
});