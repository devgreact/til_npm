import axios from "axios";
// API 주소
const todoURL = "https://jsonplaceholder.typicode.com/todos";

// 할일 목록 전체 호출하기
const getTodos = async () => {
  try {
    const res = await axios.get(todoURL);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// 할일 목록 한개만 호출하기
const getTodo = async id => {
  try {
    const res = await axios.get(`${todoURL}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// 할일 1개 추가하기 : post
const postTodo = async data => {
  try {
    const res = axios.post(todoURL, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// 할일 1개 삭제하기 : delete
const deleteTodo = async id => {
  try {
    const res = await axios.delete(`${todoURL}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// 할일 전체 업데이트
const putTodo = async (id, data) => {
  try {
    const res = await axios.put(`${todoURL}/${id}`, data);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
// 할일 일부분 수정
const patchTodo = async (id, { title, completed }) => {
  try {
    const res = await axios.patch(`${todoURL}/${id}`, { title, completed });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export { getTodos, getTodo, putTodo, deleteTodo, patchTodo };
