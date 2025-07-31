import CounterAtom from "./components/CounterAtom";
import Header from "./components/layout/Header";
import TodoList from "./components/TodoList";
import JoinPage from "./pages/JoinPage";
import Schedule from "./pages/Schedule";
import Slide from "./pages/Slide";

function App() {
  return (
    <div>
      <CounterAtom />
      <TodoList />
    </div>
  );
}

export default App;
