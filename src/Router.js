import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack'
import AuthLoadingScreen from './components/pages/Auth/AuthLoadingScreen'

import SignInScreen from './components/pages/Auth/Login'
import ResetPasswordScreen from './components/pages/Auth/Reset'
import RegisterScreen from './components/pages/Auth/Register'

// import HomeScreen from './components/pages/Home/Reports'
import DeafScreen from './components/pages/Deaf/DeafScreen'
import Reports, { reportsNavigation } from './components/pages/Home/Reports'
import FimQueixa, { navigationOptions } from './components/pages/FimQueixa'
import ReportDetail, {reportDetailNavigation} from './components/pages/Home/ReportDetail'

// Doctor part
import DoctorScreen, { DoctorNavigationOptions } from './components/pages/Doctor/DoctorScreen'
import Alimentation, { alimentationOptions } from './components/pages/Doctor/Alimentation'
import Drugs, { drugsOptions } from './components/pages/Doctor/Drugs'

// Sobre
import Sobre, { sobreOptions } from './components/pages/Sobre'

// Perfil
import Perfil, { perfilOptions } from './components/pages/Perfil'

const AppStack = createStackNavigator({
  Reports: {
    screen: Reports,
    navigationOptions: reportsNavigation
  },
  ReportDetail: {
    screen: ReportDetail,
    navigationOptions: reportDetailNavigation,
  },
  Doctor: {
    screen: DoctorScreen,
    navigationOptions: DoctorNavigationOptions,
  },
  Deaf: DeafScreen,
  Alimentation: {
    screen: Alimentation,
    navigationOptions: alimentationOptions,
  },
  FimQueixa: {
    screen: FimQueixa,
    navigationOptions: navigationOptions
  },
  Sobre: {
    screen: Sobre,
    navigationOptions: sobreOptions,
  },
  Perfil: {
    screen: Perfil,
    navigationOptions: perfilOptions,
  },
  Drugs: {
    screen: Drugs,
    navigationOptions: drugsOptions
  }
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  Reset: ResetPasswordScreen,
  Register: RegisterScreen,
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));