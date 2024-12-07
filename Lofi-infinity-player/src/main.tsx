import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Bgm from "./pages/bgm/Bgm.tsx";
import EnvviromentSoundSettings from "./pages/enviroment-sound-settings/EnvviromentSoundSettings.tsx";
import Result from "./pages/result/Result.tsx";
import CommentGet from "./components/screen/CommentGet"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bgm" element={<Bgm />}></Route>
        <Route
          path="/enviroment-sound-settings"
          element={<EnvviromentSoundSettings />}
        ></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route path="/commentlist" element={<CommentGet />}></Route>
        
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
