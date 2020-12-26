import {DiaryItem} from '../../models/DiaryItem';
import {DiaryActionTypes} from '../actions/DiaryActions';
import {UserActionTypes} from '../actions/UserActions';

export interface DiaryReducerState {
  diaryItems: DiaryItem[];
  loading: boolean;
  loaded: boolean;
}

const initialState: DiaryReducerState = {
  diaryItems: [],
  loading: false,
  loaded: false,
};

export const DiaryReducer = (
  state = initialState,
  action,
): DiaryReducerState => {
  switch (action.type) {
    case DiaryActionTypes.REQUEST_DIARY_LIST: {
      return {...state, loading: true};
    }
    case DiaryActionTypes.DIARY_LIST_SUCCESS: {
      return {
        ...state,
        diaryItems: action.payload,
        loading: false,
        loaded: true,
      };
    }
    case DiaryActionTypes.DIARY_ERROR: {
      return {...initialState}; //when fetch data then is used otherwise not
    }

    case DiaryActionTypes.ADD_DIARY_ITEM: {
      const diaryItems = state.diaryItems.concat(action.payload);
      return {...state, diaryItems: diaryItems}; //or you can type {...state,diaryItems}
      break;
    }
    case DiaryActionTypes.UPDATE_DIARY_ITEM: {
      const filteredItems = state.diaryItems.filter(
        (data) => data.id !== action.payload.id,
      );
      filteredItems.push(action.payload);
      return {...state, diaryItems: filteredItems}; //or you can type {...state, diaryItems: diaryItems}
      break;
    }
    case DiaryActionTypes.DELETE_DIARY_ITEM: {
      const diaryItems = state.diaryItems;
      const filteredItems = diaryItems.filter(
        (data) => data.id !== action.payload,
      );
      return {...state, diaryItems: filteredItems};
      break;
    }
    case UserActionTypes.USER_LOGOUT: {
      return {...initialState};
    }
    default: {
      return state;
    }
  }
};
