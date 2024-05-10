import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
function Applicants()
{
    let navigate=useNavigate()
    const {jobId}=useParams()
    const[applicants,setApplicants]=useState([])
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    useEffect(()=>{
        async function getApplicants()
        {
            console.log(jobId)
            let response=await axios.get(`http://127.0.0.1:5000/maritime/jobportal/getjob/${jobId}`)
            if(response.data.success)
            {
                console.log(response.data.job.appliedBy)
                setSuccessfullyFetched(true)
                setApplicants(response.data.job.appliedBy)
            }
        }
        if(successfullyFetched==false)
        {
            getApplicants()
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
        else 
        {
    return(<div className="flex flex-col">
        {applicants.length==0?<h1 className="font-caslonantique font-bold text-center">No Applicants!</h1>:applicants.map((applicant)=>{
            return(<div className="flex flex-row font-caslonantique justify-between w-full sm:w-full md:w-[350px] lg:w-[400px] xl:w-[450px] m-auto">
                <img src={applicant.profilePhotoUrl} className="h-[30px] w-[30px] rounded-full"/>
                <div className=" flex flex-col w-[200px] m-auto">
                    <h1 className="text-center">{applicant.name}</h1>
                    <Link to={applicant.resumeUrl} target="_blank" className="text-white bg-slate-500 rounded-full text-center">View Resume</Link>
                    <hr></hr>
                </div>
               <Link to={`/chat/${applicant.ID}`} className="text-black rounded-xl w-[80px] text-center"><button>CHAT</button></Link>
               
                </div>)
        })}

    </div>)}
}
export default Applicants