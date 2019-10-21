import React, { useState, useEffect, useRef } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';


import Feather from 'react-native-vector-icons/Feather'

import { Input } from '../../Auth/AuthStyle'

import { Button } from '../../Home/HomeStyle'

import api from '../../../../server/api'

import { DotIndicator } from 'react-native-indicators'

import { Formik } from 'formik';
import * as yup from 'yup';

const SignInSchemma = yup.object().shape({
  name: yup.string()
    .required('Nome obrigatório'),
  useMode: yup.string()
    .required('Modo de uso obrigatório'),
  period: yup.string()
    .required('Periodo obrigatóro'),
  dosage: yup.string()
    .required('Dosagem obrigatória'),
})

export function drugsOptions({ navigate }) {
  return {
    title: 'Medicação',
    headerTintColor: '#f2f2f7',
      headerStyle: {
        backgroundColor: '#215583'
      },
      headerTitleStyle: {
        color: '#f2f2f7',
      },
  }
}

function Drugs(props) {

  const [anamnese, setAnamnese] = useState([])
  const [name, setName] = useState('')
  const [useMode, setUseMode] = useState('')
  const [period, setPeriod] = useState('')
  const [dosage, setDosage] = useState('')
  const [sendLoad, setSendLoad] = useState(false)

  const useModeRef = useRef()
  const periodRef = useRef()
  const dosageRef = useRef()

  useEffect(() => {
    setAnamnese(props.navigation.getParam('anamnese'))
  }, [])

  async function saveHandler(values) {
    try {
      setSendLoad(true)
      const save = await api.post('/drugs', {
        name: values.name,
        useMode: values.useMode,
        period: values.period,
        dosage: values.dosage,
        anamneseId: anamnese._id
      })

      setName('')
      setUseMode('')
      setPeriod('')
      setDosage('')

      setSendLoad(false)
      props.navigation.state.params.onGoBack();
      props.navigation.goBack();
    } catch(error) {
      setSendLoad(false)
      console.log(error.response)
    }
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.wrapper}>
          <View style={styles.banner}>
            <ImageBackground style={styles.imageBanner} source={require('../../../../assets/images/medicine-background.png')} />
          </View>

          <Formik
            initialValues={{ name: '', useMode: '', period: '', dosage: '' }}
            onSubmit={values => saveHandler(values)}
            validationSchema={SignInSchemma}
            style={styles.wrapper}
          >
            {({ handleSubmit, handleBlur, handleChange, values, errors, touched}) => (
              <>
                <View style={styles.row}>
                  <Image source={require('../../../../assets/images/medicine.png')} style={styles.image} /> 
                  <Text color="#2c2c2c" size="20px">Quais remédios o paciente{'\n'}deve comprar?</Text>
                </View>

                <View style={{...styles.row, marginBottom: 0}}>
                  <Text color="#2c2c2c" size="18px" style={{ alignSelf: 'flex-start'}}>Nome do remédio</Text>
                  <View style={styles.inputRow}>
                    <Input
                      placeholder="ex: Loratadina"
                      onChangeText={handleChange('name')}
                      value={values.name}
                      returnKeyType="next"
                      onEndEditing={() => useModeRef.current.focus()}
                    />
                  </View>

                  <View style={{...styles.row, marginBottom: 0}}>
                    { errors.name && touched.name && (
                      <Text style={{...styles.text, color: "#e74c3c", marginBottom: 10}}>{errors.name}</Text>
                    )}
                  </View>
                </View>

                <View style={{...styles.row, marginBottom: 0}}>
                  <Text color="#2c2c2c" size="18px" style={{ alignSelf: 'flex-start'}}>Modo de uso do remédio</Text> 
                  <View style={styles.inputRow}>
                    <Input
                      placeholder="ex: Uso oral"
                      onChangeText={handleChange('useMode')}
                      value={values.useMode}
                      returnKeyType="next"
                      onEndEditing={() => periodRef.current.focus()}
                      ref={ref => useModeRef.current = ref}
                    />
                  </View>

                  <View style={{...styles.row, marginBottom: 0}}>
                    { errors.useMode && touched.useMode && (
                      <Text style={{...styles.text, color: "#e74c3c", marginBottom: 10}}>{errors.useMode}</Text>
                    )}
                  </View>
                </View>

                <View style={{...styles.row, marginBottom: 0}}>
                  <Text color="#2c2c2c" size="18px" style={{ alignSelf: 'flex-start'}}>Período de uso</Text>
                  <View style={styles.inputRow}>
                    <Input
                      placeholder="ex: De 8 em 8 horas"
                      onChangeText={handleChange('period')}
                      value={values.period}
                      returnKeyType="next"
                      onEndEditing={() => dosageRef.current.focus()}
                      ref={ref => periodRef.current = ref}
                    />
                  </View>

                  <View style={{...styles.row, marginBottom: 0}}>
                    { errors.period && touched.period && (
                      <Text style={{...styles.text, color: "#e74c3c", marginBottom: 10}}>{errors.period}</Text>
                    )}
                  </View>
                </View>

                <View style={{...styles.row, marginBottom: 0}}>
                  <Text color="#2c2c2c" size="18px" style={{ alignSelf: 'flex-start'}}>Dosagem</Text>
                  <View style={styles.inputRow}>
                    <Input
                      placeholder="ex: 300g"
                      onChangeText={handleChange('dosage')}
                      value={values.dosage}
                      returnKeyType="send"
                      onEndEditing={() => handleSubmit()}
                      ref={ref => dosageRef.current = ref}
                    />
                  </View>

                  <View style={{...styles.row, marginBottom: 0}}>
                    { errors.dosage && touched.dosage && (
                      <Text style={{...styles.text, color: "#e74c3c", marginBottom: 10}}>{errors.dosage}</Text>
                    )}
                  </View>
                </View>

                <View style={{...styles.row, width: '80%', alignItems: 'center', flexDirection: 'column'}}>
                  <Button onPress={() => handleSubmit()}>
                    { sendLoad ? (
                      <DotIndicator count={3} color='white' size={8} />
                    ) : (
                      <Text style={{color: '#f2f2f7', fontSize: 16 }}>Salvar Medicamento</Text>
                    )}
                  </Button>
                </View>
              </>
            )}
          </Formik>          
      </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 140,
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 30,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  banner: {
    width: '100%',
    height: '20%',
    backgroundColor: "#215583",
    padding: 0,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  imageBanner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: 20,
    backgroundColor: '#f2f2f7',
    borderRadius: 30,
    borderBottomColor: '#f2f2f7',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#216583',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    alignSelf: "flex-start",
    color: '#2c2c2c',
    fontSize: 16
  }
})

export default Drugs;