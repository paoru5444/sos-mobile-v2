import React, { useState, useEffect, } from 'react';
import { Image, ScrollView, StyleSheet, Text,  TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native';

import { useNavigation } from 'react-navigation-hooks';

import api from '../../../server/api'

import LinearGradient from 'react-native-linear-gradient'

import { Fab } from '../../common/Fab'
import { Button } from '../../common/Button'
import { ReportCard } from '../../common/Card'

import Menu from '../../common/Menu'

import Feather from 'react-native-vector-icons/Feather'

export function reportsNavigation({ navigation }) {  
  const menuHandle = navigation.getParam('menu')
  const closeHandle = navigation.getParam('closeMenu')
  const openMenu = navigation.getParam('openMenu')

  return {
    title: 'Histórico de Exames',
    headerTitleStyle: {
      color: '#f2f2f7'
    },
    headerStyle: {
      backgroundColor: '#216583',
      elevation: 0
    },
    headerTintColor: '#f2f2f7',
    headerLeft: < TouchableWithoutFeedback style={{ padding: 20 }} onPress={() => {
      if(!openMenu) {
        menuHandle()
      } else {
        closeHandle()
      }
    }}>
                  <Feather name={!openMenu ? "menu" : "x"} size={30} color="#fff" style={{ paddingLeft: 20}} />
                </ TouchableWithoutFeedback>
  }
}

function Reports(props) {
  const [reports, setReport] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [noAnamnese, setNoAnamnese] = useState(false)

  const { navigate, setParams } = useNavigation()

  useEffect(() => {
    setParams({ menu: menuHandle, closeMenu: closeHandle, openMenu })
    getReports()
  }, [openMenu])

  useEffect(() => {
    getReports()
  }, [reports])

  async function getReports() {
    try {
      const anamnese = await api.get('/anamnese')
      setReport(anamnese.data)
      setNoAnamnese(anamnese.data.length)
    } catch(error) {
      console.log(error)
    }
  }

  function menuHandle() {
    setOpenMenu(true)
  }

  function closeHandle() {
    setOpenMenu(false)
  }


  return (
    <View style={styles.wrapper}>
      <LinearGradient colors={['#216583', '#217e83']} style={{width: '100%', height: '100%'}}>
      { reports && reports.length > 0 && (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          { reports.map((report, index) => (
              <TouchableOpacity style={styles.row} key={index} onPress={() => {
                navigate('ReportDetail', { anamneseId: report._id })
              }} >
                <Image source={require('../../../assets/images/man.png')} style={styles.imageCard}/>
                <ReportCard>
                  <Text>Queixa</Text>
                  <Text>{report.queixas.join(' e ') || "Nenhuma queixa cadastrada"}</Text>
                </ReportCard>
              </TouchableOpacity>
            ))}
        </ScrollView>
      )}

      { noAnamnese === 0 && (
        <View style={styles.view}>
          <Image source={require('../../../assets/images/no-complains.png')} style={styles.image} />
          <Button onPress={() => navigate('Deaf')} style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar Queixa</Text>
          </Button>
        </View>
      )}

      { Boolean(openMenu) === false && reports.length !== 0 &&
        <Fab onPress={() => navigate('Deaf')}>
          <Feather name="plus" size={26} color="#f2f2f7" />
        </Fab>  
      }

      { Boolean(openMenu) === true && (
        <Menu openMenu={openMenu} menuHandle={menuHandle} />
      )}
    </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 50,
  },
  imageCard: {
    width: 90,
    height: 90,
    resizeMode: 'contain'
  },
  view: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardView: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    color: '#f2f2f7'
  },
  buttonText: {
    color: '#f2f2f7'
  },
  button: {
    width: 300,
    bottom: 50,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Reports