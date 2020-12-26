import moment from 'moment';
import * as React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Spacing} from '../styles/Global';
import {PrimaryTheme} from '../styles/Themes';
import CustomText from './CustomText';

export interface Props {
  timeStamp: Date;
  containerStyle?: ViewStyle | ViewStyle[];
}

const DateNTime = (props: Props) => {
  return (
    <View
      style={[
        {marginBottom: Spacing.extraLarge.marginBottom},
        props.containerStyle,
      ]}>
      <CustomText style={styles.dateNTimeText}>
        {moment(props.timeStamp).format('MMMM DD , YYYY - ddd')}
      </CustomText>
      <CustomText style={styles.dateNTimeText}>
        {moment(props.timeStamp).format('h:mm  a')}
      </CustomText>
    </View>
  );
};

DateNTime.defaultProps = {};

const styles = StyleSheet.create({
  dateNTimeText: {color: PrimaryTheme.$DARK_PRIMARY_COLOR, fontWeight: 'bold'},
});

export default DateNTime;
