import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Link, useSearchParams } from "react-router-dom"
import storage from "./firebaseConfig"
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import ReactLoading from 'react-loading'
function Job()
{
  
   const {Id}=useParams()
   const[job,setJob]=useState({})
   const[successfullyFetched,setSuccessfullyFetched]=useState(false)
   const[isOpen,setIsOpen]=useState(false)
   const[resumeUrl,setResumeUrl]=useState("")
   let navigate=useNavigate()
   useEffect(()=>{
    async function getJob()
    {
        
         let response=await axios.get(`http://127.0.0.1:5000/maritime/jobportal/getjob/${Id}`)
         if(response.data.success)
         {
             console.log(response.data.job)
             setSuccessfullyFetched(true)
             setJob(response.data.job)
         }
    }
    if(successfullyFetched==false)
    {
    getJob()
    }
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
  else if(successfullyFetched==false)
   {
    <ReactLoading height={50} width={50} color="black"></ReactLoading>

   }
  return(<div className="flex font-caslonantique shadow-lg flex-col  justify-center w-full m-auto sm:w-full md:w-[450px] lg:w-[550px] xl:[550px]">
    <div className="flex flex-col shadow-lg">
    <h1 className="m-auto font-extrabold uppercase">{job.title}</h1>
    
    <p className="font-thin text-[12px] text-center">{job.description}</p>
    </div>
    
    <h2 className="font-extrabold text-[11px] text-center mt-[20px] uppercase ">Requirements And Responsibilities</h2>
    <p className="font-thin text-[12px] text-center">{job.requirementAndResponsibilities}</p>

  
   
    <h2 className="font-extrabold mt-[20px] text-[11px] text-center uppercase ">Perks And Benefits</h2>
    <p className="font-thin text-[12px] text-center">{job.perksAndBenefits}</p>
    <h2 className="font-extrabold text-[12px] mt-[20px] text-center uppercase ">Salary</h2>
    <p className="font-thin text-[12px] text-center">${job.salary}</p>
    <h2 className="font-extrabold text-[11px] mt-[20px] text-center uppercase">Location</h2>
    <p className="font-thin text-[12px] text-center">{job.location}</p>
    <h2 className="font-extrabold text-[11px] mt-[20px] text-center uppercase">CONTRACT TYPE</h2>
    <p className="font-thin text-[12px] text-center">{job.type}</p>
   <Link to={`/profile/${job.uploaderId}`}><div className="flex flex-row w-full sm:w-full md:w-[350px] lg:w-[350px] xl:w[350px]  m-auto mt-[50px] shadow-2xl">
        <div className="h-[35px] w-[35px] mb-[10px] bg-slate-50 rounded-full text-center">
          <img src={job.uploaderPhotoUrl} className="rounded-full h-[30px] w-[30px]"/>
        </div>
        <div className="flex flex-col m-auto">
        <h1 className="text-[13px] font-extrabold">{job.uploaderName}</h1>
        <h4 className="text-[13px]">{job.postedON}</h4>
        </div>
       
        </div>
        </Link>
        <dialog open={isOpen}>
          <div  className="h-[400px] overflow-scroll bg-white w-full flex flex-col shadow-2xl font-caslonantique rounded-full  sm:w-full md:[400px] lg:[450px] xl:[450px] rounded-sm">
            <div className="flex flex-row w-full">
            
            <button className="ml-auto font-caslonantique font-bold" onClick={()=>{setIsOpen(false)}}>Close</button>
            </div>
            <input  type="file" accept=".pdf" className="rounded-full w-full sm:w-full md:w-[300px] lg:w-[300px] xl:w-[300px] border-2" onChange={(e)=>{
              async function uploadResume()
              {
                let selectedFile=e.target.files[0]
               let storageRef=ref(storage,selectedFile.name+Math.random())
               await uploadBytes(storageRef,selectedFile)
              let resumeURL=await getDownloadURL(storageRef)
              setResumeUrl(resumeURL)
              }
              uploadResume()
            }}/>
             {resumeUrl.length==0?<h1 className="font-caslonantique text-center">RESUME Will Appear Here</h1>:<Link className="font-caslonantique font-bold text-center bg-gray-50 rounded-full" target="_blank" to={resumeUrl}>Go To Resume</Link>}
          
            <button onClick={()=>{
              async function apply()
              {
               let response= await axios.post(`http://127.0.0.1:5000/maritime/jobportal//apply/${Id}/${localStorage.getItem("UID")}`,{resumeUrl})
               if(response.data.success)
               {
                toast.success("Successfully Uploaded!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
               }
               else
               {
                toast.error("Cannot Upload Resume!You May Have Applied For This Job Earlier!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
               }

              }
              apply()
            }}>
              <img src="https://tse2.mm.bing.net/th?id=OIP.Md37J5zZ8VkAFVqt8Ied-AHaHa&pid=Api&P=0&h=220" className="h-[50px] w-[70px] m-auto"/>
            </button>
           
          </div>
        </dialog>
        <ToastContainer/>
        {
          localStorage.getItem("UID")==job.uploaderId||localStorage.getItem("role")=="Admin"||localStorage.getItem("role")=="Student"?<></>: <button className="bg-green-700 text-white rounded-2xl font-bold h-[30px] w-[200px] m-auto" onClick={()=>{
            setIsOpen(true)
          }}>Apply</button> 
        }
       
  </div>)  
}
export default Job