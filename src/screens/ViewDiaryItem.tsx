import * as React from 'react';
import {View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Container from '../components/Container';
import CustomText from '../components/CustomText';
import DateNTime from '../components/DateNTime';
import {Spacing} from '../styles/Global';
import {PrimaryTheme} from '../styles/Themes';
import Carousel from 'react-native-snap-carousel';
import {DiaryItem} from '../models/DiaryItem';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LightBox from 'react-native-lightbox';

interface Props {
  route: any;
  diaryItem: any;
}

interface State {}

class ViewDiaryItem extends React.Component<Props, State> {
  private readonly diaryItem: DiaryItem = this.props.route.params.diaryItem;
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderItem = (data) => {
    return (
      <LightBox>
        <Image
          style={{height: hp('35%'), width: wp('100%')}}
          source={{uri: data.item}}
        />
      </LightBox>
    );
  };
  render() {
    return (
      <Container
        containerStyles={{
          justifyContent: 'flex-start',
        }}>
        <View>
          <Carousel
            containerCustomStyle={{height: 'auto', alignSelf: 'center'}}
            autoplay={true}
            data={this.diaryItem.images}
            renderItem={this.renderItem}
            sliderWidth={wp('100%')}
            itemWidth={wp('100%')}
          />
          <View style={{padding: 10}}>
            <ScrollView>
              <DateNTime timeStamp={this.diaryItem.timeStamp} />
              <CustomText
                style={{
                  marginBottom: Spacing.large.marginBottom,
                  color: PrimaryTheme.$ACCENT_COLOR,
                }}>
                {this.diaryItem.subject}
              </CustomText>
              <CustomText>{this.diaryItem.description}</CustomText>
            </ScrollView>
          </View>
        </View>
      </Container>
    );
  }

  componentDidMount(): void {}
}

export default ViewDiaryItem;
