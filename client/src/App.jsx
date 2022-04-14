import { Routes, Route } from "react-router-dom";

import Header from "@/Header/Header";
// import Footer from "@/Footer/Footer";
import Main from "@/Main/Main";
import SignIn from "@/Cabinet/SignIn/SignIn.jsx";
import SignUp from "@/Cabinet/SignUp/SignUp.jsx";

import './scss/core/wanted.scss'

function App() {
  return (
    <>
      <div className="container">
        <Header />
      </div>
      <main className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </main>
      {/*<div className="container">*/}
      {/*  <Footer />*/}
      {/*</div>*/}
    </>
  );
}

export default App;
