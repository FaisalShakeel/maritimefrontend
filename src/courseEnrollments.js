import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Course from "./course"

function CourseEnrollments()
{
    let navigate=useNavigate()
    const{courseId}=useParams()
    const[enrollments,setEnrollments]=useState([])
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    useEffect(()=>{
        async function getEnrollments()
        {
            let response=await axios.get(`http://127.0.0.1:5000/maritime/educationsystem/getcourse/${courseId}`)
            if(response.data.success)
            {
                setSuccessfullyFetched(true)
                setEnrollments(response.data.course.enrolledBy)
            }
        }
        if(successfullyFetched==false)
        {
            getEnrollments()
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
    return(<div className="flex flex-col w-full">
        <h1 className="font-alice m-auto font-bold uppercase">EnrolledBy({enrollments.length})</h1>
        {
            enrollments.length==0?<h1>No EnrollMents!</h1>:enrollments.map((enrolledBy)=>{
                return(<div className="flex flex-row font-alice m-auto w-full justify-between sm:w-full md:w-[300px] lg:w-[300px] xl:w-[300px]">
                    <img src={enrolledBy.profilePhotoUrl} className="h-[30px] w-[30px] rounded-full"/>
                    <h1 className="font-bold uppercase text-[10px]">{enrolledBy.name}</h1>
                   <Link to={`/chat/${enrolledBy.ID}`}><button className="text-[10px] font-extrabold bg-orange-500 rounded-full w-[50px]">CHAT</button></Link>
                </div>)
            })
        }
    </div>)
}
}
export default CourseEnrollments