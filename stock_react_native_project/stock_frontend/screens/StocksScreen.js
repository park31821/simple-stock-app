import React, { useEffect} from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import DisplayList from '../components/DisplayList';
import Spinner from 'react-native-loading-spinner-overlay';


export default function StocksScreen({route, navigation}) {
  const { watchList, loading } = useStocksContext();

  useEffect(() => {

  }, [watchList]);

  return (
    loading ? (
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinner}
      />
    ):(
      <ScrollView>
        {Object.keys(watchList).map((key,index) => {
          return(
            <DisplayList symbol={key} key={Math.random()} watchList={watchList} navigation={navigation}/>
          )
        })}
      </ScrollView>
    )

  );
}


const styles = StyleSheet.create({
  spinner: {
    color: 'white',
  },
});

