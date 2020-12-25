
import React, {useState,useEffect} from 'react';
import { StyleSheet,Dimensions } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import MapView,{Marker} from 'react-native-maps';
import * as Location from 'expo-location';

interface IGeolocation {
  latitude: number;
  longitude: number;
}
export default function TabOneScreen() {
  const [location, setLocation] = useState<IGeolocation>({
    latitude:  35.5696447,
    longitude:  126.8516797,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let pos = await Location.getCurrentPositionAsync({});
      console.log("latitude:pos.coords.latitude=>",pos.coords.latitude)
      setLocation({latitude:pos.coords.latitude,longitude:pos.coords.longitude,});
      console.log(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map MapView</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={region => {
          /*setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });*/
          //console.log(region.latitude,region.longitude)
        }}
        onRegionChangeComplete={region => {
          /*setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });*/
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={"latitude"+location.latitude}
          description={"longitude"+location.longitude}
        />
      </MapView>

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
