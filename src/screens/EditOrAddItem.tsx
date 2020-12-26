import * as React from 'react';
import {View, StyleSheet, TextInput, ToastAndroid} from 'react-native';
import Container from '../components/Container';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FloatingAction} from 'react-native-floating-action';
import Icon from '../components/Icon';
import {DiaryItem} from '../models/DiaryItem';
import {DiaryAction} from '../redux/actions/DiaryActions';
import {connect} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DateNTime from '../components/DateNTime';
import ImageGallery from '../components/modals/ImageGallery';
import ImagePicker from 'react-native-image-crop-picker';
import {Repository} from '../services/Repository';
interface Props {
  route: {params: {diaryItem: DiaryItem}};
  onAdd: any;
  onUpdate: any;
  navigation: any;
}

interface State {
  subjectTextInput: string;
  descriptionTextInput: string;
  timeStamp: Date;
  isDateTimePickerVisible: boolean;
  isImageGalleryVisible: boolean;
  images: any[];
}

enum ActionTypes {
  DATE_PICKER = 'datePicker',
  ADD = 'add',
  IMAGE_PICKER = 'imagePicker',
}
class EditOrAddItem extends React.Component<Props, State> {
  private readonly diaryItem = this.props.route.params.diaryItem; //short name for whole path which is private
  constructor(props) {
    super(props);
    this.state = {
      subjectTextInput: this.diaryItem ? this.diaryItem.subject : '',
      descriptionTextInput: this.diaryItem ? this.diaryItem.description : '',
      timeStamp: this.diaryItem ? this.diaryItem.timeStamp : new Date(),
      isDateTimePickerVisible: false,
      isImageGalleryVisible: false,
      images: [],
    };
  }

  actions = [
    {
      text: this.diaryItem ? 'Update' : 'ADD',
      name: 'add',
      icon: <Icon name={'checkmark'} />,
      position: 1,
    },
    {
      text: 'Pick Date N Time',
      name: 'datePicker',
      icon: <Icon name={'calendar'} />,
      position: 2,
    },
    {
      text: 'Add Image',
      name: 'imagePicker',
      icon: <Icon name={'images'} />,
      position: 3,
    },
  ];
  updateSubjectTextInput = (val) => {
    this.setState({subjectTextInput: val});
  };
  updateDescriptionTextInput = (val) => {
    this.setState({descriptionTextInput: val});
  };

  onSaveOrUpdate = () => {
    if (this.diaryItem) {
      const data: DiaryItem = {
        ...this.diaryItem,
        images: this.state.images,
        description: this.state.descriptionTextInput,
        subject: this.state.subjectTextInput,
        timeStamp: this.state.timeStamp,
      };
      this.props.onUpdate(data); //this is passing data to a onUpdate()
      this.props.navigation.pop();
    } else {
      const data: DiaryItem = {
        images: this.state.images,
        subject: this.state.subjectTextInput,
        description: this.state.descriptionTextInput,
        timeStamp: this.state.timeStamp,
      };
      this.props.onAdd(data); //this is passing data to a onAdd()
      this.props.navigation.pop();
    }
  };

  dateTimePicked = (date) => {
    this.setState({timeStamp: date, isDateTimePickerVisible: false});
  };
  onActionPress = (val) => {
    switch (val) {
      case ActionTypes.ADD: {
        this.onSaveOrUpdate();
        break;
      }
      case ActionTypes.DATE_PICKER: {
        this.setState({isDateTimePickerVisible: true});
        break;
      }
      case ActionTypes.IMAGE_PICKER: {
        this.setState({isImageGalleryVisible: true});
        break;
      }
    }
  };
  onImageSelect = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        maxFiles: 10,
      });
      const imagePaths = images.map((data) => data.path);
      this.setState({images: this.state.images.concat(imagePaths)});
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    }
  };
  onImaggeDelete = (val) => {
    const filteredArray = this.state.images.filter((image) => image !== val);
    this.setState({images: filteredArray});
  };
  render() {
    return (
      <Container>
        <View style={{flex: 1}}>
          <TextInput
            allowFontScaling={false}
            value={this.state.subjectTextInput}
            onChangeText={this.updateSubjectTextInput}
            style={[styles.textInput, {borderBottomWidth: 1}]}
            placeholder={'Enter Subject'}
          />
          <DateNTime
            containerStyle={{padding: 10}}
            timeStamp={this.state.timeStamp}
          />
          <TextInput
            allowFontScaling={false}
            value={this.state.descriptionTextInput}
            onChangeText={this.updateDescriptionTextInput}
            multiline={true}
            scrollEnabled={true}
            style={styles.textInput}
            placeholder={'Start Writing Your Diary'}
          />
        </View>
        <FloatingAction
          actions={this.actions}
          onPressItem={this.onActionPress}
        />
        <DateTimePicker
          mode={'datetime'}
          is24Hour={false}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.dateTimePicked}
          onCancel={() => {
            this.setState({isDateTimePickerVisible: false});
          }}
        />
        <ImageGallery
          onImageDelete={this.onImaggeDelete}
          onImageSelect={this.onImageSelect}
          images={this.state.images}
          isVisible={this.state.isImageGalleryVisible}
          onDismiss={() => this.setState({isImageGalleryVisible: false})}
        />
      </Container>
    );
  }

  componentDidMount(): void {}
}
const styles = StyleSheet.create({
  textInput: {
    width: wp('100%'),
  },
});

const dispatchToProps = (dispatch) => {
  return {
    onAdd: (diaryItem: DiaryItem) =>
      dispatch(Repository.addDiaryItem(diaryItem)),
    onUpdate: (diaryItem: DiaryItem) =>
      dispatch(Repository.updateDiaryItem(diaryItem)),
  };
};
export default connect(null, dispatchToProps)(EditOrAddItem);
