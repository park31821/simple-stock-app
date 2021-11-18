import { LineChart } from 'react-native-chart-kit';
import React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions} from 'react-native';
import { scaleSize } from '../constants/Layout';

// Generates table and graph for stock details.

const DIVIDING_FACTOR = 15;

export default function Visualisation (props){
    let stockDetail = props.stockDetail.slice(1);
    let chartLabel = stockDetail.map(stock => stock['date'].substring(5,12)).reverse();
    let chartData = stockDetail.map(stock => parseFloat(stock['4. close']).toFixed(2)).reverse();

    let hiddenIndices = []
    for(let x=0; x<chartLabel.length; ++x){
        if(x%DIVIDING_FACTOR != 0){
            hiddenIndices.push(x);
        }
    }

    const TABLE = [
        {
            title: "OPEN",
            key: parseFloat(stockDetail[0]['1. open']).toFixed(2)
        },
        {
            title: "HIGH",
            key: parseFloat(stockDetail[0]['2. high']).toFixed(2)
        },
        {
            title: "LOW",
            key: parseFloat(stockDetail[0]['3. low']).toFixed(2)
        },
        {
            title: "CLOSE",
            key: parseFloat(stockDetail[0]['4. close']).toFixed(2)
        },
        {
            title: "VOLUME",
            key: stockDetail[0]['5. volume']
        },
        {
            title: "DATE",
            key: stockDetail[0]['date']
        },
    ]

    return(
        <>
        <LineChart
            data={{
                labels: chartLabel,
                datasets:[
                    {
                        data: chartData
                    }
                ]
            }}
            width={Dimensions.get("window").width*0.95}
            height={scaleSize(250)}
            withDots={false}
            withInnerLines={true}
            withShadow={true}
            withVerticalLines={true}
            yAxisInterval={chartData.length/3}
            hidePointsAtIndex={hiddenIndices}
            verticalLabelRotation={300}
            xLabelsOffset={20}
            chartConfig={{
                backgroundGradientFrom: "#2e2d2c",
                backgroundGradientTo: "#2e2d2c",
                fillShadowGradient: "green",
                fillShadowGradientOpacity: 0.5,
                decimalPlaces: 2,
                color: () => `green`,
                labelColor: () => `white`,
                style: {
                  borderRadius: scaleSize(16)
                },
                propsForBackgroundLines:{
                    strokeWidth: 0.3,
                    strokeDasharray: "",
                    stroke: "white"
                }
              }}
              style={{
                marginVertical: scaleSize(8),
                borderRadius: scaleSize(16),
                alignSelf: 'center'
              }}
        />
        <FlatList
            data={TABLE}
            columnWrapperStyle={{
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
                width: '90%',
                alignSelf:'center',
                
            }}
            renderItem={({item}) => (
                <View style={styles.row}>
                    <Text style={styles.column}>{item.title}</Text>
                    <Text style={styles.data}>{item.key}</Text>
                </View>
            )}
            numColumns={2}
        />
        </>
    )
} 

const styles = StyleSheet.create({
    chart:{
        alignSelf: "center"
    },
   row:{
        flexDirection:"row",
        width: "45%",
        padding: '2%',
        justifyContent:'space-between',
        marginLeft: '5%',
    },
    column:{
        color: "grey",
        fontSize: scaleSize(15),
    },

    data:{
        textAlign:'right',
        color: "white",
        fontSize: scaleSize(15),
    },
    
})