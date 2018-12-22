import React from 'react';
import { StyleSheet, Text, StatusBar, ActivityIndicator, KeyboardAvoidingView, Platform, TextInput,  ImageBackground, View, Image, TouchableOpacity } from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';

export default class App extends React.Component {

constructor(props){
  super(props);

  this.state = {
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weather: '',
    description:'',
    icon:'',
  };
}

componentDidMount(){
 this.handleUpdateLocation('Temanggung');
}

handleUpdateLocation = async city => {
  if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        // const locationId = await fetchLocationId(city);
        const { location, weather, description, temperature, icon } = await fetchWeather(city);

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          description,
          temperature,
          icon,
        });

      } catch (e) {
        this.setState({
        loading: false,
        error: true,
      });
    }
  });
};

render() {
  const { loading, error, location, weather, description, temperature, icon } = this.state;

return (
  <KeyboardAvoidingView style={styles.container} behavior="padding">
    <StatusBar barStyle="light-content" />
    <ImageBackground source={getImageForWeather(weather)} style={styles.imageContainer}
    imageStyle={styles.image}
    >
    <View style={styles.detailsContainer}>

      <ActivityIndicator animating={loading} color="white" size="large" />
      
      {!loading && (
        <View>
          {error && (

            <Text style={[styles.smallText, styles.textStyle]}>
              Tidak ditemukan :(
            </Text>
          )}

          {!error && (
            <View>
            
              <Image style={styles.imgnya}
                  source={{uri: icon }}
               />

              <Text style={[styles.largeText, styles.textStyle]}>
                {location}
              </Text>

              <Text style={[styles.smallText, styles.textStyle]}>
                {weather} ({description}) 
              </Text>
              <Text style={[styles.largeText, styles.textStyle]}>
                {`${Math.round(temperature)}° Celcius`}
              </Text>
            </View>
          )}

          <SearchInput
          placeholder="Cari Kota.."
          onSubmit={this.handleUpdateLocation}
          />
        </View>
      )}  

              <Text style = {[styles.foo, styles.miniText]}> Made with ❤ Catra Andika </Text>

        </View>
      </ImageBackground>
    </KeyboardAvoidingView> 
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f3640',

  },

  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ?  'AvenirNext-Regular' : 'Roboto',
    color: 'white',

  },
  miniText:{
    fontSize: 12,
  },
  smallText: {
    fontSize: 18,
  },

  largeText: {
    fontSize: 44,
  },

  imageContainer: { 
    flex: 1, 
  }, 

  imgnya: {
    width: 70,
    height: 58,
    justiftyContent:"center",
    alignSelf:"center"
  },

   foo:{
      color: '#fff',
      alignSelf: 'center',
      marginTop: 100,
   },

  image: { 
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover', 
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20, 
  },

});
