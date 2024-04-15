// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import exceptionroutes from "exceptionroutes";
import axios from "axios";
import { useEffect, useState } from "react";
import MKPagination from "components/MKPagination";

function ContactUs() {
  let isLogin = localStorage.getItem("token");
  const [noticeData, setNoticeData] = useState([]);
  const [pagingData, setPagingData] = useState({
    totalPage: Math.floor(noticeData/2)+1,
    page: 1,
    limit: 5,
    offset: 0,
    prev: 0,
  });
  const [pagination, setPagination] = useState([[...Array(pagingData.totalPage+1)].fill(false)]);

  const postData = (post) => {
    if(post){
      let result = post.slice((pagingData.page-1)*pagingData.limit, (pagingData.page-1)*pagingData.limit + pagingData.limit);
      return result;
    }
  }

  const handleNextPaging = (e) => {
    console.log('pageNext : '+pagingData.page);
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
  const handlePrevPaging = (e) => {
    console.log('pagePrev : '+pagingData.page);
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

  useEffect(()=>{
    axios.post('https://129.213.127.53:8080/notice-all',{
    })
    .then((res)=>{
      setNoticeData(res.data);
    })
    .catch((error)=>{
      alert('Inform Error : ' + error);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
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
          xl={4}
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
            mx={0}
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
              <MKTypography variant="h3" color="white">
                공지사항
              </MKTypography>
            </MKBox>
            <MKBox p={3} >
              <MKBox width="100%" component="form" method="post" autoComplete="off">
                <Grid container spacing={3} p={1} >
                  {postData(noticeData).map((notice)=>{
                    let noticeday = notice.noticecreateday;
                    return(
                      <Grid item xs={12} md={25} key={notice.noticeseq} borderRadius="lg">
                        <MKTypography style={{fontSize:"20px", fontWeight:"bold"}}>{notice.noticetitle}</MKTypography>
                        <MKTypography style={{fontSize:"13px"}}>작성일 : {noticeday.substring(0,noticeday.indexOf('T'))} / 작성자 : {notice.noticeid} / 조회수 {notice.noticeviews}</MKTypography>
                      </Grid>
                    )
                  })}
                </Grid>
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  <MKPagination variant="contained" size="small" color="secondary">
                    <MKPagination item onClick={handlePrevPaging}>
                      <Icon>keyboard_arrow_left</Icon>
                    </MKPagination>
                    {pagination.map((v,i)=>{
                      console.log('pagination :'+pagination)
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
                        <MKPagination item key={i} active={Boolean(pagination[i])} onClick={handlerPaging} name={i+1}>{i+1}</MKPagination>
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

export default ContactUs;
