import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import ReactLoading from'react-loading'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Profile()
{
    let navigate=useNavigate()
    const[accessDenied,setAccessDenied]=useState(false)
    const {Id}=useParams()
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    const [user,setUser]=useState({})
    const [jobs,setJobs]=useState([])
    const[coursesInProgress,setCoursesInProgress]=useState([])
    const[wishList,setWishlist]=useState([])
    const[completedCourses,setCompletedCourses]=useState([])
    const[myCourses,setMyCourses]=useState([])
    const [appliedFor,setAppliedFor]=useState([])
    let getProfile=async()=>{
        console.log(Id)
        let response=await axios.get(`http://127.0.0.1:5000/maritime/user/getprofile/${Id}/${localStorage.getItem("token")}`)
        if(response.data.success &&response.data.user.role=="Admin")
        {
            setUser(response.data.user)
            console.log(response.data.MyCourses)
            setMyCourses(response.data.MyCourses)
            setJobs(response.data.MyJobs)
            setSuccessfullyFetched(true)
        }
        else if(response.data.success &&response.data.user.role=="Job Seeker")
        {
            setUser(response.data.user)
            setAppliedFor(response.data.appliedFor)
            setSuccessfullyFetched(true)
        }
        else if(response.data.success &&response.data.user.role=="Student")
            {
                console.log(response.data.user)
                console.log(response.data.wishlist)
                console.log(response.data.InProgress)
                console.log(response.data.completedCourses)
            setUser(response.data.user)
            setWishlist(response.data.wishlist)
            setCoursesInProgress(response.data.InProgress)
            setCompletedCourses(response.data.completedCourses) 
            setSuccessfullyFetched(true)   
            }
            
        else if(response.data.success==false && response.data.accessDenied)
        {
            setAccessDenied(true)

        }


    }
    useEffect(()=>{
        if(successfullyFetched==false)
        {
            getProfile()
        
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
    else if(accessDenied)
    {
        return(<div className="font-caslonantique text-center font-bold">Access Denied</div>)
    }
   else if(successfullyFetched==false)
    {
        return (<div className="m-auto w-[20px]">
            <ReactLoading color="black" type='spin' width={50}  className="m-auto" height={50}></ReactLoading>
        </div>)
    }
    else if(successfullyFetched &&user.role=="Admin")
    {
        return ( <div className='flex flex-col w-full'>
           <div className="flex flex-row font-caslonantique justify-between w-full m-auto sm:w-full md:w-[400px] lg:w-[450px] xl:w-[500px]">
                    <img src={user.photoUrl} className="h-[30px] w-[30px] rounded-full"/>
                    <div className="flex flex-col">
                        <h1 className="font-extrabold">{user.name}</h1>
                        <h5>{user.bio}</h5>
                    </div>
                    {
                        Id==localStorage.getItem("UID")?<Link to={`/editprofile/${Id}`}><button className="bg-gray-100 w-[90px] font-bold rounded-full font-caslonantique h-[25px]">Edit</button></Link>:<div></div>
                    }
                </div>
                {Id==localStorage.getItem("UID")?<button className="bg-gray-100 w-[140px] rounded-full font-caslonantique mt-[10px] mb-[5px] font-bold m-auto" onClick={()=>{
                    localStorage.removeItem("UID")

                    navigate("/")
                    
                }}>Log Out</button>:<></>}
                {Id==localStorage.getItem("UID")?<Link to={`/postjob`} className="m-auto"><button className="font-caslonantique rounded-full font-bold text-[14px] w-[160px] m-auto bg-gray-100">Post Job</button></Link>:<></>}
                {Id==localStorage.getItem("UID")?<Link to={`/addcourse`} className="m-auto"><button className="font-caslonantique rounded-full font-bold text-[14px] w-[160px] m-auto bg-gray-100">Add Course</button></Link>:<></>}



         {
                myCourses.map((course)=>{
                    return(<div className="flex flex-col justify-between w-full sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] m-auto">
                        <Link to={`/course/${course.id}`}>
                        
                        <img src={course.photoUrl} className="h-[200px] m-auto"/>
                        <h1 className="font-caslonantique font-extrabold text-center uppercase text-[10px]">{course.title}</h1>
                        <div className="flex flex-row justify-between">
                            <img src={course.uploaderProfilePhotoUrl} className="h-[40px] w-[40px] rounded-full"/>
                            <h2 className="font-caslonantique uppercase font-bold text-[11px]">{course.uploaderName}</h2>
    
                        </div>
                    
                                                    
                            
                        
                       </Link>

                        {course.addedBy==localStorage.getItem("UID")?<Link to={`/addchapter/${course.id}`} className="m-auto"><button className="text-white bg-green-700 font-caslonantique w-[200px] rounded-full m-auto">Add Chapter</button></Link>:<></>}
                        {course.addedBy==localStorage.getItem("UID")?<Link to={`/chapters/${course.id}`} className="m-auto mt-3"><button className="text-white bg-green-700 font-caslonantique w-[200px] rounded-full m-auto">View Chapters</button></Link>:<></>}
                       
                        {course.addedBy==localStorage.getItem("UID")?<Link to={`/editmaritimecourse/${course.id}`} className="m-auto mt-[5px]"><button className="text-white bg-green-700 rounded-full w-[200px]  m-auto font-caslonantique font-bold">Edit</button></Link>:<></>}
                        {course.addedBy==localStorage.getItem("UID")?<button onClick={()=>{
                            async function deleteCourse()
                            {
                                let response=await axios.delete(`http://127.0.0.1:5000/maritime/educationsystem/deletecourse/${course.id}`)
                                if(response.data.success)
                                    {
                                        toast.success("Course Successfully Deleted")
                                    }
                                    else
                                    {
                                        toast.error("There Was An Error While Deleting The Course")
                                    }
                            }
                            deleteCourse()
                        }} className="text-white bg-green-700 font-caslonantique w-[200px] rounded-full m-auto mt-3">Delete</button>:<></>}

                        {course.addedBy==localStorage.getItem("UID")?<Link to={`/courseenrollments/${course.id}`} className="m-auto"><button className="text-white bg-green-700 font-caslonantique mt-3 w-[200px] rounded-full m-auto">EnrolledBy({course.enrolledBy.length})</button></Link>:<></>}
                        </div>)
                })
            }
    
        {
            jobs.map((job)=>{
                return(
                   <div  key={job.id} className='flex flex-col justify-between bg-neutral-50 m-auto w-full h-[150px] mt-[10px] sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/2 '>
                 <Link to={`/job/${job.id}`}>
                  <div className="flex flex-row">
                    
                  <img src={job.companyLogoUrl} className='h-[50px] w-[50px] rounded-full'/>
                  <h1 className='font-semibold text-center m-auto font-caslonantique text-[11px]'>{job.title.toUpperCase()}</h1>



                  </div>
                    <div className='flex flex-col justify-between w-full'>
                    <div className='flex flex-row justify-between'>
                    <h2 className='font-thin font-caslonantique text-[12px]'>{job.location}</h2>
                    <h3 className='font-thin  font-caslonantique text-[12px]'>{job.postedON}</h3>
                    </div>
                    <div className='flex flex-row justify-between'>
                    <h1 className='font-thin font-caslonantique text-[12px]'>{job.type}</h1>
                    <h1 className='font-thin text-[12px] font-caslonantique'>${job.salary}</h1>
                    </div>

                    </div>
                    </Link>
                    {
                        Id==localStorage.getItem("UID")?<div className="flex flex-row justify-between"><Link to={`/editjob/${job.id}`} className="font-caslonantique font-bold bg-gray-100 text-black w-[80px] rounded-full text-center">Edit</Link><button onClick={()=>{
                            async function deleteJob()
                            {
                                let response=await axios.delete(`http://127.0.0.1:5000/maritime/jobportal/deletejob/${job.id}`)
                                if(response.data.success)
                                {
                                    toast.success("Successfully Deleted!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                                getProfile()
                                }
                                else
                                {
                                    toast.error("There Was An Error While Deleting Job!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                                }
                            }
                            deleteJob()
                        }} className="text-black bg-gray-100 w-[100px] rounded-full text-center font-bold  font-caslonantique">Delete</button></div>:<></>
                    }
                    {
                        Id==localStorage.getItem("UID")?<Link to={`/applicants/${job.id}`} className="text-black bg-gray-100 rounded-full w-[150px] font-caslonantique m-auto font-bold text-center"><h1>Applicants({job.appliedBy.length})</h1></Link>:<></>
                    }
                    
                 </div>
                 
                )
            })
        }
        <ToastContainer/>
    
    </div>
)
    }
    else if(successfullyFetched&&user.role=="Student")
        {
         return(<div className="flex flex-col">
         <ToastContainer/>
             <div className='flex flex-row justify-between font-caslonantique m-auto w-full sm:w-[230px] md:w-[230px] lg:w-[230px] xl:w-[230px]'>
     <img src={user.photoUrl} className='h-[40px] w-[40px] rounded-full'/>
 
     <div className='flex flex-col'>
         <h1 className='font-bold text-[11px]'>{user.name}</h1>
         <p className='text-[10px]'>{user.bio}</p>
     </div>
     {Id==localStorage.getItem("UID")?<Link to={`/editprofile/${Id}`}><button className="font-caslonantique font-bold w-[50px]">Edit</button></Link>:<></>}
     
    
 </div> 
 {Id==localStorage.getItem("UID")?<button onClick={()=>{
     localStorage.removeItem("UID")
     navigate("/")
 }} className="text-white bg-slate-300 mt-[10px] mb-[10px] rounded-full w-[150px] font-caslonantique text-center m-auto">Logout</button>:<></>} 
 <Tabs className="m-auto">
     <TabList className="font-caslonantique">
         <Tab>Courses</Tab>
         <Tab>WishList</Tab>
     </TabList>
     <TabPanel>
         <Tabs>
             <TabList className="font-caslonantique">
                 <Tab>In Progress</Tab>
                 <Tab>Completed</Tab>
             </TabList>
             <TabPanel>
             {coursesInProgress.length==0?<h1 className="font-caslonantique text-center font-bold">No Courses </h1>: <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
         {
            coursesInProgress.map((course)=>{
                 return(<Link to={`/course/${course.id}`}><div className="flex flex-col justify-between shadow-xl">
                     <img src={course.photoUrl} className="h-[150px]"/>
                     <h1 className="font-caslonantique font-extrabold text-center uppercase text-[10px]">{course.title}</h1>
                     <div className="flex flex-row justify-between">
                         <img src={course.uploaderProfilePhotoUrl} className="h-[40px] w-[40px] rounded-full"/>
                         <h2 className="font-caslonantique uppercase font-bold text-[11px]">{course.uploaderName}</h2>
 
                     </div>
                     
                          
                     </div></Link>)
             })
         }
 
     </div>}
             </TabPanel>
             <TabPanel>
             {completedCourses.length==0?<h1 className="font-caslonantique text-center font-bold">No Completed Courses!</h1>: <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
         {
            completedCourses.map((course)=>{
                 return(<Link to={`/course/${course.id}`}><div className="flex flex-col justify-between shadow-xl">
                     <img src={course.photoUrl} className="h-[150px]"/>
                     <h1 className="font-caslonantique font-extrabold text-center uppercase text-[10px]">{course.title}</h1>
                     <div className="flex flex-row justify-between">
                         <img src={course.uploaderProfilePhotoUrl} className="h-[40px] w-[40px] rounded-full"/>
                         <h2 className="font-caslonantique uppercase font-bold text-[11px]">{course.uploaderName}</h2>
 
                     </div>
                     
                    
                          
                     </div></Link>)
             })
         }
 
     </div>}
             </TabPanel>
 
         </Tabs>
     </TabPanel>
     <TabPanel>
         {wishList.length==0?<h1 className="font-caslonantique text-center font-bold">No Courses In Wishlist!</h1>: <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
         {
            wishList.map((course)=>{
                 return(<Link to={`/course/${course.id}`}><div className="flex flex-col justify-between shadow-lg">
                     <img src={course.photoUrl} className="h-[150px]"/>
                     <h1 className="font-caslonantique font-extrabold text-center uppercase text-[10px]">{course.title}</h1>
                     <div className="flex flex-row justify-between">
                         <img src={course.uploaderProfilePhotoUrl} className="h-[40px] w-[40px] rounded-full"/>
                         <h2 className="font-caslonantique uppercase font-bold text-[11px]">{course.uploaderName}</h2>
 
                     </div>
                     
                         
                          
                     </div></Link>)
             })
         }
 
     </div>}
     </TabPanel>
 </Tabs>
 
 
         </div>)

        }
    else if(successfullyFetched &&user.role=="Job Seeker")
    {
        return(
            <div className='flex flex-col w-full'>
                <div className="flex flex-row font-caslonantique justify-between w-full m-auto sm:w-full md:w-[400px] lg:w-[450px] xl:w-[500px]">
                    <img src={user.photoUrl} className="h-[30px] w-[30px] rounded-full"/>
                    <div className="flex flex-col">
                        <h1>{user.name}</h1>
                        <h5>{user.bio}</h5>
                    </div>
                    {
                        Id==localStorage.getItem("UID")?<Link to={`/editprofile/${Id}`}><button>Edit</button></Link>:<></>
                    }
                </div>
                {Id==localStorage.getItem("UID")?<button className="bg-gray-100 w-[140px] rounded-full font-caslonantique mt-[10px] mb-[5px] font-bold m-auto" onClick={()=>{
                    localStorage.removeItem("UID")
                    
                    navigate("/home")
                    
                }}>LogOut</button>:<></>}
            {
                appliedFor.map((job)=>{
                    return(
                       <Link to={`/job/${job.id}`}> <div  key={job.id} className='flex flex-row bg-neutral-50 m-auto w-full h-[150px] mt-[10px] sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/2 '>
                        <img src={job.companyLogoUrl} className='h-[50px] w-[50px] rounded-full'/>
                        <div className='flex flex-col justify-between w-full'>
                        <h1 className='font-semibold text-center font-caslonantique text-[11px]'>{job.title.toUpperCase()}</h1>
                        <div className='flex flex-row justify-between'>
                        <h2 className='font-thin font-caslonantique text-[12px]'>{job.location}</h2>
                        <h3 className='font-thin  font-caslonantique text-[12px]'>{job.postedON}</h3>
                        </div>
                        <div className='flex flex-row justify-between'>
                        <h1 className='font-thin font-caslonantique text-[12px]'>{job.type}</h1>
                        <h1 className='font-thin text-[12px] font-caslonantique'>${job.salary}</h1>
                        </div>
                        </div>
                     </div>
                     </Link>
                    )
                })
            }
       <ToastContainer/> 
        </div>

        )

    }
   
}
export default Profile