/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

// Material Kit 2 React routes
import routes from "routes";
import SignIn from "layouts/pages/authentication/sign-in";
import SignOut from "layouts/pages/authentication/sign-out";
import SignUp from "layouts/pages/authentication/sign-up";
import FindId from "layouts/pages/authentication/find-id";
import NoticeDetailPage from "layouts/pages/landing-pages/noticedetail";
import QnADetailPage from "layouts/pages/landing-pages/qnadetail";
import QnARegisterPage from "layouts/pages/landing-pages/qna-register";
export default function App() {
  const { pathname } = useLocation();
  
  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);
  const getRoutes = (allRoutes) => 
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/presentation" element={<Presentation />} />
        <Route path="*" element={<Navigate to="/presentation"/>} />
        <Route path="/pages/authentication/sign-in" element={<SignIn/>}/>
        <Route path="/pages/authentication/sign-out" element={<SignOut/>}/>
        <Route path="/pages/authentication/sign-up" element={<SignUp/>}/>
        <Route path="/pages/authentication/find-id" element={<FindId/>}/>
        <Route path="/pages/landing-pages/noticedetail" element={<NoticeDetailPage/>}/>
        <Route path="/pages/landing-pages/qnadetail" element={<QnADetailPage/>}/>
        <Route path="/pages/landing-pages/qna-register" element={<QnARegisterPage/>}/>
      </Routes>
    </ThemeProvider>
  );
}
