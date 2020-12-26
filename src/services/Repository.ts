import {DiaryItem} from '../models/DiaryItem';
import {DiaryAction} from '../redux/actions/DiaryActions';
import {Api} from './Api';

// all that worked after authrepository
export class Repository {
  static getDiaryItems(
    status: {loading: boolean; loaded: boolean},
    force = false,
  ) {
    return async (dispatch) => {
      try {
        if ((!status.loaded && !status.loading) || force) {
          dispatch(DiaryAction.DiaryListRequestAction());
          //const diaryItems: DiaryItem[] = await Api.getDiaryItems(); //when we use real api called not in firebase
          const data = await Api.getDiaryItems(); //when we firebase
          console.log(data);

          const diaryItems: DiaryItem[] = [];
          for (let key in data) {
            diaryItems.push({...data[key], id: key}); // we put key to data and get inside data and save key in id field
          }
          console.log(diaryItems);
          dispatch(DiaryAction.DiaryListSuccessAction(diaryItems));
        } else {
          return;
        }
      } catch (e) {
        dispatch(DiaryAction.DiaryErrorOccured());
        return Promise.reject(e);
      }
    };
  }
  /* this part when we not connected with firebase an dwe called real api
  static addDiaryItem(data: DiaryItem) {
    return async (dispatch) => {
      try {
        const diaryItem = await Api.addDiaryItem(data);
        dispatch(DiaryAction.AddDiaryItemAction(diaryItem));
        return diaryItem;
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
  */
  //this is for firebase
  static addDiaryItem(data: DiaryItem) {
    return async (dispatch) => {
      try {
        const id = await Api.addDiaryItem(data); // this is an ajeeb si id when see json part firebase token
        const diaryItem = {...data, id: id};
        dispatch(DiaryAction.AddDiaryItemAction(diaryItem));
        return diaryItem;
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
  static updateDiaryItem(data: DiaryItem) {
    return async (dispatch) => {
      try {
        const updatedData = {
          subject: data.subject,
          description: data.description,
          timeStamp: data.timeStamp,
          images: data.images,
        };
        const response = await Api.updateDiaryItem(updatedData, data.id);
        console.log(response);
        const diaryItem = {...response, id: data.id};
        dispatch(DiaryAction.UpdateDiaryItemAction(diaryItem));
        return response;
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
  static deleteDiaryItem(id) {
    return async (dispatch) => {
      try {
        const data = await Api.deleteDiaryItem(id);
        dispatch(DiaryAction.DeleteDiaryItemAction(id));
        return data;
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
}
