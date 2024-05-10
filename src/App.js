import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import SignUp from "./signup";
import Home from "./home";
import PostJob from "./postjob";
import Job from "./job";
import Profile from "./profile";
import Conversations from "./conversations";
import Chat from "./chat";
import userStore from "./store";
import io from 'socket.io-client'
import { useEffect, useState } from "react";
import Applicants from "./applicants";
import EditJob from "./editjob";
import EditProfile from "./editprofile";
import Login from "./login";
import Search from "./search";
import AddCourse from "./addcourse";
import Jobs from "./jobs";
import MaritimeCourses from "./maritimecourses";
import Course from "./course";
import EditCourse from "./editmaritimecourse";
import AddChapter from "./addchapter";
import Chapters from "./chapters";
import Chapter from "./chapter";
import EditChapter from "./editchapter";
import CourseEnrollments from "./courseEnrollments";
import Notifications from "./notifications";
import SearchCourse from "./searchcourses";
import SignUpAndLogin from "./loginandsignup";
function App() {
  const[socket,setSocket]=useState(null)
useEffect(()=>{
let _socket =io("http://127.0.0.1:5000",{query:{userId:localStorage.getItem("UID")}})
setSocket(_socket)
},[]) 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signupandlogin" element={<SignUpAndLogin/>}></Route>


        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/postjob" element={<PostJob/>}></Route>
        <Route path="/addcourse" element={<AddCourse/>}></Route> 
        <Route path="/job/:Id" element={<Job/>}></Route>
        <Route path="/profile/:Id" element={<Profile/>}></Route>
        <Route path="/applicants/:jobId" element={<Applicants/>}></Route>
        <Route path="/conversations" element={<Conversations socket={socket} />}></Route>
        <Route path="/chat/:receiverId" element={<Chat socket={socket}/>}></Route>
        <Route path="/editjob/:Id" element={<EditJob/>}></Route>
        <Route path="/editprofile/:Id" element={<EditProfile/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/jobs" element={<Jobs/>}></Route>
        <Route path="/course/:Id" element={<Course/>}></Route>
        <Route path="/courses" element={<MaritimeCourses/>}></Route>
        <Route path="/addchapter/:courseId" element={<AddChapter/>}></Route>
        <Route path="/editmaritimecourse/:courseID" element={<EditCourse/>}></Route>
        <Route path="/chapters/:courseId" element={<Chapters/>}></Route>
        <Route path="/chapter/:courseId/:chapterId" element={<Chapter/>}></Route> 
        <Route path="/editchapter/:courseId/:chapterId" element={<EditChapter/>}></Route>
        <Route path="/courseenrollments/:courseId" element={<CourseEnrollments/>}></Route>
        <Route path="/notifications" element={<Notifications/>}></Route>  
        <Route path="/searchcourses" element={<SearchCourse/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

/*
Json Web Tokens For Authentication

Join As A Teacher Join As A Job Seeker

Linked In Clone Using Next Js,Prisma,NextAuh,MongoDB.

LetsConnect
*/
