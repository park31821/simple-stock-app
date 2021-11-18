import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text,Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';
import Visualisation from './Visualisation';
import { scaleSize } from '../constants/Layout';

// Display Watchlist and Modal

export default function DisplayList(props){
    const [visible, setVisible] = useState(false);
    let stockDetail = props.watchList[props.symbol];
  
    let companyName = stockDetail[0].companyName;
    let closingPrice = parseFloat(stockDetail[1]['4. close']).toFixed(2);
    let openingPrice = parseFloat(stockDetail[1]['1. open']).toFixed(2);
    let priceChange = (((closingPrice - openingPrice)/openingPrice)*100).toFixed(2);
    return(
      <>
      <View>
        <TouchableOpacity 
          key={Math.random()} 
          style={styles.list}
          onPress={() => {
            setVisible(true);
          }}
        >
          <View style={styles.row}>
            <Text style={styles.symbol}>{props.symbol}</Text>
            <Text style={styles.price}>{closingPrice}</Text>
            <Text style={priceChange > 0 ? styles.positiveChange : styles.negativeChange}>
              {priceChange}%
            </Text>
          </View> 
        </TouchableOpacity>
  
        
        <View>
          <Modal
            animationType = {"slide"}
            transparent = {true}
            isVisible = {visible}
            swipeDirection = "down"
            hasBackdrop={true}
            backdropOpacity={0}
            onBackdropPress={() => {
              setVisible(false);
            }}
            onSwipeComplete = {() => {
              setVisible(false);
            }}
            style={{
              margin: 0,
              justifyContent:'flex-end'
            }}
          >
            <View style={styles.modal}>
                <View style={styles.row1}>
                  <Text style={styles.title}>
                      {props.symbol}
                  </Text>
                  <Text style={styles.name}>
                      {companyName}
                  </Text>
                  <TouchableOpacity style={styles.icon}>
                      <Icon name={'close'} color={'black'} onPress={()=>setVisible(false)}/>
                  </TouchableOpacity>
                </View>
                <Visualisation stockDetail={stockDetail}/>
            </View>
          </Modal>
        </View>
  
      </View>
  
  
    </>
      
    )
  }

  const styles = StyleSheet.create({
    modal: {
      flex:0.9,
      backgroundColor: '#2e2d2c',
      borderRadius: scaleSize(12),
    },
  
    symbol: {
      color:'white',
      textAlign:'left',
      margin:scaleSize(10),
      fontSize: scaleSize(30),
  
    },
    price: {
      color:'white',
      textAlign:'right',
      margin:scaleSize(10),
      fontSize: scaleSize(30),
      textAlign: 'right',
      flex: 1
    },
  
    positiveChange: {
      color:'white',
      textAlign:'left',
      margin:scaleSize(10),
      fontSize: scaleSize(30),
      backgroundColor: 'green',
      padding: scaleSize(5),
      minWidth: '30%',
      textAlign: 'right',
      borderRadius: scaleSize(10),
      overflow: 'hidden',
  
    },
  
    negativeChange: {
      color:'white',
      textAlign:'left',
      margin:scaleSize(10),
      fontSize: scaleSize(30),
      backgroundColor: 'red',
      padding: scaleSize(5),
      minWidth: '30%',
      textAlign: 'right',
      borderRadius: scaleSize(10),
      overflow: 'hidden',
  
    },
    row:{
      display:'flex',
      flexDirection: 'row',
      borderBottomColor: 'grey',
      borderBottomWidth: 0.3,
      alignItems: 'center',
    },
  
    icon:{
      position:'absolute',
      top:0,
      right:0,
      margin: scaleSize(10),
      marginRight:0,
      backgroundColor: 'grey',
      borderRadius: scaleSize(12),
  },
  title:{
      color: 'white',
      fontSize: scaleSize(30),
      fontWeight: 'bold',
      textAlign:'left',
      marginBottom:scaleSize(10),
      marginTop:scaleSize(15)
  },
  name:{
      color: 'grey',
      fontSize: scaleSize(15),
      fontWeight: 'bold',
      textAlign:'left',
      marginBottom:scaleSize(13),
      marginLeft:scaleSize(15),
  },
  
  row1:{
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    alignItems: 'flex-end',
    width: '90%',
    alignSelf:'center',
  
  },
  });