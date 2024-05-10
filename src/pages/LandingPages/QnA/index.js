// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKPagination from "components/MKPagination";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import exceptionroutes from "exceptionroutes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const title_style = {
    fontSize:"12px",
    color:"black",
    cursor: "pointer",
    textDecoration: "underline"
}

function QnABasic () {
    let isLogin = localStorage.getItem("token");
    const [noticeData, setNoticeData] = useState([]);
    const [qnaData, setQnaData] = useState([]);
    const [pagingData, setPagingData] = useState({
        totalPage: Math.floor(qnaData.length/2)+1,
        page: 1,
        limit: 7,
        offset: 0,
        prev: 0,
      });
    const [pagination, setPagination] = useState(()=>{
    const pagination_arr = [...Array(pagingData.totalPage)].fill(false,1,pagingData.totalPage-1);
        pagination_arr[0] = true;
        return (pagination_arr)
    });
    const navigator = useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem("token") ===null){
            navigator("/pages/authentication/sign-in");
        }
    })

    useEffect(()=>{
        // qna list 
        axios.post(`${process.env.REACT_APP_BACKEND_URL}:8080/qna-all`)
        .then((res)=> {
            setQnaData(res.data)
            setPagingData((prev)=>({
                ...prev,
                totalPage: Number(Math.floor(res.data.length/5)),
            }));
            setPagination(()=>{
                const pagination_arr = [...Array(Number(Math.floor(Number(Math.floor(res.data.length/5))+1)))].fill(false,1,Number(Math.floor(res.data.length/5))-1);
                pagination_arr[0] = true;
                return(pagination_arr)
            });
        })
        .catch((error)=> alert('qna-all error : ' + error));
        // notice list
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/notice-all`,{
        })
        .then((res)=>setNoticeData(res.data.sort((a,b)=>(a.noticeseq-b.noticeseq)).reverse().slice(0,3)))
        .catch((error)=>{
            alert('Notice Error : ' + error);
        })
    },[])
    const postData = (post) => {
        if(post){
          post = post.sort(function compare (a,b){
            if( a.qnacreateday > b.qnacreateday ) return -1;
            if( a.qnacreateday < b.qnacreateday ) return 1;
            return 0;
          });
          let result = post.slice((pagingData.page-1)*pagingData.limit, (pagingData.page-1)*pagingData.limit + pagingData.limit);
          return result;
        }
    }
    const handleNextPaging = () => {
        if(pagingData.page < pagingData.totalPage+1){
            const update_prevarr = [...Array(pagingData.totalPage+1).fill(false)];
            update_prevarr[pagination.indexOf(true)] = false;
            setPagingData((prevValues)=>({
            ...prevValues,
            page: pagingData.page+1,
            prev: pagination.indexOf(true)
            }))
            update_prevarr[pagination.indexOf(true)+1] = true;
            setPagination(update_prevarr);
        } 
    }
    const handlePrevPaging = () => {
        if(pagingData.page > 1 ){
            const update_nextarr = [...Array(pagingData.totalPage+1).fill(false)];
            update_nextarr[pagination.indexOf(true)] = false;
            setPagingData((prevValues)=>({
            ...prevValues,
            page: pagingData.page-1,
            prev: pagination.indexOf(true)
            }))
            update_nextarr[pagination.indexOf(true)-1] = true;
            setPagination(update_nextarr);
        } 
    }

    const handlerTitle = (qna,e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/qna-views`, qna)
        .catch((error) => alert('qna views error : ' + error));
        navigator('/pages/landing-pages/qnadetail', {
            state : {
              seq : qna.qnaseq,
              title : qna.qnatitle,
              contents : qna.qnacontents,
              nickname : qna.qnanickname,
              views : qna.qnaviews+1,
              createday : qna.qnacreateday
            },
        });
    }

    const handlerNoticeTitle = (notice,e) => {
        e.preventDefault();
        navigator('/pages/landing-pages/noticedetail', {
            state : {
              seq : notice.noticeseq,
              title : notice.noticetitle,
              contents : notice.noticecontents,
              file : notice.noticefile,
              id : notice.noticeid,
              views : notice.noticeviews+1,
              createday : notice.noticecreateday
            },
        });
    }

    const handlerRegister = () => {
        navigator('/pages/landing-pages/qna-register');
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
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        mt={{ xs: 20, sm: 18, md: 20 }}
                        mb={{ xs: 20, sm: 18, md: 20 }}
                    >
                        <MKBox
                        variant="gradient"
                        bgColor="secondary"
                        coloredShadow="secondary"
                        borderRadius="lg"
                        p={2}
                        mx={2}
                        mt={-3}
                        >
                            <MKTypography variant="h3" color="white" textAlign="center">
                                Q&A
                            </MKTypography>
                        </MKBox>
                        <MKBox p={3}>
                            <MKBox>
                                <Grid container mb={2} borderTop="1px solid black">
                                    <Grid item xs={1} md={1.2} py={1} borderRadius="lg" borderTop="1px solid black" borderBottom="1px solid black" textAlign="center">
                                        <MKTypography style={{fontSize:"12px",fontWeight:"bold", color:"black"}}> 번호 </MKTypography>
                                    </Grid>
                                    <Grid item xs={4.8} md={4.8} py={1} borderRadius="lg" borderTop="1px solid black" borderBottom="1px solid black" textAlign="center">
                                        <MKTypography style={{fontSize:"12px",fontWeight:"bold", color:"black"}}> 글제목 </MKTypography>
                                    </Grid>
                                    <Grid item xs={2} md={1.5} py={1} borderRadius="lg"borderTop="1px solid black" borderBottom="1px solid black" textAlign="center">
                                        <MKTypography style={{fontSize:"12px",fontWeight:"bold", color:"black"}}> 작성자 </MKTypography>
                                    </Grid>
                                    <Grid item xs={2.2} md={2.5} py={1} borderRadius="lg" borderTop="1px solid black" borderBottom="1px solid black" textAlign="center">
                                        <MKTypography style={{fontSize:"12px",fontWeight:"bold", color:"black"}}> 등록일 </MKTypography>
                                    </Grid>
                                    <Grid item xs={2} md={2} py={1} borderRadius="lg" borderTop="1px solid black" borderBottom="1px solid black" textAlign="center">
                                        <MKTypography style={{fontSize:"12px",fontWeight:"bold", color:"black"}}> 조회/상태 </MKTypography>
                                    </Grid>
                                    {noticeData.map((notice,idx)=>{
                                        let noticecday = notice.noticecreateday;
                                        
                                        return(
                                            <Grid container mb={0} spacing={0} key={idx} style={{background:"#f4f4f4",borderLeft:"3px solid red"}}>
                                                <Grid item xs={1} md={1.1} py={1} borderRadius="lg" borderBottom="1px solid black" textAlign="center">
                                                    <MKTypography style={{fontSize:"12px", color:"black"}}> 공지 </MKTypography>
                                                </Grid>
                                                <Grid item xs={4.8} md={4.9} py={1}  borderRadius="lg" borderBottom="1px solid black" textAlign="center">
                                                    <MKTypography style={{fontSize:"12px", color:"red", cursor: "pointer", fontWeight:"bold"}} onClick={(e)=>handlerNoticeTitle(notice,e)}> {window.innerWidth > 768 || notice.noticetitle.length <= 10 ? notice.noticetitle :notice.noticetitle.substring(0,10)+"..."} </MKTypography>
                                                </Grid>
                                                <Grid item xs={2} md={1.5} py={1} borderRadius="lg" borderBottom="1px solid black" textAlign="center">
                                                    <MKTypography style={{fontSize:"12px", color:"black"}}> {window.innerWidth > 768 || notice.noticeid.length <= 7 ? notice.noticeid : notice.noticeid.substring(0,7)+"..."} </MKTypography>
                                                </Grid>
                                                <Grid item xs={2.2} md={2.5} py={1} borderRadius="lg"  borderBottom="1px solid black" textAlign="center">
                                                    <MKTypography style={{fontSize:"12px", color:"black"}}> {noticecday.substring(0,noticecday.indexOf('T'))} </MKTypography>
                                                </Grid>
                                                <Grid item xs={2} md={2} py={1}  borderRadius="lg" borderBottom="1px solid black" textAlign="center">
                                                    <MKTypography style={{fontSize:"12px", color:"black"}}> {notice.noticeviews} </MKTypography>
                                                </Grid>
                                            </Grid>
                                        );
                                    })}
                                    {postData(qnaData).map((qna,idx)=>{
                                        let qnacreateday = qna.qnacreateday;
                                        
                                        return(
                                            <Grid container mb={0} spacing={0} key={idx}>
                                                <Grid item xs={1} md={1.2} py={1} borderRadius="lg" borderBottom="1px solid black" textAlign="center">
                                                    <MKTypography style={{fontSize:"12px", color:"black"}}> {qna.qnaseq} </MKTypography>
                                                </Grid>
                                                <Grid item xs={4.8} md={4.8} py={1}  borderRadius="lg" borderBottom="1px solid black" textAlign="center">
                                                    <MKTypography style={title_style} onClick={(e)=>handlerTitle(qna,e)}> {window.innerWidth > 768 || qna.qnatitle.length <= 10 ? qna.qnatitle :qna.qnatitle.substring(0,10)+"..."} </MKTypography>
                                                </Grid>
                                                <Grid item xs={2} md={1.5} py={1} borderRadius="lg" borderBottom="1px solid black" textAlign="center">
                                                    <MKTypography style={{fontSize:"12px", color:"black"}}> {window.innerWidth > 768 || qna.qnanickname.length <= 7 ? qna.qnanickname : qna.qnanickname.substring(0,7)+"..."} </MKTypography>
                                                </Grid>
                                                <Grid item xs={2.2} md={2.5} py={1} borderRadius="lg"  borderBottom="1px solid black" textAlign="center">
                                                    <MKTypography style={{fontSize:"12px", color:"black"}}> {qnacreateday.substring(0,qnacreateday.indexOf('T'))} </MKTypography>
                                                </Grid>
                                                <Grid item xs={2} md={2} py={1}  borderRadius="lg" borderBottom="1px solid black" textAlign="center">
                                                    <MKTypography style={{fontSize:"12px", color:"black"}}> {qna.qnastate ? "답변완료" : "접수완료"} </MKTypography>
                                                </Grid>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                <MKButton type="button" variant="gradient" color="secondary" onClick={handlerRegister}  style={{fontSize:"15px", width:"7rem",float:"right",right:"0rem"}}>
                                    Q&A등록
                                </MKButton>
                                <Grid container item justifyContent="center" xs={12} mt={10} mb={2}>
                                    <MKPagination variant="contained" size="small" color="secondary">
                                    <MKPagination item onClick={handlePrevPaging}>
                                        <Icon>keyboard_arrow_left</Icon>
                                    </MKPagination>
                                    {pagination.map((v,i)=>{
                                        const handlerPaging = (e) =>{
                                            const update_arr = [...Array(pagingData.totalPage+1).fill(false)];
                                            update_arr[pagingData.prev] = false;
                                            setPagingData((prevValues)=>({
                                            ...prevValues,
                                            page: Number(e.target.name),
                                            prev: pagination.indexOf(true)
                                            }))
                                            update_arr[e.target.name-1] = true;
                                            setPagination(update_arr);
                                        }
                                        return(
                                        <MKPagination item key={i} active={Boolean(v)} onClick={handlerPaging} name={i+1}>{i+1}</MKPagination>
                                    )})}
                                    <MKPagination item onClick={handleNextPaging}>
                                        <Icon>keyboard_arrow_right</Icon>
                                    </MKPagination>
                                    </MKPagination>
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

export default QnABasic;