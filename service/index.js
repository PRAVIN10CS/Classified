import React from 'react';
import axios from 'axios';
import Constants from './constant';

class Service {
  constructor() {
    let service = axios.create({
      baseURL: Constants.baseURL,
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    console.log(response);
    return response;
  }

  handleError = (error) => {
    console.log(error);
    return Promise.reject(error);
  };

  get(path, params = {}, config = {}) {
    return this.service.get(path, {
      params,
      ...config,
    });
  }

  patch(path, payload, callback) {
    return this.service
      .request({
        method: 'PATCH',
        url: path,
        responseType: 'json',
        data: payload,
      })
      .then((response) => callback(response.data, response.status));
  }

  post(path, payload, config = {}) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload,
      ...config,
    });
  }
}

export default new Service();
