import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import bgImage from "assets/images/city-profile.jpg";
import axios from "axios";
import exceptionroutes from "../../../exceptionroutes";
import { useCookies } from "react-cookie";
// import MKAlert from "components/MKAlert";

function SignInBasic() {
  const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]);
  const [rememberMe, setRememberMe] = useState(cookies.rememberUserId !== undefined ? true : false);
  const [values, setValues] = useState({
    id: cookies.rememberUserId !== undefined ? cookies.rememberUserId : '',
    pw: ''
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }
  let isLogin = localStorage.getItem("token");
  useEffect(()=>{
    if(localStorage.getItem("token") !== null ){
      alert('로그인된 계정이 있습니다. 로그아웃 후 사용해주세요.')
      navigate('/presentation');
    }
  })
  useEffect(()=>{
    if (cookies.rememberUserId !== undefined) {
      setValues((prevValues)=>({
        ...prevValues,
        id: cookies.rememberUserId,
      }));
      setRememberMe(rememberMe);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    if(cookies.rememberUserId !== values.id ) {
      setRememberMe(false)
    }
  },[cookies.rememberUserId,values.id])

  const handleSetRememberMe = (e) =>{
    setRememberMe(e.target.checked);
    if (e.target.checked) {
      setCookie('rememberUserId', values.id, {maxAge: 2000});
    } else {
      removeCookie("rememberUserId");
    }
  } 
  const handleSubmit = () => {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/check-login`,{
        id: values.id,
        pw: values.pw
      }).then((res)=>{
        if(res.data !== ""){
          alert('로그인 성공 !');
          localStorage.setItem("nickname",res.data[0]);
          localStorage.setItem("role", res.data[1]);
          localStorage.setItem("token", res.data[2]);
          setCookie(cookies.rememberUserId)
          navigate('/presentation');
        } else {
          alert("아이디 혹은 비밀번호가 틀립니다 !")
        }
      })
      .catch((e)=>{
        console.log('error ! : ' + e)
      })
  }
  return (
    <>
      <DefaultNavbar
        routes={isLogin !== null ? routes : exceptionroutes}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                
                <MKTypography variant="h4" fontWeight="bold" color="white" mt={1}>
                  DWBB
                </MKTypography>
                <MKTypography variant="a" fontWeight="light" color="white" mt={1} style={{fontSize:"17px"}}>
                  은행 대기인원 & 주차장 현황 사이트
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleSubmit}>
                  <MKBox mb={2}>
                    <MKInput type="id" id="id" name="id" label="ID" value={values.id} fullWidth onChange={handleChange}/>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="password" id="pw" name="pw" label="Password" fullWidth onChange={handleChange}/>
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;아이디 저장
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton type="button" onClick={handleSubmit} variant="gradient" color="info" fullWidth style={{fontSize:"17px"}}>
                      로그인
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      가입한 아이디가 없다면? &nbsp;
                      <MKTypography
                        component={Link}
                        to="/pages/authentication/sign-up"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        회원가입
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={1} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      아이디를 잊으셨다면? &nbsp;
                      <MKTypography
                        component={Link}
                        to="/pages/authentication/find-id"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        아이디/비밀번호찾기
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      {/* <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox> */}
    </>
  );
}

export default SignInBasic;
