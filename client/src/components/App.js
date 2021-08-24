import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";

// 비디오 업로드 페이지를 import 하기
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";

//null   Anyone Can go inside
//true   only logged in user can go inside => 로그인 한 사람만 들어갈 수 있도록. (ex: 비디오 업로드 페이지)
//false  logged in user can't go inside => 로그인 한 다음에 로그인 페이지로 들어갈려고 하는 경우.

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}
/*
 * <Route exact path="/" component={Auth(LandingPage, null)} />
 * 여기에서 null이란, 아무나 들어갈 수 있다는 뜻.
 * 
 */
export default App;
