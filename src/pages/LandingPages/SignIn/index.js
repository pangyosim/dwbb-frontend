import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import SimpleFooter from "examples/Footers/SimpleFooter";
import routes from "routes";
import bgImage from "assets/images/city-profile.jpg";
import axios from "axios";
import exceptionroutes from "../../../exceptionroutes";

function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [values, setValues] = useState({
    id: '',
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

  const handleSubmit = () => {
      axios.post('https://129.213.127.53:8080/check-login',{
        id: values.id,
        pw: values.pw
      }).then((res)=>{
        if(res.data !== "loginfail"){
          alert('로그인 성공!');
          localStorage.setItem("token",res.data);
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
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  DWBB
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GitHubIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleSubmit}>
                  <MKBox mb={2}>
                    <MKInput type="id" id="id" name="id" label="ID" fullWidth onChange={handleChange}/>
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
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;아이디 저장
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton type="button" onClick={handleSubmit} variant="gradient" color="info" fullWidth>
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
