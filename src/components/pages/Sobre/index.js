import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

export function sobreOptions({ navigate }) {
  return {
    title: 'Sobre o SOS LIBRAS',
    headerTintColor: '#f2f2f7',
      headerStyle: {
        backgroundColor: '#215583'
      },
      headerTitleStyle: {
        color: '#f2f2f7',
      },
  }
}

function Sobre() {
  return (
    <View style={styles.wrapper}>
      {/* <View style={styles.banner}>
        <ImageBackground style={styles.imageBanner} source={require('../../../../assets/images/alimentation.png')}>
        </ImageBackground>
      </View> */}

      <View style={styles.row}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.image} />
        <Text style={styles.text}>
          O SOS LIBRAS tem por objetivo proporcionar uma comunicação mais clara e objetiva entre profissionais da saúde e pacientes surdos, cuja finalidade é sanar ou minimizar os problemas referentes à comunicação encontrados entre estes envolvidos no sistema de saúde.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  column: {
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  banner: {
    width: '100%',
    height: '25%',
    backgroundColor: "transparent",
    padding: 0,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
  imageBanner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20
  },
  imagePiramide: {
    width: 90,
    height: 90,
  },
  text: {
    color: "#2c2c2c",
    fontSize: 18,
    textAlign: 'center'
  }
})

export default Sobre;