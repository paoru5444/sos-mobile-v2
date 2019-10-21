import React, {useState, useEffect} from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

import api from '../../../server/api'

export function perfilOptions({ navigate }) {
  return {
    title: 'Perfil',
    headerTintColor: '#f2f2f7',
      headerStyle: {
        backgroundColor: '#215583'
      },
      headerTitleStyle: {
        color: '#f2f2f7',
      },
  }
}

function Perfil() {
  const [user, setUser] = useState({})
  
  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    try {
      const response = await api.get('/user')
      setUser(response.data)
    } catch(error) {
      console.log(error.response)
    }
  }
  return (
    <View style={styles.wrapper}>
      {/* <View style={styles.banner}>
        <ImageBackground style={styles.imageBanner} source={require('../../../../assets/images/alimentation.png')}>
        </ImageBackground>
      </View> */}

      <View style={{...styles.row, justifyContent: 'center'}}>
        <Image source={require('../../../assets/images/man.png')} style={styles.image} />
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>
          Nome: 
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>
          Email: 
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>
          Carteira de Vascina: 
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>
          Tipo Sanguineo: 
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>
          Telefone de Emergência: 
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
    justifyContent: 'flex-start'
  },
  row: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 40,
    flexWrap: 'wrap',
    borderBottomWidth: 0.5,
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
    width: 150,
    height: 150,
    marginVertical: 20
  },
  imagePiramide: {
    width: 90,
    height: 90,
  },
  text: {
    color: "#2c2c2c",
    fontSize: 16,
    textAlign: 'center'
  }
})

export default Perfil;