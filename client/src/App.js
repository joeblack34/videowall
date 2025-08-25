import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import { VideoWall } from "./components/VideoWall";
import { VideoWallUtro } from "./components/VideoWallUtro";
import { RootLayout } from "./components/RootLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<VideoWall />} />
          <Route path="/utro" element={<VideoWallUtro/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
