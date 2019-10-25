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
        <LinearGradient colors={['#00F0B3', '#1EC2E7']} style={styles.backgroundGradient}>
          <View style={styles.closeRow}>
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
    top: 80,
  },
  logo: {
    width: 150,
    height: 150,
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
    fontSize: 18,
    marginVertical: 10,
    color: '#f2f2f7'
  },
})