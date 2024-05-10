
// @mui material components
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function QnADetailBasic ({qna}) { 
    let isLogin = localStorage.getItem("token");
    const navigator = useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem("token") ===null){
            navigator("/pages/authentication/sign-in");
        }
    })

    const handlerDelete = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/qna-delete`,{
            qnaseq :Number(qna.seq),
        })
        .then((res)=>{
            if(res.data === "delete-success"){
                alert("글 삭제 완료 !");
                navigator(-1);
            }
        })
        .catch((err)=> console.log('qna-delete error : ' + err))
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
                xl={6}
                ml={{ xs: "auto", lg: 6 }}
                mr={{ xs: "auto", lg: 6 }}
                >
                    <MKBox
                        bgColor="white"
                        borderRadius="xl"
                        shadow="lg"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        mt={{ xs: 20, sm: 18, md: 20 }}
                        mb={{ xs: 20, sm: 18, md: 20 }}
                        mx={0}
                    >
                        <MKBox
                        variant="gradient"
                        bgColor="secondary"
                        coloredShadow="secondary"
                        borderRadius="lg"
                        p={2}
                        width="94%"
                        mx={3}
                        mt={-3}
                        >
                            <MKTypography variant="h3" color="white" textAlign="center">
                                Q&A 상세페이지
                            </MKTypography>
                        </MKBox>
                        <MKBox p={3} px={{ xs : 1}}>
                            <MKBox width="100%" autoComplete="off">
                                <Grid container spacing={3} pl={5} py={3} flexDirection="row">
                                    {/* line 1 */}
                                    <Grid item md={24} xs={12} py={1} borderRadius="lg" >
                                        <MKTypography  fontWeight="bold" fontSize="25px">
                                            {qna.title}
                                        </MKTypography>
                                    </Grid>
                                    {/* line 2 */}
                                    <Grid item md={1.4} xs={2} borderRadius="lg" >
                                        <MKTypography fontWeight="light" fontSize="13px">
                                            작성자
                                        </MKTypography>
                                    </Grid>
                                    <Grid item md={7.2} xs={5} borderRadius="lg" >
                                        <MKTypography fontWeight="light" fontSize="13px">
                                            {qna.nickname}
                                        </MKTypography>
                                    </Grid>
                                    <Grid item md={1.4} xs={2} borderRadius="lg" >
                                        <MKTypography fontWeight="light"  fontSize="13px">
                                            조회수
                                        </MKTypography>
                                    </Grid>
                                    <Grid item md={2} xs={1} borderRadius="lg" >
                                        <MKTypography fontWeight="light"  fontSize="13px">
                                            {qna.views}
                                        </MKTypography>
                                    </Grid>
                                    {/* line 3 */}
                                    <Grid item md={1.4} xs={2.2} borderRadius="lg" >
                                        <MKTypography fontWeight="light"  fontSize="13px">
                                            작성일자
                                        </MKTypography>
                                    </Grid>
                                    <Grid item md={7.2} xs={4.8} borderRadius="lg" >
                                        <MKTypography fontWeight="light"  fontSize="13px">
                                            {qna.createday.substring(0,qna.createday.indexOf('T'))} {qna.createday.substring(qna.createday.indexOf('T')+1,qna.createday.indexOf('.'))}
                                        </MKTypography>
                                    </Grid><Grid item md={3.4} xs={4} borderRadius="lg" >
                                        <MKTypography fontWeight="light"  fontSize="13px">
                                            {qna.state ? "답변완료": "작성완료"}
                                        </MKTypography>
                                    </Grid>
                                    {/* line F*/}
                                    <Grid item mb={3} md={12} xs={12} borderRadius="lg" >
                                        <MKTypography  fontWeight="light" fontSize="13px">
                                            {qna.contents}
                                        </MKTypography>
                                    </Grid>
                                    {/* line 5*/}
                                    <Grid item mb={3} md={8.5} xs={6.5} borderRadius="lg" >
                                    <MKTypography mt={2} color="dark" style={{fontSize:"15px",cursor:"pointer"}} fontWeight="bold" onClick={()=>(navigator(-1))}>
                                        <ArrowBackIcon /> 뒤로가기
                                    </MKTypography>
                                    </Grid>
                                    <Grid item mb={3} md={3.5} xs={4.5} borderRadius="lg" >
                                    {localStorage.getItem("nickname") === qna.nickname || localStorage.getItem("role") === "ADMIN" ? 
                                    <MKButton color="error" style={{width:"120px",fontSize:"15px",borderRadius:"0"}} size="large" onClick={handlerDelete}>글삭제</MKButton>
                                    :
                                    ""}
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

export default QnADetailBasic;