import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import After from "./pages/member/After";
import AfterGoogle from "./pages/member/AfterGoogle";

function App() {
  return (
    <Router>
      <LoginPage />
      <Routes>
        <Route path="/member/kko" element={<After />}></Route>
        <Route path="/member/google" element={<AfterGoogle />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
