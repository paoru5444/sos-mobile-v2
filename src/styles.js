import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const { width, height } = Dimensions.get('screen')

export const Wrapper = styled.View`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  width: ${ width };
  height: ${height * (72 / 100)};
`

export const Footer = styled.View`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  height: ${height * (10 / 100)};
`

export const ViewRow = styled.View`
  flex-direction: row;
  alignItems: center;
  justify-content: ${props => props.justify || 'center'};
  flex-wrap: wrap;
  width: ${width - 50};
  height: auto;
  margin-top: 5px;
`

export const Button = styled.TouchableOpacity`
  width: ${ props =>  props.width || '100px'};
  height: ${ props =>  props.height || '45px'};;
  background-color: #024;
  align-items: center;
  justify-content: center;
  border-radius: ${ props => props.radius || '10px'};
`

export const Text = styled.Text`
  color:${props => props.color || "#333"};
  font-size: ${props => props.size || '16px'};
`

export const Card = styled.View`
  width: ${width - 10};
  height: ${height * (40 / 100)};
  box-shadow: 0 13px 21px rgba(242, 242, 247, 0.1);
  elevation: 2;
  align-items: center;
  justify-content: center;
`

export const TextInput = styled.TextInput`
  border-radius: 25px;
  width: ${ width - 50};
  flex-wrap: wrap;
  box-shadow: 0 13px 21px rgba(242,242,247, 0.1);
  elevation: 1;
`

export const WrapperHome = styled.ImageBackground`
  width: ${ width };
  height: ${height};
  align-items: center;
  justify-content: center;
`

export const CardHome = styled.TouchableHighlight`
  width: 200px;
  height: 250px;
  background-color: rgba(242, 242, 247, 0.3);
  justify-content: center;
  align-items: center;
  border-top-left-radius: 125px;
  border-bottom-left-radius: 125px;
  transform: ${props => props.rotate || 'rotate(0deg)'};
  box-shadow: 0 5px 5px rgba(242, 242, 247, 0.1);
  elevation: 0.5;
`

export const RowHome = styled.View`
  flex-direction: row;
  alignItems: center;
  justify-content: ${props => props.justify || 'center'};
  width: ${width};
  height: auto;
  margin-top: 5px;
`