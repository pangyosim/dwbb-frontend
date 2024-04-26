import React from 'react';

const Loading = ({image}) => {
    return (
        <div style={{textAlign:"center", marginTop: "20vh", width: "100%", height: "70vh"}}>
            <img src={image} alt="로딩" style={{width:"12vh",height:"12vh"}}/>
        </div>
    )
}
export default Loading;