import React from 'react';

import { View } from 'react-native';

import DropdownAlert from 'react-native-dropdownalert';

const Error = ({ getSuccessAlertRef }) => (
  <View>
    <DropdownAlert ref={ref => getSuccessAlertRef(ref)} />
  </View>
)

export default Error;
