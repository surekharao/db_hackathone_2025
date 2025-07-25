import "./main.css";
import { BrowserRouter, Route, Routes } from "react-router";
import React, { Suspense } from "react";
import Footer from "./components/footer";

const LoginPage = React.lazy(() => import("./pages/login"));
const ChatPage = React.lazy(() => import("./pages/chat"));
const GamePage = React.lazy(() => import("./pages/game"));

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen max-w-lg m-auto bg-white relative">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
