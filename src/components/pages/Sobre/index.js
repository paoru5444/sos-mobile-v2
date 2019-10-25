import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

export function sobreOptions({ navigate }) {
  return {
    title: 'Sobre o SOS LIBRAS',
    headerTintColor: '#f2f2f7',
      headerStyle: {
        backgroundColor: '#1d829b'
      },
      headerTitleStyle: {
        color: '#f2f2f7',
        fontWeight: 'bold',
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
    width: '90%',
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
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
  imageBanner: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  image: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
  },
  imagePiramide: {
    width: 90,
    height: 90,
  },
  text: {
    color: "#1d829b",
    fontSize: 16,
    textAlign: 'justify',
    fontWeight: 'bold',
  }
})

export default Sobre;