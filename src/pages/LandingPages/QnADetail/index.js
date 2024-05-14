
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
import { useEffect, useState } from "react";

function QnADetailBasic ({qna}) { 
    let isLogin = localStorage.getItem("token");
    const navigator = useNavigate();
    const [values, setValues] = useState({
        comments: '',
      })
    useEffect(()=>{
        if(localStorage.getItem("token") ===null){
            navigator("/pages/authentication/sign-in");
        }
    })
    console.log(qna)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    }
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

    const handlerReComment = () => {
        const nullcheck = Object.values(values).includes("");
        if( !nullcheck ){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/qna-comments`,{
            qnaseq :Number(qna.seq),
            comments: values.comments
        })
        .then((res)=>{
            if(res.data === "comments-success"){
                alert("댓글 등록 완료 !");
                navigator(-1);
            }
        })
        .catch((err)=> console.log('qna-comments error : ' + err))
        } else{
            alert('댓글을 입력해주세요.');
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
                                        {qna.states ? 
                                        <MKTypography style={{ width:"70%" ,fontWeight:"bold",borderRadius:"20px",backgroundColor:"#57b05c",color:"white",fontSize:"11px",textAlign:"center"}}>답변완료</MKTypography>:
                                        <MKTypography style={{ width:"70%" ,fontWeight:"bold",borderRadius:"20px",backgroundColor:"#686f7e",color:"white",fontSize:"11px",textAlign:"center"}}>접수완료</MKTypography>} 
                                    </Grid>
                                    {/* line F*/}
                                    <Grid item mb={3} md={12} xs={12} borderRadius="lg" >
                                        <MKTypography  fontWeight="light" fontSize="13px">
                                            {qna.contents}
                                        </MKTypography>
                                    </Grid>
                                    {/* line 5*/}
                                    <Grid item mb={2} md={8.9} xs={6} borderRadius="lg" >
                                    <MKTypography mt={2} color="dark" style={{fontSize:"15px",cursor:"pointer"}} fontWeight="bold" onClick={()=>(navigator(-1))}>
                                        <ArrowBackIcon /> 뒤로가기
                                    </MKTypography>
                                    </Grid>
                                    {localStorage.getItem("nickname") === qna.nickname || localStorage.getItem("role") === "ADMIN" ? 
                                    <Grid item mb={1} md={3.1} xs={5} borderRadius="lg" >
                                        <MKButton color="error" style={{width:"120px",fontSize:"15px",borderRadius:"0"}} size="large" onClick={handlerDelete}>글삭제</MKButton>
                                    </Grid>
                                    :
                                    ""}
                                    {qna.states === true ? 
                                    <Grid item mb={2} md={11} xs={11} borderRadius="lg" >
                                        <MKTypography pl={1} mb={2} fontSize="20px" fontWeight="bold">
                                            관리자 답변
                                        </MKTypography>
                                        <MKTypography pl={2} py={3} pr={2} fontSize="15px" border="1px solid #f1f1f1" borderRadius="7px" width="100%">
                                            {qna.comments}
                                        </MKTypography>
                                    </Grid>:""}
                                    {localStorage.getItem("role") === "ADMIN" && qna.states !== true? 
                                        <Grid item mb={3} md={11} xs={11} borderRadius="lg" >
                                            <MKBox mb={2} textAlign="right">
                                                <textarea type="comments" id="comments" name="comments" style={{marginBottom: "20px",height:"100px",width:"100%",padding:"20px", margin:"0", border:"1px solid lightgray",borderRadius:"10px"}} onChange={handleChange}/>
                                                <MKButton type="button" size="large" 
                                                color="secondary" 
                                                style={{width:"120px",fontSize:"15px",borderRadius:"0"}}
                                                onClick={handlerReComment}
                                                >
                                                    댓글달기
                                                </MKButton>
                                            </MKBox>
                                        </Grid>
                                    :""}
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