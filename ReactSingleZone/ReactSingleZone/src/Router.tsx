import { createBrowserRouter } from 'react-router'
import CategoryList from './components/CategoryList'
// import SearchBar from './components/searchBar'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import PersonalArea from './components/PersonalArea'
import SearchBar from './components/SearchBar'
import HeaderPersonalArea from './components/HeaderPersonalArea'
import PersonalPlayList from './components/PersonalPlayList'
import ProfileUpdate from './components/ProfileUpdate'
import UploadSong from './components/UploadSong'



export const Router = createBrowserRouter([
  {
    path: '/',
    element:  <><Header/> <CategoryList/><SearchBar/></> , 
    children:[
         
        { path:'register',element:<Register/>},
        
       ],   
  },
  {
    path:'/personal-area',
    element:<><PersonalArea/></>,
    children:[
         
        { path:'playlist',element:<PersonalPlayList/>},
        { path:'profile-update',element:<ProfileUpdate/>},
        { path:'upload-song',element:<UploadSong/>},

        
       ],  
  }
])