import React, { useState, useEffect } from 'react';

import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import SideMenu from 'react-native-side-menu';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather'

import AsyncStorage from '@react-native-community/async-storage'

import { useNavigation } from 'react-navigation-hooks';

function ChildrenMenu(props) {
    const { navigate } = useNavigation()

    logout = async () => {
      await AsyncStorage.removeItem('userToken')
      navigate('Auth')
    }

    return (
      <View style={styles.wrapper}>
        <LinearGradient colors={['#00EEB4', '#01CBC5', '#00A1D9']} style={styles.backgroundGradient}>
          <View style={{...styles.closeRow, height: '30%', backgroundColor: '#fff', marginBottom: 30}}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          </View>
        
          {/* <TouchableOpacity onPress={() => navigate("Perfil")} style={styles.row}>
            <Feather name="user" size={26} color="#fff" style={{marginRight: 10}} />
            <Text style={styles.text}>Perfil</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity onPress={() => logout()} style={styles.row}>
            <Feather name="book-open" size={26} color="#fff" style={{marginRight: 10}} />
            <Text style={styles.text}>Historico</Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => {
            navigate("Sobre")
          }} style={styles.row}>
            <Feather name="info" size={26} color="#fff" style={{marginRight: 10}} />
            <Text style={styles.text}>Sobre</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => logout()} style={styles.row}>
            <Feather name="power" size={26} color="#fff" style={{marginRight: 10}} />
            <Text style={styles.text}>Sair</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

export default ({ openMenu, menuHandle, navigation, userVictim }) => (
  <ChildrenMenu menuHandle={menuHandle} navigation={navigation} />
)

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  row: {
    width: '100%',
    height: 50,
    marginLeft: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
  },
  closeRow: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    marginVertical: 10,
    color: '#eee',
    fontWeight: 'bold'
  },
})