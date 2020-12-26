import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Container from '../components/Container';
import CustomText from '../components/CustomText';
import DiaryList from '../components/DiaryList';
import If from '../components/If';
import {Spacing} from '../styles/Global';
import {FloatingAction} from 'react-native-floating-action';
import Icon from '../components/Icon';
import ReactNativeModal from 'react-native-modal';
// import CreateOrEditDiaryItem from '../components/modals/CreateOrEditDiaryItem';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import {DiaryItem} from '../models/DiaryItem';
import {ScreenNames} from '../utils/navigations/Routes';
import Reactotron from 'reactotron-react-native';
import {connect} from 'react-redux';
import {DiaryAction} from '../redux/actions/DiaryActions';
import {RootReducerState} from '../redux/reducers';
import {Repository} from '../services/Repository';
import Error from '../components/Error';
import CustomButton from '../components/CustomButton';
import {AuthRepository} from '../services/AuthRepository';

interface Props {
  route: any;
  navigation: any;
  diaryItems: DiaryItem[];
  onDelete: any;
  getDiaryItems: any;
  diaryItemsLoading: boolean;
  diaryItemsLoaded: boolean;
  logout: any;
}

interface State {
  // diaryItems: DiaryItem[];
  // isModalVisible: boolean; //modal part
  selectedItem: DiaryItem;
  error: boolean;
  refreshing: boolean;
}

enum ActionTypes {
  View = 0,
  Edit = 1,
  Delete = 2,
  Cancel = 3,
}

class Dashboard extends React.Component<Props, State> {
  private actionSheetRef: any;
  constructor(props) {
    super(props);
    this.state = {
      // diaryItems: [
      //   {
      //     id: 0,
      //     subject: 'my subject 1',
      //     date: '28 March, 2020 - Sat',
      //     time: '3:12 am',
      //     description:
      //       'Today was one of my best day of life.Today was one of my best day of life.',
      //   },
      //   {
      //     id: 1,
      //     subject: 'my subject 2',
      //     date: '28 March, 2020 - Sat',
      //     time: '3:12 am',
      //     description:
      //       'Today was one of my best day of life.Today was one of my best day of life.Today was one of my best day of life.Today was one of my best day of life.',
      //   },
      // ],
      // isModalVisible: false, //modal part
      selectedItem: null,
      error: false,
      refreshing: false,
    };
  }
  async componentDidMount() {
    await this.fetchData();
  }
  async fetchData(force = false) {
    try {
      await this.props.getDiaryItems(
        {
          loading: this.props.diaryItemsLoading,
          loaded: this.props.diaryItemsLoaded,
        },
        force,
      );
    } catch (e) {
      this.setState({error: true, refreshing: false});
    }
  }

  onError = async () => {
    this.setState({error: false});
    await this.fetchData(true); //agar loading hote samay error aa gaya to loading false ho jayegi tab hame forcefully api call karni hi karni hain
  };

  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.fetchData(true);
    this.setState({refreshing: false});
  };

  actions = [
    {
      text: 'ADD',
      name: 'add',
      icon: <Icon name={'add'} />,
      position: 1,
    },
  ];

  // addItem = (val) => { //modal part
  //   const diaryItems = this.state.diaryItems;
  //   diaryItems.push(val);
  //   this.setState({
  //     diaryItems, //diaryItems:diaryItems
  //     // isModalVisible: false,
  //   });
  // };
  // updateItem = (val) => { //modal part
  //   const filteredItems = this.deleteItemAndGetItems(val);
  //   filteredItems.push(val);
  //   this.setState({
  //     diaryItems: filteredItems,
  //     // isModalVisible: false,
  //     selectedItem: null,
  //   });
  // };

  handleActionButton = (index) => {
    switch (index) {
      case ActionTypes.Cancel: {
        this.setState({selectedItem: null});
        break;
      }
      case ActionTypes.Edit: {
        // this.setState({isModalVisible: true}); //modal part
        this.onAddOrUpdate();
        break;
      }
      case ActionTypes.View: {
        this.onView();
        break;
      }
      case ActionTypes.Delete: {
        this.onDelete();
      }
    }
  };

  onView() {
    this.props.navigation.navigate(ScreenNames.VIEW_DIARY_ITEM, {
      diaryItem: this.state.selectedItem,
    });
    this.setState({selectedItem: null});
  }

  onAddOrUpdate() {
    this.props.navigation.navigate(ScreenNames.EDIT_ADD_DIARY_ITEM, {
      diaryItem: this.state.selectedItem,
    });
    this.setState({selectedItem: null});
  }

  onDelete() {
    // const filteredItems = this.deleteItemAndGetItems(this.state.selectedItem);
    // this.setState({diaryItems: filteredItems, selectedItem: null});
    this.props.onDelete(this.state.selectedItem.id);
    this.setState({selectedItem: null});
  }

  onLogout = () => {
    this.props.logout();
  };
  // deleteItemAndGetItems(item): DiaryItem[] {
  //   const diaryItems = this.state.diaryItems;
  //   return diaryItems.filter((data) => data.id !== item.id);
  // }

  render() {
    return (
      <Container
        containerStyles={{
          justifyContent: 'flex-start',
        }}>
        <If show={this.props.diaryItemsLoading}>
          <ActivityIndicator size={'large'} color="#0000ff" />
        </If>
        <If show={this.state.error}>
          <Error onPress={this.onError} />
        </If>
        <If show={!!this.props.diaryItems.length}>
          <DiaryList
            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            onPress={(val) => {
              this.setState({selectedItem: val});
              this.actionSheetRef.show();
            }}
            diaryItems={this.props.diaryItems}
          />
          <CustomButton onPress={this.onLogout} title={'Logout'} />
        </If>
        {/* diaryitesm loaded hone kebaad khali hain to ye text dikhna chahiye*/}
        <If show={!this.props.diaryItems.length && this.props.diaryItemsLoaded}>
          <CustomText style={{width: wp('95%'), textAlign: 'center'}}>
            Currently, No Item is added. Please Start Adding Items
          </CustomText>
        </If>
        <FloatingAction
          actions={this.actions}
          onPressItem={(name) => {
            // this.setState({isModalVisible: true}); // modal part
            this.onAddOrUpdate();
          }}
        />
        <ActionSheet
          ref={(ref) => (this.actionSheetRef = ref)}
          title={
            <CustomText style={{color: '#000', fontSize: 18}}>
              Which one do you like?
            </CustomText>
          }
          options={['View', 'Edit', 'Delete', 'Cancel']}
          cancelButtonIndex={3}
          destructiveButtonIndex={2}
          onPress={this.handleActionButton}
        />
        {/* <CreateOrEditDiaryItem
          onUpdate={this.updateItem}
          diaryItem={this.state.selectedItem}
          onSave={this.addItem}
          isVisible={this.state.isModalVisible}
          onDismiss={() => {
            this.setState({isModalVisible: false, selectedItem: null});
          }}
        /> */}
      </Container>
    );
  }
}

const mapStateToProps = (state: RootReducerState) => ({
  diaryItems: state.diaryReducer.diaryItems, //means return shortcut code
  diaryItemsLoading: state.diaryReducer.loading,
  diaryItemsLoaded: state.diaryReducer.loaded,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (id) => dispatch(Repository.deleteDiaryItem(id)),
    getDiaryItems: (status, force) =>
      dispatch(Repository.getDiaryItems(status, force)),
    logout: () => dispatch(AuthRepository.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
