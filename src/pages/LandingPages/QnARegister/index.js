// @mui material components
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import exceptionroutes from "exceptionroutes";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function QnAResgisterBasic () {
    let isLogin = localStorage.getItem("token");
    const navigate = useNavigate();

    const [values, setValues] = useState({
        reqnatitle: '',
        reqnacontents: '',
      })
    const [errors, setErrors] = useState({
        reqnatitle: false,
        reqnacontents: false,
    })
    
    useEffect(()=>{
        if(localStorage.getItem("token") ===null){
            navigator("/pages/authentication/sign-in");
        }
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
        const reqnatitle_check = /^[^?a-zA-Z/]{3,20}$/;
        const reqnacontents_check = /^[^?a-zA-Z/||?]{10,100}$/;
        if( name === "reqnatitle"){
            if ( !reqnatitle_check.test(value) ){
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
        } else if ( name === "reqnacontents"){
            if ( !reqnacontents_check.test(value)){
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

    const handleRegister = () => {
        const errcheck = Object.values(errors).includes(true);
        const nullcheck = Object.values(values).includes("");
        if (!errcheck && !nullcheck){
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/qna-register`,{
                qnatitle: values.reqnatitle,
                qnacontents: values.reqnacontents,
                qnanickname: localStorage.getItem("nickname"),
            }).then((res)=>{
                if(res.data !== "register-fail"){
                    console.log(res.data);
                    alert('문의 성공 !');
                    navigate(-1);
                } else {
                    console.log(res.data);
                }
            })
            .catch((e)=>{
                alert('qna-register_error : ' + e)
            })
        } else {
            alert('정보를 확인해주세요.')
        }
    }
    return(
        <>
            <MKBox position="fixed" top="0rem" width="100%">
                <DefaultNavbar
                routes={isLogin !== null ? routes : exceptionroutes}
                action={isLogin !== null ? 
                    {
                    type: "internal",
                    route: "/pages/authentication/sign-out",
                    label: "로그아웃", 
                    color:"info",
                    } :
                    {
                    type: "internal",
                    route: "/pages/authentication/sign-in",
                    label: "로그인", 
                    color:"info",
                }}
                />
            </MKBox>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Grid
                item
                xs={12}
                sm={10}
                md={7}
                lg={6}
                xl={7}
                ml={{ xs: "auto", lg: 6 }}
                mr={{ xs: "auto", lg: 6 }}
                >
                        <MKBox
                            bgColor="white"
                            borderRadius="xl"
                            shadow="lg"
                            display="block"
                            flexDirection="column"
                            justifyContent="center"
                            mt={{ xs: 20, sm: 18, md: 20 }}
                            mb={{ xs: 20, sm: 18, md: 20 }}
                        >
                            <MKBox p={5} >
                                <MKBox>
                                    <Grid container mb={2} borderTop="1px solid black">
                                        <Grid item xs={3} md={2} py={1} px={2} borderRadius="lg" borderTop="1px solid black" borderBottom="1px solid black" textAlign="left">
                                            <MKTypography style={{fontSize:window.innerWidth > 768 ? "17px" : "13px",fontWeight:"bold", color:"black"}} mt={1}> <span style={{color:"red"}}>*</span> 제목 </MKTypography>
                                        </Grid>
                                        <Grid item xs={9} md={10} py={1} borderRadius="lg" borderTop="1px solid black" borderBottom="1px solid black" textAlign="left">
                                            <MKBox mb={2} mt={1}>
                                                <input type="reqnatitle" id="reqnatitle" name="reqnatitle" style={{width:"100%", height:"35px",padding:"15px",border: errors.reqnatitle ? "1px solid red": "1px solid lightgray"}} onChange={handleChange}/>
                                                {errors.reqnatitle ? <MKTypography style={{fontSize:window.innerWidth > 768 ? "10px" : "8px", color:"red"}} mt={1}> <span style={{color:"red"}}>* 글제목: 제목은 3~20길이의 한글로 작성해주세요.</span></MKTypography> : ""}
                                            </MKBox>
                                        </Grid>
                                        <Grid item xs={3} md={2} py={1} px={2} borderRadius="lg"  borderBottom="1px solid black" textAlign="left">
                                            <MKTypography style={{fontSize:window.innerWidth > 768 ? "17px" : "13px",fontWeight:"bold", color:"black"}} mt={1}> <span style={{color:"red"}}>*</span> 문의내용 </MKTypography>
                                        </Grid>
                                        <Grid item xs={9} md={10} py={1} borderRadius="lg"  borderBottom="1px solid black" textAlign="left">
                                            <MKBox  mt={1} >
                                                <textarea type="reqnacontents" id="reqnacontents" style={{width:"100%", height:"300px",padding:"15px",border:errors.reqnacontents ? "1px solid red": "1px solid lightgray", margin:"0"}} name="reqnacontents" label="글내용" onChange={handleChange}/>
                                                {errors.reqnacontents ? <MKTypography style={{fontSize:window.innerWidth > 768 ? "10px" : "8px", color:"red"}} > <span style={{color:"red"}}>* 글내용: 내용은 10~20길이의 한글로 작성해주세요.</span></MKTypography> : ""}
                                            </MKBox>
                                        </Grid>
                                        <Grid item xs={3} md={2} py={2} mb={1} px={2} borderRadius="lg"  borderBottom="1px solid black" textAlign="left">
                                            <MKTypography style={{fontSize:window.innerWidth > 768 ? "17px" : "13px",fontWeight:"bold", color:"black"}} mt={1}> <span style={{color:"red"}}>*</span> 닉네임 </MKTypography>
                                        </Grid>
                                        <Grid item xs={9} md={10} py={2} mb={1} borderRadius="lg"  borderBottom="1px solid black" textAlign="left">
                                            <MKTypography style={{fontSize: window.innerWidth > 768 ? "17px" : "13px", color:"black"}} mt={1}> {localStorage.getItem("nickname")} </MKTypography>
                                        </Grid>
                                        <Grid container display="inline-flex" >
                                            <Grid item xs={6} md={6} py={2} mb={1} px={2} borderRadius="lg"  textAlign="right">
                                                <MKBox mt={2} mb={1}>
                                                    <MKButton color="secondary" style={{width:"120px",fontSize:"15px",borderRadius:"0"}} size="large" onClick={()=>(navigate(-1))}>취소</MKButton>
                                                </MKBox>
                                            </Grid>
                                            <Grid item xs={6} md={6} py={2} mb={1} px={2} borderRadius="lg"  textAlign="left">
                                                <MKBox mt={2} mb={1}>
                                                    <MKButton color="dark" style={{width:"120px",fontSize:"15px",borderRadius:"0"}} size="large" onClick={handleRegister}>등록</MKButton>
                                                </MKBox>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </MKBox>
                            </MKBox>
                        </MKBox>
                </Grid>
            </Grid>
            <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes} />
            </MKBox>
        </>
    );
}

export default QnAResgisterBasic;   