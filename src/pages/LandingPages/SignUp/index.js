import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import exceptionroutes from "../../../exceptionroutes";
import bgImage from "assets/images/city-profile.jpg";
import MKBox from "components/MKBox";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
// import MuiLink from "@mui/material/Link";

// @mui icons
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// import AppleIcon from "@mui/icons-material/Apple";

// @mui icons
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpBasic() {
    let isLogin = localStorage.getItem("token");
    const [values, setValues] = useState({
        nickname: '',
        id: '',
        pw: '',
        phone: '',
        email: '',
      })
    const [errors, setErrors] = useState({
        nickname: false,
        id: false,
        pw: false,
        phone: false,
        email: false,
        code: false,
    })
    const [isChecked, setisChecked ] = useState({
        email: false,
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
        const nicknamecheck = /^[a-zA-z0-9]{3,10}$/;
        const idcheck = /^[a-zA-z0-9]{4,11}$/;
        const pwcheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        const phonecheck = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
        const emailcheck = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
        if( name === "nickname"){
            if ( !nicknamecheck.test(value) ){
                setErrors((preValues)=>({
                    ...preValues,
                    [name]: true,
                }));
            } else {
                setErrors((preValues)=>({
                    ...preValues,
                    [name]: false,
                }));
            }
        } else if ( name === "id"){
            if ( !idcheck.test(value)){
                setErrors((preValues)=>({
                    ...preValues,
                    [name]: true,
                }));
            } else {
                setErrors((preValues)=>({
                    ...preValues,
                    [name]: false,
                }));
            }
        } else if ( name === "pw"){
            if( !pwcheck.test(value)){
                setErrors((preValues)=>({
                    ...preValues,
                    [name]: true,
                }));
            } else {
                setErrors((preValues)=>({
                    ...preValues,
                    [name]: false,
                }));
            }
        } else if ( name === "phone"){
            if ( !phonecheck.test(value) ){
                setErrors((preValues)=>({
                    ...preValues,
                    [name]: true,
                }));
            } else {
                setErrors((preValues)=>({
                    ...preValues,
                    [name]: false,
                }));
            }
        } else if ( name === "email"){
            if ( !emailcheck.test(value) ) {
                setErrors((preValues)=>({
                    ...preValues,
                    [name]: true,
                }));
            } else {
                setErrors((preValues)=>({
                    ...preValues,
                    [name]: false,
                }));
            }
        } 
    }

    const handleSubmit = () => {
        const errcheck = Object.values(errors).includes(true);
        const emailcheck = Object.values(isChecked).includes(true);
        const nullcheck = Object.values(values).includes("");
        if (!errcheck && !nullcheck && !emailcheck){
            axios.post(`${process.env.REACT_APP_BACKEND_URL}:8080/signup`,{
                nickname: values.nickname,
                id: values.id,
                pw: values.pw,
                phone: values.phone,
                email: values.email,
                role: "USER"
            }).then((res)=>{
                if(res.data === "signupsuccess"){
                    alert('회원가입 성공 !');
                    navigate('/pages/authentication/sign-in');
                }
            })
            .catch((e)=>{
                alert('sign-up_error : ' + e)
            })
        } else {
            alert('정보를 확인해주세요.')
        }
    }
    const handleDistinct = () => {
        const null_check = values.email !== "" ? true : false;
        if(null_check){
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/distinct-email`,{
                email: values.email
            })
            .then((res)=>{
                console.log(res.data)
                if(res.data === "distinct"){
                    setisChecked((preValues)=>({
                        ...preValues,
                        email: true,
                    }))
                } else {
                    setisChecked((preValues)=>({
                        ...preValues,
                        email: false,
                    }))
                    alert('사용 가능한 이메일입니다.')
                }
            })
            .catch((e)=>{
                alert('check_email_error : ' + e)
            })
        } else {
            alert('이메일을 입력해주세요.');
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("token") !== null ){
            alert('로그인된 계정이 있습니다. 로그아웃 후 사용해주세요.')
            navigate('/presentation');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
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
                                <MKTypography variant="h4" fontWeight="bold" color="white" mt={1} >
                                <AssignmentIndIcon/> 회원가입
                                </MKTypography>
                            </MKBox>
                            <MKBox pt={4} pb={3} px={3}>
                                <MKBox id="signupform" component="form" role="form" onSubmit={handleSubmit}>
                                    <MKBox mb={2}>
                                        <MKInput type="nickname" id="nickname" name="nickname" error={errors.nickname} label={<><BadgeIcon/> &nbsp;닉네임</>} fullWidth onChange={handleChange}/>
                                    </MKBox>
                                    <MKBox mb={2}>
                                        <MKInput type="id" id="id" name="id" error={errors.id} label={<><PersonIcon/> &nbsp;아이디</>} fullWidth onChange={handleChange}/>
                                    </MKBox>
                                    <MKBox mb={2}>
                                        <MKInput type="password" id="pw" name="pw" error={errors.pw}label={<><LockIcon/> &nbsp;비밀번호</>} fullWidth onChange={handleChange}/>
                                    </MKBox>
                                    
                                    <MKBox mb={2}>
                                        <MKInput type="phone" id="phone" name="phone" error={errors.phone} label={<><PhoneAndroidIcon/> &nbsp;휴대전화번호</>} fullWidth onChange={handleChange}/>
                                    </MKBox>
                                    <MKBox mb={2}>
                                        <MKInput type="email" id="email" name="email" error={errors.email || isChecked.email} label={<><EmailIcon/> &nbsp;이메일 (아이디찾기 본인 확인용)</>} fullWidth onChange={handleChange}/>
                                        <MKButton type="button" size="small" variant="gradient" onClick={handleDistinct} 
                                        style={{width:"77px", right:"27px",top:"335px",fontSize:"12px",padding:"0",position:"absolute"}} 
                                        color="success" 
                                        >
                                            중복확인
                                        </MKButton>
                                        {errors.nickname ? <p style={{fontSize:"11px", color:"red"}}>
                                            * 닉네임: 3~10자의 영문 대/소문자,숫자만 사용 가능합니다.
                                        </p>: ""}
                                       {errors.id ? <p style={{fontSize:"11px", color:"red"}}>
                                            * 아이디: 4~12자의 영문 대/소문자,숫자만 사용 가능합니다.
                                       </p>:""}
                                        {errors.pw ? <p style={{fontSize:"11px", color:"red"}}>
                                            * 비밀번호: 8~16자의 영문 대/소문자,숫자,특수문자를 사용해주세요.
                                        </p>:""}
                                        {errors.phone ? <p style={{fontSize:"11px", color:"red"}}>
                                            * 휴대전화번호: 휴대전화번호가 정확한지 확인해 주세요.
                                        </p>:""}
                                        {errors.email ? <p style={{fontSize:"11px", color:"red"}}>
                                            * 이메일: 이메일 주소가 정확한지 확인해주세요.
                                        </p>:""}
                                        {isChecked.email ? <p style={{fontSize:"11px", color:"red"}}>
                                            * 이메일 : 기존에 가입된 이메일입니다. 다른 이메일을 사용해주세요.
                                        </p>:""}
                                    </MKBox>
                                </MKBox>
                                <MKBox mt={2} mb={1}>
                                    <MKButton type="button" onClick={handleSubmit} variant="gradient" color="info" fullWidth style={{fontSize:"17px"}}>
                                    회원가입
                                    </MKButton>
                                </MKBox>
                            </MKBox>
                        </Card>
                    </Grid>
                </Grid>
            </MKBox>
        </>
    );
}
export default SignUpBasic;