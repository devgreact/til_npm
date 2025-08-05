import { useEffect } from "react";
import { getTodos } from "./apis/todoApi";

function App() {
  // js 자리
  useEffect(() => {
    getTodos();
  }, []);
  // jsx 자리
  return <div>App</div>;
}

export default App;
