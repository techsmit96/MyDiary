import * as React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Utils} from '../../utils/utils';
import ImageList from '../ImageList';
import ImageCropPicker from 'react-native-image-crop-picker';

export interface Props {
  isVisible: boolean;
  onDismiss: any;
  images: any[];
  onImageSelect: any;
  onImageDelete: any;
}
// const data = [
//   Utils.images.DIARY_THUMBNAIL,
//   Utils.images.DIARY_THUMBNAIL,
//   Utils.images.DIARY_THUMBNAIL,
//   Utils.images.DIARY_THUMBNAIL,
// ];
// const selectImage = () => {
//   ImageCropPicker.openPicker({
//     multiple: true,
//   })
//     .then((data) => {
//       (console as any).tron.log(data);
//     })
//     .catch((err) => {
//       (console as any).tron.log(err);
//     });
// };

const ImageGallery = (props: Props) => {
  return (
    <ReactNativeModal
      isVisible={props.isVisible}
      onBackButtonPress={props.onDismiss}
      onDismiss={props.onDismiss}
      onBackdropPress={props.onDismiss}>
      <View style={styles.container}>
        <TouchableOpacity onPress={props.onImageSelect}>
          <Image style={styles.image} source={Utils.images.ADD_IMAGE} />
        </TouchableOpacity>
        <ImageList onImageDelete={props.onImageDelete} images={props.images} />
      </View>
    </ReactNativeModal>
  );
};
const styles = StyleSheet.create({
  container: {
    height: hp('40%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {height: hp('20%'), width: wp('80%')},
});

ImageGallery.defaultProps = {};

export default ImageGallery;
