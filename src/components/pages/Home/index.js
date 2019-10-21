import React, { Component, Fragment } from 'react'
import {
  View, Image, TouchableHighlight
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

// Componentes
import { Button, ButtonOutlined } from '../../common/Button'
import { Text } from '../../common/Text'

import SuccessAlert from '../../common/Alerts/Success'

import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native'

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const Row = styled.View`
  width: 70%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
`

class HomeScreen extends Component {
    async componentDidMount() {
      this.setState({
        userToken: await AsyncStorage.getItem('userToken')
      })
    }

    constructor(props)  {
      super(props)

      this.successAlert = React.createRef()
      this.getSuccessAlertRef = this.getSuccessAlertRef.bind(this)
    }

    static navigationOptions = {
      title: 'Seja Bem vindo ao SOS Libras',
      header: null
    };

    state = {}

    goTo = (route = "") => {
      this.props.navigation.navigate(route)
    }

    logout = async () => {
      this.successAlert.alertWithType('success', 'Você deslogou do sistema', '', setTimeout(() => {AsyncStorage.removeItem('userToken')}, 1000))
      this.setState({ userToken: '' })
    }
  
    getSuccessAlertRef = (ref) => { this.successAlert = ref }

    render() {
      const { userToken } = this.state;

      return (
        <>
          <SuccessAlert getSuccessAlertRef={this.getSuccessAlertRef} />

          <Wrapper source={require('../../../assets/images/Home/fundo.jpg')}>
            <LinearGradient colors={['#216583', '#217e83']} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../../assets/images/Home/logo.png')} style={{ resizeMode: 'contain', width: 300, height: 300, }} />
              <Row>
                <Button background="#3F51B5" onPress={() => this.goTo('Deaf')}>
                  <Text>{!userToken ? 'Usar sem cadastrar' : 'Atendimento'}</Text>
                </Button>
              </Row>

              <Row>
                <ButtonOutlined onPress={() => !userToken ? this.goTo('Auth') : this.logout()}>
                  <Text color="">{!userToken ? 'Login' : 'Sair'}</Text>
                </ButtonOutlined>
              </Row>
            </LinearGradient>
          </Wrapper>
        </>
      );
    }
  
    _showMoreApp = () => {
      this.props.navigation.navigate('Other');
    };
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
}

export default HomeScreen;