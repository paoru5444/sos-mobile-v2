import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from 'react-navigation-hooks'

import { Text } from '../../common/Text'

import api from '../../../server/api'

export function navigationOptions({ navigation }) {
  return {
    title: 'Queixa Finalizada',
    headerTintColor: '#f2f2f7',
      headerStyle: {
        backgroundColor: '#215583'
      },
      headerTitleStyle: {
        color: '#f2f2f7',
      },
  };
}

export default function FimQueixa(props) {
  const { navigate, push } = useNavigation()

  const [anamnese, setAnamnese] = useState({})

  useEffect(() => {
    setAnamnese(props.navigation.getParam('anamnese'))
  }, [])

  async function submitAnamnese(route) {
    try {
      const response = await api.post('/anamnese', anamnese)
      console.log('fim wueixa', response.data)
      props.navigation.navigate(route, { anamnese: response.data })
    } catch(error) {
      console.log(error.response)
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text color="#2c2c2c" size="28px">Escolha entre as{'\n'}duas opções</Text>
      </View>

      <TouchableOpacity style={styles.row} onPress={() => submitAnamnese('Reports')}>
        <Image source={require('../../../assets/images/man.png')} style={styles.image} />
        <Text color="#2c2c2c">Sou Surdo,{'\n'}Quero salvar minha queixa.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.row} onPress={() => submitAnamnese('Doctor')}>
        <Image source={require('../../../assets/images/doctor.png')} style={styles.image} />
        <Text color="#2c2c2c">Sou Médico,{'\n'}quero diagnosticar.</Text>
      </TouchableOpacity>
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
    width: '100%',
    height: '22%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 20,
    borderBottomWidth: 0.3,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
  }
})
