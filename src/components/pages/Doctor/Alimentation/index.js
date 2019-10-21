import React, { useState, useEffect, useRef } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import api from '../../../../server/api'

import { Input } from '../../Auth/AuthStyle'

import { Button } from '../../Home/HomeStyle'

import { DotIndicator } from 'react-native-indicators'

import { Formik } from 'formik';
import * as yup from 'yup';

const SignInSchemma = yup.object().shape({
  name: yup.string()
    .required('Nome obrigatório'),
  foodType: yup.string()
    .required('Classificação obrigatória'),
})

export function alimentationOptions({ navigate }) {
  return {
    title: 'Alimentos',
    headerTintColor: '#f2f2f7',
      headerStyle: {
        backgroundColor: '#215583'
      },
      headerTitleStyle: {
        color: '#f2f2f7',
      },
  }
}

function Alimentation(props) {

  const [name, setName] = useState('')
  const [foodType, setFoodType] = useState('')
  const [anamnese, setAnamnese] = useState({})
  const [sendLoad, setSendLoad] = useState(false)

  const foodTypeRef = useRef()

  useEffect(() => {
    setAnamnese(props.navigation.getParam('anamnese'))
  }, [])

  async function saveHandler(values) {
    try {
      setSendLoad(true)
      const save = await api.post('/alimentation', {
        name: values.name,  foodType: values.foodType, anamneseId: anamnese._id
      })

      setName('')
      setFoodType('')

      setSendLoad(false)
      props.navigation.state.params.onGoBack();
      props.navigation.goBack();
    } catch(error) {
      setSendLoad(false)
      console.log(error)
    }
  }

  return (
    <KeyboardAvoidingView>
      <View style={styles.wrapper}>
      <View style={styles.banner}>
        <ImageBackground style={styles.imageBanner} source={require('../../../../assets/images/alimentation.png')}>
        </ImageBackground>
      </View>

      <View style={styles.row}>
        <Image source={require('../../../../assets/images/diet.png')} style={styles.image} /> 
        <Text color="#2c2c2c" size="20px">Selecione os alimentos{'\n'}que serão evitados.</Text>
      </View>

      <Formik
        initialValues={{ name: '', foodType: '' }}
        onSubmit={values => saveHandler(values)}
        validationSchema={SignInSchemma}
      >
        {({ handleSubmit, handleBlur, handleChange, values, errors, touched}) => (
          <>
            <View style={{...styles.row, marginBottom: 0}}>
              <Text style={{ alignSelf: 'flex-start', left: 10}}>Nome do alimento</Text>
              <View style={styles.inputRow}>
                <Input
                  placeholder="ex: Carne vermelha"
                  onChangeText={handleChange('name')}
                  value={values.name}
                  returnKeyType="next"
                  onEndEditing={() => foodTypeRef.current.focus()}
                />
              </View>

              <View style={{...styles.row, marginBottom: 0}}>
                { errors.name && touched.name && (
                  <Text style={{...styles.text, color: "#e74c3c", marginBottom: 10}}>{errors.name}</Text>
                )}
              </View>
            </View>

            <View style={{...styles.row, marginBottom: 0}}>
              <Text color="#2c2c2c" size="18px" style={{ alignSelf: 'flex-start', left: 10}}>Classificação do alimento</Text>
              <View style={styles.inputRow}>
                <Input
                  placeholder="ex: Vegetal"
                  onChangeText={handleChange('foodType')}
                  value={values.foodType}
                  returnKeyType="send"
                  onEndEditing={() => handleSubmit()}
                  ref={ref => foodTypeRef.current = ref}
                />
              </View>
              
              <View style={{...styles.row, marginBottom: 0}}>
                { errors.foodType && touched.foodType && (
                  <Text style={{...styles.text, color: "#e74c3c", marginBottom: 10}} color="#e74c3c">{errors.foodType}</Text>
                )}
              </View>
              
            </View>

            <View style={{...styles.row, width: '80%', alignItems: 'center', flexDirection: 'column'}}>
              <Button onPress={() => handleSubmit()}>
                { sendLoad ? (
                  <DotIndicator count={3} color='white' size={8} />
                ) : (
                  <Text style={{color: '#f2f2f7', fontSize: 16 }}>Salvar Alimentos</Text>
                )}
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
    </KeyboardAvoidingView>
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
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
    width: 60,
    height: 60,
    marginRight: 10,
  },
  imagePiramide: {
    width: 90,
    height: 90,
  },
  inputRow: {
    width: '95%',
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

export default Alimentation;