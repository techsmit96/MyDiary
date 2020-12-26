import * as React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import CustomText from './CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Utils} from '../utils/utils';
import {PrimaryTheme} from '../styles/Themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Spacing} from '../styles/Global';
import {DiaryItem as diaryItem} from '../models/DiaryItem';
import moment from 'moment';
import DateNTime from './DateNTime';

export interface Props {
  diaryItem: diaryItem;
  onPress: any;
}
const DiaryItem = (props: Props) => {
  const [imageExist, updateImageExist] = React.useState(true);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.6}
      style={{marginBottom: Spacing.regular.marginBottom, padding: 15}}>
      {/* date and time view (this is comment out code) */}
      <DateNTime timeStamp={props.diaryItem.timeStamp} />
      {/* row view (this is comment out code) */}
      <View style={{flexDirection: 'row'}}>
        {/* subject and description view (this is comment out code) */}
        <View
          style={{
            width: wp('70%'),
            marginRight: Spacing.extraLarge.marginRight,
          }}>
          <CustomText style={styles.subject}>
            {props.diaryItem.subject}
          </CustomText>
          <CustomText>{props.diaryItem.description}</CustomText>
        </View>
        <Image
          onError={() => updateImageExist(false)}
          style={{height: hp('10%'), width: wp('20%'), borderRadius: 5}}
          source={
            imageExist
              ? {uri: props.diaryItem.images ? props.diaryItem.images[0] : 'ahsvdgha'}
              : Utils.images.DIARY_THUMBNAIL
          }
        />
      </View>
    </TouchableOpacity>
  );
};
DiaryItem.defaultProps = {};

const styles = StyleSheet.create({
  subject: {color: PrimaryTheme.$ACCENT_COLOR, fontWeight: 'bold'},
});
export default DiaryItem;
