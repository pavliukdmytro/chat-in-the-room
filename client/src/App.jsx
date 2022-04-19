import { Routes, Route, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import Header from "@/Header/Header";
// import Footer from "@/Footer/Footer";
import Main from "@/Main/Main";
import SignIn from "@/cabinet/SignIn/SignIn.jsx";
import SignUp from "@/cabinet/SignUp/SignUp.jsx";
import Cabinet from "@/cabinet/Cabinet/Cabinet";
import NotFound from "@/NotFound/NotFound";
import Room from '@/Room/Room.jsx';

import './scss/core/wanted.scss';

function App() {
  const authData = useSelector(store => store.authData);

  return (
    <>
      <div className="container">
        <Header />
      </div>
      {
        authData?.isLoad &&
        <main className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/room/:roomId" element={<Room />} />
            { !!authData?.user && <Route path="/cabinet" element={<Cabinet />} /> }
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      }
    </>
  );
}

export default App;
