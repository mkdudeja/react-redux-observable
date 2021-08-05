import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { Observable, Subscriber } from "rxjs";

import { setupProgressBar } from "../interceptors";

import { ErrorModel } from "../models";
import { IError } from "../interfaces";

setupProgressBar();

class NetworkService {
  private static _instance: NetworkService;

  private constructor() {}

  public static getInstance(): NetworkService {
    if (!NetworkService._instance) {
      NetworkService._instance = new NetworkService();
    }

    return NetworkService._instance;
  }

  get<T>(
    url: string,
    params: any = null,
    config: AxiosRequestConfig = {}
  ): Observable<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "GET";
    if (params !== null) {
      axiosConfig.params = params;
    }
    return this._getResponse<T>(axiosConfig);
  }

  post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Observable<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "POST";
    axiosConfig.data = data;
    return this._getResponse<T>(axiosConfig);
  }

  put<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Observable<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "PUT";
    axiosConfig.data = data;
    return this._getResponse<T>(axiosConfig);
  }

  delete<T>(
    url: string,
    params: any = null,
    config: AxiosRequestConfig = {}
  ): Observable<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "DELETE";
    if (params !== null) {
      axiosConfig.params = params;
    }
    return this._getResponse<T>(axiosConfig);
  }

  private _prepareRequest(
    url: string,
    config: AxiosRequestConfig
  ): AxiosRequestConfig {
    const token: string = null,
      axiosConfig: AxiosRequestConfig = Object.assign(
        {
          url: url,
          headers: {},
        } as AxiosRequestConfig,
        config
      );

    if (token !== null) {
      Object.assign(axiosConfig.headers, {
        Authorization: token,
      });
    }

    return axiosConfig;
  }

  private _getResponse<T>(config: AxiosRequestConfig): Observable<T> {
    return new Observable<T>((observer: Subscriber<T>) => {
      axios(config)
        .then((response: AxiosResponse<T>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((axiosError: AxiosError) => {
          // handle the response error
          const error: IError = this._parseError(axiosError);
          toast.error(error.message);
          observer.error(error);
        });
    });
  }

  private _parseError(error: AxiosError) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      return new ErrorModel(error.response.status, error.message);
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       */
      return new ErrorModel(null, error.message);
    } else {
      // Something happened in setting up the request and triggered an Error
      return new ErrorModel(null, error.message);
    }
  }
}

export const networkService = NetworkService.getInstance();
