import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme } from '@react-navigation/native';
import {scaleSize} from '../constants/Layout'

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={scaleSize(30)}
      style={{ marginBottom: scaleSize(-3) }}
      color={props.focused ? DarkTheme.colors.primary : DarkTheme.colors.text }
    />
  );
}
