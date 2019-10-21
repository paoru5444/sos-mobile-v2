import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import api from '../../../server/api'

export function reportDetailNavigation() {
  return {
    title: 'Detalhe da Queixa',
    headerTitleStyle: {
      color: '#f2f2f7'
    },
    headerStyle: {
      backgroundColor: '#216583',
    },
    headerTintColor: '#f2f2f7',
  }
}

export default function ReportDetail(props) {
  const [alimentations, setAlimentation] = useState([])
  const [drugs, setDrugs] = useState([])
  const [recomendation, setRecomendation] = useState([])
  const [anamnese, setAnamnese] = useState({queixas: [], localizacao: []})

  useEffect(() => {
    getAnamnese()
    getAlimentation()
    getDrugs()
    getRecomendation()
  }, [])

  async function getAnamnese(){
    try {
      const anamneseId = props.navigation.getParam('anamneseId')
      const response = await api.get(`/anamnese/${anamneseId}`)
      console.log('anamnese', response.data)
      setAnamnese(response.data)
    } catch(error) {
      console.log(error.response.data)
    }
  }

  async function getAlimentation(){
    try {
      const anamneseId = props.navigation.getParam('anamneseId')
      const response = await api.get(`/alimentation/${anamneseId}`)
      setAlimentation(response.data)
      console.log(response.data)
    } catch(error) {
      console.log(error.response.data)
    }
  }

  async function getDrugs(){
    try {
      const anamneseId = props.navigation.getParam('anamneseId')
      const response = await api.get(`/drugs/${anamneseId}`)
      console.log(response.data)
      setDrugs(response.data)
    } catch(error) {
      console.log(error.response.data)
    }
  }

  async function getRecomendation(){
    try {
      const anamneseId = props.navigation.getParam('anamneseId')
      const response = await api.get(`/recomendation/${anamneseId}`)
      console.log('recomendation', response.data)
      setRecomendation(response.data[0])
    } catch(error) {
      console.log(error.response.data)
    }
  }

  return (
    <ScrollView>
    <View style={styles.wrapper}>

      <View style={styles.row}>
        <Text style={{...styles.text, fontSize: 22}}>
          Informações do Paciente
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>Queixas: { anamnese.queixas.join(' ')  || "Queixas não cadastradas"}</Text>
        <Text style={styles.text}>Duração: { anamnese.duracao } Dias</Text>
        <Text style={styles.text}>Frequencia: { anamnese.frequencia } em { anamnese.frequencia } Dias</Text>
        <Text style={styles.text}>Intnesidade: { anamnese.intensidade }</Text>
      </View>

      { drugs.length !== 0 && alimentations.length !== 0 && recomendation.length !== 0 && (
        <View style={styles.row}>
          <Text style={{...styles.text, fontSize: 22}}>
            Informações do Médico
          </Text>
        </View>
      )}
      
      
      { drugs.length !== 0 && (
        <>
          <View style={styles.row}>
            <Image source={require('../../../assets/images/medicine.png')} style={styles.image} /> 
            <Text style={{...styles.text, fontSize: 20 }}>Remédios</Text>
          </View>
          
          {drugs.map((drug, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.text}>Nome: { drug.name }</Text>
              <Text style={styles.text}>Modo de uso: { drug.useMode }</Text>
              <Text style={styles.text}>Período: { drug.period }</Text>
              <Text style={styles.text}>Dosagem: { drug.dosage }</Text>
            </View>
          ))}
        </>
      )}

      { alimentations.length !== 0 && (
        <>
          <View style={styles.row}>
            <Image source={require('../../../assets/images/diet.png')} style={styles.image} /> 
            <Text style={{...styles.text, fontSize: 20 }}>Alimentos</Text>
          </View>

          {alimentations.map((alimentation, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.text}>Nome: { alimentation.name }</Text>
              <Text style={styles.text}>Classificação: { alimentation.foodType }</Text>
            </View>
          ))}
        </>
      )}
      
      { recomendation.length !== 0 && (
        <>
          <View style={styles.row}>
            <Image source={require('../../../assets/images/clipboard.png')} style={styles.image} /> 
            <Text style={{...styles.text, fontSize: 20 }}>Recomendação</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.text}>
              Recomendação: { recomendation.recomendation }
            </Text>
          </View>
        </>
      )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20
  },
  text: {
    fontSize: 16,
    color: '#2c2c2c',
    fontWeight: '800'
  },
  row: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  card: {
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  image: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
})
