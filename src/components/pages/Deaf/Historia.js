import React from 'react'
import {
  Image, StyleSheet, Text, TextInput,  TouchableNativeFeedback, View
} from 'react-native'

import {
  Button
} from '../Home/HomeStyle'

import Feather from 'react-native-vector-icons/Feather'
import Slider from '@react-native-community/slider';
import { useNavigation } from 'react-navigation-hooks'

const Historia =  ({
    getDuracao, duracao,
    getFrequencia, frequencia,
    getIntensidade, intensidade,
    getLocalizacao, localizacao, makeAtendence,
}) => {

  const { navigate } = useNavigation()

  function intensidadeHandler(intensidade) {
    if (intensidade <= 1) return 'Sem dor'
    if (intensidade > 1 && intensidade <= 2) return 'Pouca dor'
    if (intensidade > 2 && intensidade <= 3) return 'Dor moderada'
    if (intensidade > 3 && intensidade < 4.999) return 'Dor intensa'
    if (intensidade === 5) return 'Dor máxima'

  }
  
  return (
    <View style={styles.wrapper}>
        <View style={styles.field}>
          <Text style={styles.text}>Por quanto{'\n'}tempo durou?</Text>
          <Feather name="calendar" size={40} color="#424242" />
          <View style={styles.squareField}>
            < TouchableNativeFeedback style={{ padding: 10 }} onPress={() => {
              getDuracao('-')
            }}>
              <Feather name="minus-circle" size={30} color="#215583" />
            </ TouchableNativeFeedback>
            
            <Text style={{...styles.text, fontSize: 18}}>{duracao} dia(s)</Text>

            < TouchableNativeFeedback style={{ padding: 10 }} onPress={() => {
              getDuracao('+')
            }}>
              <Feather name="plus-circle" size={30} color="#215583" />
            </ TouchableNativeFeedback>
          </View>
        </View>

         <View style={styles.field}>
          <Text style={styles.text}>De quanto em{'\n'}quanto tempo</Text>
          <Feather name="watch" size={40} color="#424242" />
          <View style={styles.squareField}>
            < TouchableNativeFeedback style={{ padding: 10 }} onPress={() => {
              getFrequencia('-')
            }}>
              <Feather name="minus-circle" size={30} color="#215583" />
            </ TouchableNativeFeedback>

            <Text style={{...styles.text, fontSize: 16}}>{frequencia} em {frequencia} horas </Text>

            < TouchableNativeFeedback style={{ padding: 10 }} onPress={() => {
              getFrequencia('+')
            }}>
              <Feather name="plus-circle" size={30} color="#215583" />
            </ TouchableNativeFeedback>
          </View>
        </View>

        <View style={{...styles.field, marginBottom: 0, justifyContent: 'center', width: '100%'}}>
          <Text style={styles.text}>Quando você se sentiu mal, doeu quanto?</Text>
        </View>

        <View style={{...styles.field, marginVertical: 0, justifyContent: 'flex-start'}}>
          <Feather name="frown" size={40} color="#424242" style={{ marginHorizontal: 10 }} />
          <Text style={styles.text}>
            {intensidadeHandler(intensidade)}
          </Text>
        </View>

        <View style={{ ...styles.squareField, width: '80%', bottom: 20 }}>
            <Slider
              style={{width: '100%',}}
              minimumValue={1}
              maximumValue={5}
              minimumTrackTintColor="#215583"
              maximumTrackTintColor="#000000"
              onValueChange={(value) => getIntensidade(value)}
            />
          </View>

        {/* <View style={styles.field}>
          <Text style={styles.text}>Localização</Text>
          <View style={styles.squareField}>
            < TouchableNativeFeedback onPress={() => getLocalizacao('membros')} style={{ alignItems: 'center'}}>
              <Image source={require('../../../assets/images/historia/broken-arm.png')} style={styles.localizacaoImage} />
              <Text>Membros {localizacao[0] && <Feather name="check" size={20} color="green" />}</Text>
            </ TouchableNativeFeedback>
            
            < TouchableNativeFeedback onPress={() => getLocalizacao('torco')} style={{ alignItems: 'center'}}>
              <Image source={require('../../../assets/images/historia/abs.png')} style={styles.localizacaoImage} />
              <Text>Torço {localizacao[1] && <Feather name="check" size={20} color="green" />}</Text>
            </ TouchableNativeFeedback>

            < TouchableNativeFeedback onPress={() => getLocalizacao('cabeca')} style={{ alignItems: 'center'}}>
              <Image source={require('../../../assets/images/historia/head.png')} style={styles.localizacaoImage} />
              <Text>Cabeça {localizacao[2] && <Feather name="check" size={20} color="green" />}</Text> 
            </ TouchableNativeFeedback>
          </View>
        </View> */}

        <Button onPress={() => makeAtendence()}>
            <Text style={{...styles.text, color: '#f2f2f7'}}>Finalizar Queixa</Text>
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scroll: {
    width: '100%',
    height: '100%',
    paddingTop: 50,
  },
  form: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 20,
  },
  field: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingVertical: 10,
  },
  input: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2c2c2c',
  },
  errorMessage: {
    color: '#f0134d',
    alignSelf: 'flex-start',
  },
  text: {
    color: '#2c2c2c',
    fontSize: 18,
  },
  squareField: {
    width: '50%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  localizacaoImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  }
})

export default Historia