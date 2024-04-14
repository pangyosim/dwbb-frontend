import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import exceptionroutes from "../../../exceptionroutes";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import EmailIcon from '@mui/icons-material/Email';
import MuiLink from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "assets/images/city-profile.jpg";
import { useState } from "react";
import MKTypography from "components/MKTypography";

function FindIDBasic () {
    let isLogin = localStorage.getItem("token")
  
    const [values, setValues] = useState({
        email: '',
        code: '',
    })
    const [errors, setErrors] = useState({
        email: false,
        code: false,
    })
    const [isChecked, setisChecked ] = useState({
        email: false,
        subemail: false,
        code: false,
    });
    const [findId, setFindId] = useState([]);
    const navigate = useNavigate();
    const handleEmailSend = () => {
        const errcheck = Object.values(errors).includes(true);
        const nullcheck = values.email === null ? true : false;
        if (!errcheck && !nullcheck ){
            axios.post("https:/localhost:8080/check-email",{
                email: values.email
            })
            .then((res)=>{
                if(res.data.email !== "findfail"){
                    setisChecked((prevValues)=>({
                        ...prevValues,
                        email: true
                    }));
                    setFindId(res.data);
                    alert("인증코드가 발송되었습니다.");
                } else {
                    alert('가입된 아이디가 없습니다. 회원가입페이지로 이동합니다.');
                    navigate('/pages/authentication/sign-up');
                }
            })
            .catch((err)=>{
                alert('error : ' + err);
            })
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
        const codecheck = /^[0-9]{6}$/;
        const emailcheck = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
        if( name === "email"){
            if(!emailcheck.test(value)){
                setErrors((prevValues)=>({
                    ...prevValues,
                    [name]: true,
                }))
            } else {
                setErrors((prevValues)=>({
                    ...prevValues,
                    [name]: false,
                }))
            }
        } else if ( name === "code") {
            if(!codecheck.test(value)){
                setErrors((prevValues)=>({
                    ...prevValues,
                    [name]: true,
                }))
            } else {
                setErrors((prevValues)=>({
                    ...prevValues,
                    [name]: false,
                }))
            }
        }
       
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
                            <MKBox pt={4} pb={3} px={3}>
                                <MKBox id="signupform" component="form" role="form">
                                    <MKBox mb={2}>
                                        <MKInput type="email" id="email" name="email" error={errors.email} label={<><EmailIcon/> &nbsp;이메일주소</>} fullWidth onChange={handleChange}/>
                                        <MKButton type="button" size="small" onClick={handleEmailSend} variant="gradient" style={{width:"85px", right:"27px",top:"38px",fontSize:"12px",padding:"0",position:"absolute"}} color="success" >
                                            이메일 인증
                                        </MKButton>
                                        {errors.email ? <p style={{fontSize:"11px", color:"red"}}>
                                            * 이메일: 이메일 주소가 정확한지 확인해주세요.
                                        </p>: <MKTypography component={MuiLink} href="/pages/authentication/sign-up" style={{fontSize:"10px",top:"0"}} color="secondary"> &nbsp;&nbsp;회원가입한 이메일이 없다면? 회원가입페이지로 이동 <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon></MKTypography>}
                                        { isChecked.email ? 
                                            <>
                                                <MKInput type="code" id="code" name="code" error={errors.code} placeholder="인증코드를 입력해주세요." fullWidth onChange={handleChange}/>
                                                <MKButton type="button" variant="gradient" size="small" 
                                                    onClick={() => {
                                                    if(findId.seq.toString() === values.code){
                                                        setisChecked((prevValues)=>({
                                                            ...prevValues,
                                                            code: true
                                                        }));
                                                        alert('인증되었습니다.\n아이디/비밀번호를 확인해주세요.')
                                                    } else {
                                                        alert('인증번호를 확인해주세요.')
                                                        setisChecked((prevValues)=>({
                                                            ...prevValues,
                                                            code: false
                                                        }));
                                                    }
                                                    }} 
                                                    style={{width:"20px", right:"27px",top:"115px",fontSize:"12px",padding:"0",position:"absolute"}} 
                                                    color="success">
                                                    확인
                                                </MKButton>
                                                <p style={{fontSize:"11px", color:"red"}}>
                                                    {errors.code ? "* 인증코드: 인증코드가 정확한지 확인해주세요." : ""}
                                                </p>
                                            </>
                                         : "" }
                                    </MKBox>
                                    { isChecked.code ? 
                                        <MKBox mb={2}>
                                            <MKInput type="findid" id="findid" name="findid" value={"아이디      "+findId.id}  fullWidth/>
                                            <MKInput type="findpw" id="findpw" name="findpw" value={"비밀번호   "+findId.pw} fullWidth/>
                                            <MKButton type="button" variant="gradient" color="info" href="/pages/authentication/sign-in" fullWidth>
                                                로그인 페이지로 이동
                                            </MKButton>
                                        </MKBox> :
                                        ""
                                    }
                                </MKBox>
                            </MKBox>
                        </Card>
                    </Grid>
                </Grid>
            </MKBox>
        </>
    )
}

export default FindIDBasic;