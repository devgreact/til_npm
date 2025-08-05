import axios from "axios";

const photoUrl = "https://jsonplaceholder.typicode.com/photos";
const getPhotos = async () => {
  try {
    const res = axios.get(photoUrl);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const getPhoto = async id => {
  try {
    const res = axios.get(`${photoUrl}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const postPhoto = async data => {
  try {
    const res = axios.post(photoUrl, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const deletePhoto = async id => {
  try {
    const res = axios.delete(`${photoUrl}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const putPhoto = async (id, data) => {
  try {
    const res = axios.put(`${photoUrl}/${id}`, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const patchPhoto = async (id, {}) => {
  try {
    const res = axios.patch(`${photoUrl}/${id}`, {});
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
export { getPhoto, getPhotos, postPhoto, putPhoto, deletePhoto, patchPhoto };
