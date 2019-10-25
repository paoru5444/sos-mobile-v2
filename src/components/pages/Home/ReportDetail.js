import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import api from '../../../server/api'

export function reportDetailNavigation() {
  return {
    title: 'Detalhes',
    headerTitleStyle: {
      color: '#f2f2f7',
      fontWeight: 'bold',
    },
    headerStyle: {
      backgroundColor: '#1d829b',
    },
    headerTintColor: '#f2f2f7',
  }
}

export default function ReportDetail(props) {
  const [alimentations, setAlimentation] = useState([])
  const [drugs, setDrugs] = useState([])
  const [recomendation, setRecomendation] = useState({recomendation: ''})
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
    } catch(error) {
      console.log(error.response.data)
    }
  }

  async function getDrugs(){
    try {
      const anamneseId = props.navigation.getParam('anamneseId')
      const response = await api.get(`/drugs/${anamneseId}`)
      setDrugs(response.data)
    } catch(error) {
      console.log(error.response.data)
    }
  }

  async function getRecomendation(){
    try {
      const anamneseId = props.navigation.getParam('anamneseId')
      const response = await api.get(`/recomendation/${anamneseId}`)
      console.log('recomendation', response.data['0'])
      setRecomendation(response.data['0'])
    } catch(error) {
      console.log(error.response.data)
    }
  }

  async function submitAnamnese(route) {
    const anamneseId = props.navigation.getParam('anamneseId')
    try {
      const response = await api.put('/anamnese/' + anamneseId, {
        ...anamnese,
        hasRecomendation: 1,
      })
      props.navigation.navigate('Doctor', { anamnese: response.data })
    } catch(error) {
      console.log(error.response)
    }
  }

  async function deleteAnamnese() {
    const anamneseId = props.navigation.getParam('anamneseId')
    try {
      const response = await api.delete('/anamnese/' + anamneseId)
      props.navigation.navigate('Reports')
    } catch(error) {
      console.log(error.response)
    }
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>

        <View style={styles.row}>
          <Text style={{...styles.text, fontSize: 22}}>
            Informações da Queixa
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.text}>Queixas: { anamnese.queixas.join(', ')  || "Queixas não cadastradas"}</Text>
          <Text style={styles.text}>Duração: { anamnese.duracao } Dias</Text>
          <Text style={styles.text}>Frequência: { anamnese.frequencia } em { anamnese.frequencia } Dias</Text>
          <Text style={styles.text}>Intensidade: { anamnese.intensidade }</Text>
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
                <Text style={styles.text}>Observações: { alimentation.description }</Text>
              </View>
            ))}
          </>
        )}
        
        { recomendation.recomendation !== "" && (
          <View>
            <View style={styles.row}>
              <Image source={require('../../../assets/images/clipboard.png')} style={styles.image} /> 
              <Text style={{...styles.text, fontSize: 20 }}>Recomendação</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.text}>
                Recomendação: { recomendation.recomendation }
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.row} onPress={() => submitAnamnese('Doctor')}>
          <Image source={require('../../../assets/images/doctor.png')} style={styles.image} />
          <Text color="#2c2c2c">Sou médico quero recomendar.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => deleteAnamnese('Doctor')}>
          <Image source={require('../../../assets/images/delete.png')} style={styles.image} />
          <Text color="#2c2c2c">Deletar queixa.</Text>
        </TouchableOpacity>
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
