import {DiaryItem} from '../../models/DiaryItem';

export enum DiaryActionTypes {
  ADD_DIARY_ITEM = 'Add Diary Item',
  UPDATE_DIARY_ITEM = 'Update Diary Item',
  DELETE_DIARY_ITEM = 'Delete Diary Item',
  REQUEST_DIARY_LIST = 'Request diary list',
  DIARY_LIST_SUCCESS = 'Success diary list',
  DIARY_ERROR = 'Diary Error Occured',
}

export class DiaryAction {
  static AddDiaryItemAction = (diaryItem: DiaryItem) => ({
    type: DiaryActionTypes.ADD_DIARY_ITEM,
    payload: diaryItem,
  });
  static UpdateDiaryItemAction = (diaryItem: DiaryItem) => ({
    type: DiaryActionTypes.UPDATE_DIARY_ITEM,
    payload: diaryItem,
  });
  static DeleteDiaryItemAction = (id: number) => {
    return {
      type: DiaryActionTypes.DELETE_DIARY_ITEM,
      payload: id,
    };
  };
  static DiaryListRequestAction = () => {
    return {
      type: DiaryActionTypes.REQUEST_DIARY_LIST,
    };
  };
  static DiaryListSuccessAction = (diaryList: DiaryItem[]) => {
    return {
      type: DiaryActionTypes.DIARY_LIST_SUCCESS,
      payload: diaryList,
    };
  };
  static DiaryErrorOccured = () => {
    return {
      type: DiaryActionTypes.DIARY_ERROR,
    };
  };
}
