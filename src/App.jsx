import { Route, Routes } from "react-router-dom";
import "./App.css";
import Board from "./components/Board/board";
import Home from "./views/Home/Home";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Board />} />
        </Route> */}
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<h1>missing</h1>} />
      </Routes>
    </>
  );
}

export default App;
