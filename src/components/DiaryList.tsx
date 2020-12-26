import * as React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {DiaryItem as diaryItem} from '../models/DiaryItem';
import {Spacing} from '../styles/Global';
import DiaryItem from './DiaryItem';

export interface Props {
  diaryItems: diaryItem[];
  onPress: any;
  onRefresh: any;
  refreshing: boolean;
}
const DiaryList = (props: Props) => {
  return (
    <FlatList
      style={{marginTop: Spacing.extraLarge.marginTop}}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      data={props.diaryItems}
      extraData={props} //this is for extra add Diaryitem whole Flat list will be rerender
      refreshControl={
        <RefreshControl
          onRefresh={props.onRefresh}
          refreshing={props.refreshing}
        />
      }
      renderItem={(data) => {
        return (
          <DiaryItem
            onPress={() => props.onPress(data.item)}
            diaryItem={data.item}
          />
        );
      }}
    />
  );
};
DiaryList.defaultProps = {};
export default DiaryList;

// <>
// {props.diaryItems.map((diaryItem, index) => {
// return <DiaryItem diaryItem={diaryItem} index={index} key={index} />;
// })}
// </>
