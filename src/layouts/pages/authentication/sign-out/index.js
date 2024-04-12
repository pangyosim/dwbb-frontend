/*
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
import { useNavigate } from "react-router-dom"

// Material Kit 2 React pages

const SignOut = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.removeItem("token");
        alert("로그아웃 되셨습니다.");
        if(localStorage.getItem("token") === null ){
            navigate('/presentation');
        }
    })
}

export default SignOut;