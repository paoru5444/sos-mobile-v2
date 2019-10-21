import React, { Component } from 'react'
import { Image } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

import { Formik } from 'formik';
import * as yup from 'yup';

import { 
  Text,
} from './AuthStyle'

import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native'

import Icon from 'react-native-vector-icons/Feather'

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`
const Row = styled.View`
  width: 85%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 10px;
`

const RowInput = styled.View`
  width: 85%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 10px;
  background-color: #f2f2f7;
  border-radius: 30px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  elevation: 1;
`

const Input = styled.TextInput`
  width: 80%;
  height: 60px;
  align-items: center;
  justify-content: center;
`

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color:${props => props.transparent || '#216583'};
  border-color: ${props => props.outlined || 'transparent'}
  border-width: ${props => props.border || 0}
  border-radius: 30px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  elevation: 1;
`


// Esquema de validação definido com mensagens
const ResetPasswordShemma = yup.object().shape({
  email: yup.string()
    .email('Parece que esse email não é válido, tente outro!')
    .required('O preenchimento do campo email é obrigatório.')
})

class ResetPasswordScreen extends Component {
    constructor(props)  {
      super(props)
    }

    static navigationOptions = {
      header: null
    };


    goTo(route = "") {
        this.props.navigation.navigate(route)
    }

    resetAsync = async (values) => {
        console.warn('values', values)
        // await AsyncStorage.setItem('userToken', 'abc');
        // this.props.navigation.navigate('App');
    };

    render() {
      return (
        <Wrapper>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={values => this.resetAsync(values)}
            validationSchema={ResetPasswordShemma}
          >
            {({ handleSubmit, handleBlur, handleChange, values, errors, touched}) => (
              <LinearGradient colors={['#216583', '#217e83']} angle={-225}  style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/images/Home/logo.png')} style={{ resizeMode: 'contain', width: 200, height: 200, elevation: 4, }} />
                
                <Row>
                  <Text color="#f2f2f7">Digite seu email para sabermos que é você.</Text>
                </Row>

                <RowInput>
                  <Icon name="mail" size={24} color="#BDBDBD" />
                  <Input
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="sos@libras.com.br"
                  />
                </RowInput>

                <Row>
                  { errors.email && touched.email && (
                    <Text color="#e74c3c">{errors.email}</Text>
                  )}
                </Row>
                
                <Row>
                  <Button onPress={handleSubmit}>
                    <Text color="#f2f2f7">Recuperar Senha</Text>
                  </Button>
                </Row>
              </LinearGradient>
            )}
          </Formik>
        </Wrapper>
      );
    }
}

export default ResetPasswordScreen;