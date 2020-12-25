
import React, {useState} from 'react';
import { StyleSheet,Dimensions } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import MapView,{Marker} from 'react-native-maps';
interface IGeolocation {
  latitude: number;
  longitude: number;
}
export default function TabOneScreen() {
  const [location, setLocation] = useState<IGeolocation>({
    latitude:  35.56964060014485,
    longitude: 126.8517660163343,
  });
  
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
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
          console.log(region.latitude,region.longitude)
        }}
        onRegionChangeComplete={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}>
        <Marker
          coordinate={{
            latitude: 35.56964060014485,
            longitude: 126.8517660163343,
          }}
          title="맥도날드, 정읍"
          description="현재 내위치"
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
