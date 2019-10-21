import React from 'react';

import { View } from 'react-native';

import DropdownAlert from 'react-native-dropdownalert';

const Error = ({ getAlertRef }) => (
  <View>
    <DropdownAlert ref={ref => getAlertRef(ref)} />
  </View>
)

export default Error;
