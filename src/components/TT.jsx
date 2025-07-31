import { useRecoilState } from "recoil";
import { TodoListAtom } from "../atoms/TodoListAtom";
import { useState } from "react";
import { LoginAtom } from "../atoms/LoginAtom";

function TodoList() {
  //js
  const [isLogin, setIsLogin] = useRecoilState(LoginAtom);
  const [todo, setTodo] = useRecoilState(TodoListAtom);
  const [text, setText] = useState("");
  const add = () => {
    console.log("??");
    // atom 의 데이터를 업데이트 함.
    setTodo([...todo, { id: new Date(), title: text, completed: false }]);
  };
  //jsx
  return (
    <div>
      <h1>
        Todo List 기능<button onClick={setIsLogin(true)}>로그인</button>
      </h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={add}>추가</button>
      </div>
      <div>
        <h4>할일 목록</h4>
        <ul>
          {todo.map(item => (
            <li key={item.id}>
              <span>{item.title}</span>
              <button onClick={() => console.log("삭제")}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
