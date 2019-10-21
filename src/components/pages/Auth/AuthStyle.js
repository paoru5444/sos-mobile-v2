import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

// Componentes próprios baseados nos componentes react.
export const Text = styled.Text`
  font-size: 12px;
  align-self: center;
  color: ${props => props.color || "##2c2c2c"}
`

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`
export const Row = styled.View`
  width: 80%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 10px;
`

export const RowInput = styled.View`
  width: 80%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 10px;
  background-color: #f2f2f7;
  border-radius: 30px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
`

export const Input = styled.TextInput`
  width: 75%;
  height: 60px;
  align-items: center;
  justify-content: center;
`

export const Button = styled.TouchableHighlight`
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