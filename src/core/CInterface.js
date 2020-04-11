import axios from 'axios';
import { serverURL } from '../config.js';

const url = serverURL;

const handleResult = (response, cb) => {
  if (!response.data) return null;

  return response.data;
}

const handleException = (error) => {
  console.error(error);

  return error;
}

const CInterface = () => {
  const getShopFloorList = () => {
    return axios.get(`${url}/shopFloorList`)
      .then(response => handleResult(response))
      .catch(error => handleException(error));
  }

  const deleteShopFloor = (id, cb) => {
    return axios.delete(`${url}/shopFloorList/${id}`)
      .then(response => handleResult(response))
      .catch(error => handleException(error));
  }

  const updateShopFloor = (id, params) => {
    return axios.put(`${url}/shopFloorList/${id}`, params)
      .then(response => handleResult(response))
      .catch(error => handleException(error));
  }

  const postShopFloor = (params) => {
    return axios.post(`${url}/shopFloorList/`, params)
      .then(response => handleResult(response))
      .catch(error => handleException(error));
  }

  return {
    getShopFloorList,
    deleteShopFloor,
    updateShopFloor,
    postShopFloor,
  };
}

export default CInterface;