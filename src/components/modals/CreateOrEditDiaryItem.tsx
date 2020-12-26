import * as React from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {TextInput} from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {DiaryItem} from '../../models/DiaryItem';
import CustomText from '../CustomText';
import Icon from '../Icon';

export interface Props {
  isVisible: boolean;
  onDismiss: any;
  onSave: any;
  diaryItem?: DiaryItem;
  onUpdate: any;
}

const CreateOrEditDiaryItem = (props: Props) => {
  const [subjectTextInput, updateSubjectTextInput] = React.useState('');
  const [descriptionTextInput, updateDescriptionTextInput] = React.useState('');
  const actions = [
    {
      text: props.diaryItem ? 'Update' : 'ADD',
      name: props.diaryItem ? 'update' : 'add',
      icon: <Icon name={'checkmark'} />,
      position: 1,
    },
  ];
  React.useEffect(() => {
    if (props.diaryItem) {
      updateDescriptionTextInput(props.diaryItem.description);
      updateSubjectTextInput(props.diaryItem.subject);
    } else {
      updateSubjectTextInput('');
      updateDescriptionTextInput('');
    }
  }, [props.diaryItem]);

  const onSaveOrUpdate = () => {
    if (subjectTextInput === '' && descriptionTextInput === '') {
      return ToastAndroid.show(
        'Subject and Description is Needed',
        ToastAndroid.LONG,
      );
    }
    const data = {
      id: props.diaryItem ? props.diaryItem.id : Math.random(),
      subject: subjectTextInput,
      description: descriptionTextInput,
    };
    if (props.diaryItem) {
      return props.onUpdate(data);
    }
    return props.onSave(data);
  };
  return (
    <ReactNativeModal
      style={{backgroundColor: 'white', margin: 0}}
      onDismiss={props.onDismiss}
      onBackButtonPress={props.onDismiss}
      isVisible={props.isVisible}>
      <View style={{flex: 1}}>
        <TextInput
          allowFontScaling={false}
          value={subjectTextInput}
          onChangeText={(val) => {
            updateSubjectTextInput(val);
          }}
          style={[styles.textInput, {borderBottomWidth: 1}]}
          placeholder={'Enter Subject'}
        />
        <TextInput
          allowFontScaling={false}
          value={descriptionTextInput}
          onChangeText={(val) => {
            updateDescriptionTextInput(val);
          }}
          multiline={true}
          scrollEnabled={true}
          style={styles.textInput}
          placeholder={'Start Writing Your Diary'}
        />
      </View>
      <FloatingAction actions={actions} onPressItem={onSaveOrUpdate} />
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: wp('100%'),
  },
});

CreateOrEditDiaryItem.defaultProps = {};

export default CreateOrEditDiaryItem;
