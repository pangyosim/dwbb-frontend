import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

import routes from "routes";
import exceptionroutes from "../../../exceptionroutes";
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MapPageBasic () {
    const isLogin = localStorage.getItem("token");
    const navermaps = useNavermaps();
    const handlerMarkerClick = () => {
        console.log("Marker Click !");
    }
    const navigator = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token") === null){
        navigator("/pages/authentication/sign-in");
        }
    })
    useEffect(()=>{
        axios.post("https://localhost:8080/map-data",{})
        .then((response)=>{
            console.log('response : ' + response.data);
        })
        .catch((error) => console.log('map-data-error : ' + error))
    },[])

    return (
        <>
            <MKBox position="fixed" top="0rem" width="100%" zIndex="99">
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
            <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
            <MapDiv
                style={{
                    width: '100%',
                    height: '100%',
                }}
                >
                <NaverMap
                defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
                defaultZoom={15}
                >
                    <Marker position={new navermaps.LatLng(37.3595704, 127.105399)} onClick={handlerMarkerClick} style={{cursor:"pointer"}} />
                </NaverMap>
                </MapDiv>
            </MKBox>
        </>
    );
}
export default MapPageBasic;