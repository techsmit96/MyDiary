//responsibility - call actul request and show sutable error
import _axios, {AxiosRequestConfig} from 'axios';
import {ToastAndroid} from 'react-native';
import {getEnvVariable} from '../environment';
import {User} from '../models/user';
import {AsyncStorageService} from './AsyncStorage';
export class Http {
  private static getToken = async () => {
    const user: User = await AsyncStorageService.getUser(); //get Token from AsyncStorage file
    return user ? user.idToken : null;
  };

  private static axios = _axios.create({
    baseURL: getEnvVariable().base_api_url,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  static async get(url, config?: AxiosRequestConfig) {
    try {
      /*
      this part is used when real api is called this part not recommended with firebase
      const token = await Http.getToken(); // token are saved which is available
      const headers = token ? {Authorization: 'Bearer ' + token} : {}; // token is alive or not
      const updatedConfig = {
        ...config,
        headers: headers,
      };*/
      //this is for firebase
      const token = await Http.getToken(); // token are saved which is available
      const latestUrl = token
        ? url + '?auth=' + 'a7y3oLmIG0yTyfRXb4c3G2QjKOUvmt3xBOhmfwCP'
        : url;
      const response = await Http.axios.get(latestUrl, config); // now we send updatedconfig
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.log('Pj ki kahani' + e);
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  static async post(url, body?: object, config?: AxiosRequestConfig) {
    try {
      //this is for firebase
      const token = await Http.getToken(); // token are saved which is available
      const latestUrl = token ? url + '?auth=' + token : url;
      const response = await Http.axios.post(latestUrl, body, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  static async delete(url, config?: AxiosRequestConfig) {
    try {
      //this is for firebase
      const token = await Http.getToken(); // token are saved which is available
      const latestUrl = token ? url + '?auth=' + token : url;
      const response = await Http.axios.delete(latestUrl, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  static async patch(url, body?: object, config?: AxiosRequestConfig) {
    try {
      //this is for firebase
      const token = await Http.getToken(); // token are saved which is available
      const latestUrl = token
        ? url + '?auth=' + 'a7y3oLmIG0yTyfRXb4c3G2QjKOUvmt3xBOhmfwCP'
        : url;
      const response = await Http.axios.patch(latestUrl, body, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  private static handleErrors(error) {
    if (error.response) {
      if (error.response.state === 401 || error.response.state === 401) {
        //remove authentication details
        //set root to Login Page
      }
      const message = error.response.data.message;
      const errorMessage = message
        ? message
        : 'Something went Wrong. Please try Again';
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        'Something Went Wrong. Please Try Again',
        ToastAndroid.LONG,
      );
    }
  }
}
