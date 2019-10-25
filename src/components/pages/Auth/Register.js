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
  name: yup.string()
    .required('*Campo Obrigatório.'),
  email: yup.string()
    .email('Parece que esse email não é válido, tente outro!')
    .required('*Email obrigatório.'),
  password: yup.string()
    .required('Senha obrigatória.')
})

class RegisterScreen extends Component {
    constructor(props)  {
      super(props)

      this.email = React.createRef()
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
      name: '',
      email: '',
      password: '',
      registerRequest: false,
    }

    goTo(route = "") {
      this.props.navigation.navigate(route)
    }
  
    register = async (values) => {
      try {
        this.setState({ registerRequest: true })

        const response = await api.post('/register', values)

        const token = response.data.token;

        await AsyncStorage.setItem('userToken', token);

        this.setState({ registerRequest: false })

        this.successAlert.alertWithType(
          'success',
          'Cadastro realizado com sucesso',
          'Você será redirecionado para a tela inicial',
          setTimeout(() => {this.props.navigation.navigate('App')}, 3000)
        )
      } catch(error) {
        this.errorAlert.alertWithType('error', 'Erro ao registrar!', error.response.data.error)

        this.setState({ registerRequest: false })
      }
    };

    getSuccessAlertRef = (ref) => { this.successAlert = ref }
    getAlertRef = (ref) => { this.errorAlert = ref }
  
    render() {
      const { registerRequest } = this.state
      return (
        <KeyboardAvoidingView>
          <SuccessAlert getSuccessAlertRef={this.getSuccessAlertRef} />
          <ErrorAlert getAlertRef={this.getAlertRef} />

          <Wrapper>
            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              onSubmit={values => this.register(values)}
              validationSchema={SignInSchemma}
            >
              {({ handleSubmit, handleBlur, handleChange, values, errors, touched}) => (
                <LinearGradient colors={['#00EEB4', '#01CBC5', '#00A1D9']} angle={-225}  style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <View style={{...styles.grid, height: '30%', backgroundColor: '#fff', marginBottom: 30}}>
                    <Image source={require('../../../assets/images/logo.png')} style={{ resizeMode: 'contain', width: 320, height: 250,}} />
                  </View>

                  <Text style={{...styles.text, alignSelf: 'center', width: '70%'}}>Usuário</Text>
                  <RowInput>
                    <Icon name="user" size={24} color="#BDBDBD" />
                    <Input
                      onChangeText={handleChange('name')}
                      // onBlur={handleBlur('name')}
                      value={values.name}
                      placeholder="seu nome"
                      returnKeyType="next"
                      // onEndEditing={() => this.email.focus()}
                    />
                  </RowInput>
                  <Row style={{justifyContent: 'flex-start'}}>
                    { errors.name && touched.name && (
                      <Text style={{color: "#e57373", fontSize: 16, fontWeight: 'bold'}}>{errors.name}</Text>
                    )}
                  </Row>

                  <Text style={{...styles.text, alignSelf: 'center', width: '70%'}}>Email</Text>
                  <RowInput>
                    <Icon name="mail" size={24} color="#BDBDBD" />
                    <Input
                      onChangeText={handleChange('email')}
                      // onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="sos@libras.com.br"
                      autoCapitalize='none'
                      returnKeyType="next"
                      // onEndEditing={() => this.password.focus()}
                      ref={email => this.email = email}
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
                      onChangeText={handleChange('password')}
                      // onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                      returnKeyType="send"
                      placeholder="********"
                      // onSubmitEditing={handleSubmit}
                      ref={password => this.password = password}
                    />
                  </RowInput>
                  <Row style={{justifyContent: 'flex-start'}}>
                    { errors.password && touched.password && (
                      <Text style={{color: "#e57373", fontSize: 16, fontWeight: 'bold'}}>{errors.password}</Text>
                    )}
                  </Row>

                  <Row>
                    <Button onPress={handleSubmit}>
                    { registerRequest ? (
                        <DotIndicator count={3} color='white' size={8} />
                      ) : (
                        <Text style={styles.text}>Finalizar Cadastro</Text>
                      )}
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

export default RegisterScreen;