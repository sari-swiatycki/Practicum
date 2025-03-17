import { Outlet } from "react-router-dom";
import HeaderPersonalArea from "./HeaderPersonalArea";
import PersonalAreaMenu from "./PersonalAreaMenu";

const PersonalArea = () => {
    return <><PersonalAreaMenu/>
    <HeaderPersonalArea/>
    <Outlet/>
    </>
  };
  
  export default PersonalArea;