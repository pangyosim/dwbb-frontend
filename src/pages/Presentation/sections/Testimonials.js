// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultReviewCard from "examples/Cards/ReviewCards/DefaultReviewCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Information() {
  const [qnaData, setQnaData] = useState([]);
  useEffect(()=>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/qna-all`)
    .then((res)=> {
      if(res.data){
        res.data = res.data.sort(function compare (a,b){
          if( a.qnacreateday > b.qnacreateday ) return -1;
          if( a.qnacreateday < b.qnacreateday ) return 1;
          return 0;
        });
        let result = res.data.slice(0,3);
        let swap;
        swap = result[0];
        result[0] = result[1];
        result[1] = swap;
        setQnaData(result);
      }
    })
    .catch((error)=> alert('qna-all error : ' + error));
  },[])
  
  return (
    <MKBox component="section" py={1} width="100%">
      <Container>
        <Grid
          container
          item
          mt={10}
          xs={12}
          lg={6}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <MKTypography variant="h2" mb={3}>Q&A 게시판</MKTypography> 
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <MKTypography variant="h5" color="info" textGradient mb={2}>
              최근 고객들이 남겨주신 <br></br>Q&A 글입니다.
            </MKTypography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <MKTypography variant="body2" color="text" mb={2}>
              상시 고객들의 불편한 점들을 <br></br>개선시키고자 노력하고있습니다.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={0} sx={{ mt: 2 }} mb={10}>
          {qnaData.map((data,idx)=>{
            if(idx === 1){
              return(
                <Grid item xs={12} md={3} lg={4} key={idx}>
                  <DefaultReviewCard
                    color="info"
                    name={data.qnanickname}
                    date={data.qnacreateday.substring(0,data.qnacreateday.indexOf("T"))}
                    review={data.qnacontents}
                    // rating={5}
                    state={data.qnastate}
                  />
                </Grid>
              );
            } else {
              return(
                <Grid item xs={12} md={6} lg={4} key={idx}>
                  <DefaultReviewCard
                    name={data.qnanickname}
                    date={data.qnacreateday.substring(0,data.qnacreateday.indexOf("T"))}
                    review={data.qnacontents}
                    // rating={5}
                    state={data.qnastate}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
