import React, { Component, Fragment } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import { DotIndicator } from 'react-native-indicators'

import { Formik } from 'formik';
import * as yup from 'yup';

import { 
  Button, Input, Row, RowInput, Wrapper, 
} from './AuthStyle'

import ErrorAlert from '../../common/Alerts/Error'
import SuccessAlert from '../../common/Alerts/Success'

import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Feather'

import api from '../../../server/api';

// Esquema de validação definido com mensagens
const SignInSchemma = yup.object().shape({
  email: yup.string()
    .email('Parece que esse email não é válido, tente outro!')
    .required('Email obrigatório.'),
  password: yup.string()
    .required('*Senha obrigatória')
})

class SignInScreen extends Component {
    constructor(props)  {
      super(props)

      this.password = React.createRef()
      
      this.errorAlert = React.createRef()
      this.successAlert = React.createRef()
      
      this.getAlertRef = this.getAlertRef.bind(this)
      this.getSuccessAlertRef = this.getSuccessAlertRef.bind(this)
    }

    static navigationOptions = {
      header: null
    };

    state = {
      email: '',
      password: '',
      loginRequest: false,
    }

    getAlertRef = (ref) => { this.errorAlert = ref }
    getSuccessAlertRef = (ref) => { this.successAlert = ref }

    signIn = async (values) => {
      try {
        this.setState({ loginRequest: true })
        
        const response = await api.post('/authenticate', values)

        const token = response.data.token;

        await AsyncStorage.setItem('userToken', token);
        
        this.setState({ loginRequest: false })

        this.successAlert.alertWithType(
          'success',
          'Login realizado com sucesso',
          'Você será redirecionado para a tela inicial',
          setTimeout(() => {this.props.navigation.navigate('Reports')}, 3000)
        )
      } catch(error) {
        this.errorAlert.alertWithType('error', 'Erro de autenticação', error.response.data.error)
        
        this.setState({ loginRequest: false })
      }
    };

    goTo(route = '', params = {}) {
      this.props.navigation.navigate(route, params)
    }
  
    render() {
      const { loginRequest } = this.state
      return (
        <KeyboardAvoidingView>
          <ErrorAlert getAlertRef={this.getAlertRef} />
          <SuccessAlert getSuccessAlertRef={this.getSuccessAlertRef} />

          <Wrapper>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={values => this.signIn(values)}
              validationSchema={SignInSchemma}
            >
              {({ handleSubmit, handleBlur, handleChange, values, errors, touched}) => (
                <LinearGradient colors={['#00EEB4', '#01CBC5', '#00A1D9']} style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', }}>
                   <View style={{...styles.grid, height: '30%', backgroundColor: '#fff', marginBottom: 30}}>
                      <Image source={require('../../../assets/images/logo.png')} style={{ resizeMode: 'contain', width: 320, height: 250,}} />
                    </View>

                  <Text style={{...styles.text, alignSelf: 'center', width: '70%'}}>Usuário</Text>
                  <RowInput>
                    <Icon name="mail" size={24} color="#BDBDBD" />
                    <Input
                      onChangeText={handleChange('email')}
                      // onBlur={handleBlur('email')}
                      // onEndEditing={() => this.password.focus()}
                      returnKeyType="next"
                      value={values.email}
                      placeholder="sos@libras.com.br"
                      autoCapitalize='none'
                    />
                  </RowInput>

                  <Row style={{justifyContent: 'flex-start'}}>
                    { errors.email && touched.email && (
                      <Text style={{color: "#e57373", fontSize: 16, fontWeight: 'bold'}}>{errors.email}</Text>
                    )}
                  </Row>
                      
                  <Text style={{...styles.text, alignSelf: 'center', width: '70%'}}>Senha</Text>
                  <RowInput>
                    <Icon name="key" size={24} color="#BDBDBD" />
                    <Input
                      ref={password => this.password = password}
                      onChangeText={handleChange('password')}
                      // onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                      returnKeyType="send"
                      placeholder="********"
                      // onSubmitEditing={handleSubmit}
                    />
                  </RowInput>

                  <Row style={{justifyContent: 'flex-start'}}>
                    { errors.password && touched.password && (
                      <Text style={{color: "#e57373", fontSize: 16, fontWeight: 'bold'}}>{errors.password}</Text>
                    )}
                  </Row>

                  <Row>
                    <Button onPress={handleSubmit}>
                      { loginRequest ? (
                        <DotIndicator count={3} color='white' size={8} />
                      ) : (
                        <Text style={styles.text}>Entrar</Text>
                      )}
                    </Button>
                  </Row>

                  <Row style={{ marginTop: 20 }}>
                    <Button onPress={() => this.goTo('Register')} transparent="transparent" outlined="#f2f2f7" border="1px">
                      <Text style={styles.text}>Cadastre-se</Text>
                    </Button>
                  </Row>
                </LinearGradient>
              )}
            </Formik>
          </Wrapper>
        </KeyboardAvoidingView>
      );
    }
}

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: "#eee",
    fontWeight: 'bold',
    fontSize: 20,
  }
})

export default SignInScreen;