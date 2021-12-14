import "./App.css";
import Layout from "./components/Layout/Layout";
import Maps from "./components/Main/Maps/Maps";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Maps />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
