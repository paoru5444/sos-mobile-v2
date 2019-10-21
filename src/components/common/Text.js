import styled from 'styled-components/native'

export const Text = styled.Text`
color: ${props => props.color || '#f2f2f7'};
font-size: ${props => props.size || '16px'};
`