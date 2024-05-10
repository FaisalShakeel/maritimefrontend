import axios from "axios"
import { Children, useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCourse from "./store";
import { useNavigate } from "react-router-dom";

function Chapter()
{
    let commentRef=useRef()

    const[instructorId,setInstructorId]=useState("")
    const [successfullyFetched,setSuccessfullyFetched]=useState(false)
    const{courseId,chapterId}=useParams()
    console.log(successfullyFetched)
    const[chapter,setChapter]=useState({})
    const[hasCompleted,setHasCompleted]=useState(false)
    let navigate=useNavigate()
    let getChapter=async()=>{
        console.log("Getting Chapter",chapterId)
        let response= await axios.get(`http://127.0.0.1:5000/maritime/educationsystem/getchapter/${courseId}/${chapterId}`)
        let _response=await axios.get(`http://127.0.0.1:5000/maritime/educationsystem/getcourse/${courseId}`)
        if(response.data.success && _response.data.success)
        {
            setInstructorId(_response.data.course.addedBy)
        
           let completedBy=response.data.chapter.completedBy
           let _hasCompleted=false
           for(let user of completedBy)
           {
            if(user.ID==localStorage.getItem("UID"))
            {
                _hasCompleted=true
            }
           }
         
           
           setHasCompleted(_hasCompleted)
           setChapter(response.data.chapter)
           setSuccessfullyFetched(true)
        
        }
    }
    useEffect(()=>{
              
        getChapter()
        
    })
    if(localStorage.getItem("UID")==undefined)
        {
            return(<div className="flex flex-col font-caslonantique h-[400px] w-full sm:w-[320px] md:w-[340px] lg:w-[350px] xl:w-[380px] bg-gray-300 text-white m-auto shadow-lg rounded-sm">
            <h1 className="text-center uppercase">Maritime</h1>
            <p className="text-center font-bold">Welcome To Maritime System.Get Access To Trending Learning And Employment Opportunities Within The Maritime Industry.</p>
            <button className="w-[150px] m-auto rounded-full bg-blue-100 text-white mt-[180px] font-bold text-center" onClick={()=>{
                navigate("/signup")
    
            }}>SIGN UP</button>
            <button  onClick={()=>{
                navigate('/login')
            }} className="w-[150px] bg-blue-100 text-white m-auto rounded-full font-bold text-center">LOGIN</button>
        </div>)
        }
   else if(successfullyFetched && Object.keys(chapter).length>0)
    {
         return(<div className="flex flex-col">
        <video src={chapter.videoUrl} controls={true} height={500} width={550} className="m-auto"></video>
        <h1 className="font-caslonantique uppercase font-bold text-[11px] text-center">{chapter.title}</h1>
        <div className="flex flex-row justify-between">
            {instructorId!=localStorage.getItem("UID")? <Link to={`/chat/${instructorId}`}><button className="text-white bg-orange-400 rounded-full w-[150px] font-caslonantique">Chat With Instructor</button></Link>:<></>}
        
      {instructorId!=localStorage.getItem("UID")? <button className="text-white bg-green-700 rounded-full text-center w-[130px] font-caslonantique" onClick={()=>{
        async function updateProgress()
        {
            let response=await axios.post(`http://127.0.0.1:5000/maritime/educationsystem/updateprogress/${courseId}/${localStorage.getItem("UID")}/${chapterId}`)
            if(response.data.success)
            {
                toast.success("Progress Updated",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                getChapter()
            }
            else
            {
                toast.error("Cannot Update Progress!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
            }
        }
        updateProgress()
       }}>{hasCompleted?"Completed":"Mark As Complete"}</button>:<></>}
      
        </div>
        <h5 className="font-caslonantique text-[11px] text-center">{chapter.description}</h5>
       <div className="flex flex-row w-full sm:w-full md:w-[320px] lg:w-[320px] xl:w-[320px] m-auto">
        <input placeholder="Write Comment" className="font-caslonantique text-[14px] text-center h-[40px] border-2 rounded-full m-auto w-[250px]" ref={commentRef}/>
       <button className="text-white bg-green-700 w-[110px] rounded-full  font-caslonantique font-bold" onClick={()=>{
        async function addComment()
        {
            console.log(commentRef.current.value)
        let response=await axios.post(`http://127.0.0.1:5000/maritime/educationsystem/addcomment/${courseId}/${localStorage.getItem("UID")}/${chapter.ID}`,{text:commentRef.current.value})
        if(response.data.success)
        {
            toast.success("Successfully Commented!",{position:"top-center",style:{fontFamily:"NSimSun",fontWeight:"bold",fontSize:"11px"}})
            getChapter()
        } 
        else
        {
            toast.error("There Was Some Error While Adding Comment!",{position:"top-center",style:{fontFamily:"NSimSun",fontWeight:"bold",fontSize:"11px"}})


        }   
    }
    addComment()
       }}>Post</button>
       </div>
       {chapter.commentedBy.length==0?<h1 className="font-caslonantique text-center">No Comments!</h1>:<div>
        {
            chapter.commentedBy.map((comment)=>{
                return(<div className="flex flex-row justify-between font-caslonantique mt-[5px] w-full sm:full md:w-[400px] lg:w-[400px] xl:w-[400px] m-auto">
                    <img src={comment.userProfilePhotoUrl} className="h-[30px] w-[30px] rounded-full"/>
                    <div className="flex flex-col w-[150px]">
                        <h1 className="font-extrabold">{comment.userName}</h1>
                        <h4>{comment.text}</h4>
                       
                    </div>
                    <h1>{comment.addedON}</h1>
                
                </div>)
            })

        }</div>}
    
       <ToastContainer/>
    </div>)

    }
    else
    {
        <div className="font-caslonantique text-center w-full font-bold">
            Cannot Get Chapter
        </div>
    }

   
}
export default Chapter

/*

*/

