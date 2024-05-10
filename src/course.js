
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCourse from './store'
function Course()
{
    let navigate=useNavigate()
    const[hasLiked,setHasLiked]=useState(false)
    const[review,setReview]=useState("")
    const [successfullyFetched,setSuccessfullyFetched]=useState(false)
    const [course,setCourse]=useState({})
    const[isEnrolled,setIsEnrolled]=useState(false)
    const {Id}=useParams()
    let getCourse=async()=>{
        let response=await axios.get(`http://127.0.0.1:5000/maritime/educationsystem/getcourse/${Id}`)
        if(response.data.success)
        {

            console.log(response.data.course)
            let enrolledBy=response.data.course.enrolledBy
            console.log(enrolledBy)
            let isEnrolled=false
            for(let user of enrolledBy)
            {
                if(user.ID==localStorage.getItem("UID"))
                {
                    isEnrolled=true
                }
            }
            let likedBy=response.data.course.likedBy
            let _hasLiked=false
            for(let user of likedBy)
            {
                if(user.ID==localStorage.getItem("UID"))
                {
                    _hasLiked=true
                }
            }
            setHasLiked(_hasLiked)
            setIsEnrolled(isEnrolled)
            setCourse(response.data.course)
            console.log(course)
            setSuccessfullyFetched(true)
        }
        

    }
    useEffect(()=>{
        
    if(successfullyFetched==false)
    {
    getCourse()


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
  else if(successfullyFetched && Object.keys(course).length>0)
   { return<div className='flex flex-col'>
    <div className='flex flex-col shadow-lg w-full m-auto sm:w-full md:w-[500px] lg:w-[550px] xl:w-[600px]'>
   <video src={course.introUrl} autoFocus controls={true} height={600} width={370} className='m-auto'></video>
<h1 className='font-caslonantique font-extrabold text-[14px] uppercase text-center'>{course.title}</h1>
<p className='font-caslonantique font-thin text-[15px] text-center'>{course.description}</p>
</div>
{
    localStorage.getItem("UID")==course.addedBy||localStorage.getItem("role")=="Admin"||localStorage.getItem("role")=="Job Seeker"?<></>:<button className='flex flex-row mt-[35px] w-[150px] text-center m-auto shadow-xl bg-slate-50 shadow-white rounded-full font-caslonantique' onClick={()=>{
        async function likeCourse()
        {
       let response=    await axios.post(`http://127.0.0.1:5000/maritime/educationsystem/likecourse/${Id}/${localStorage.getItem("UID")}`)
       if(response.data.success)
       {
        toast.success("Success",{position:"top-center",style:{fontFamily:"Caslon Antique",fontWeight:"bold"}})
        getCourse()
       }
       else
       {
        toast.error("There Was An Error!",{position:"top-center",style:{fontFamily:"Caslon Antique",fontWeight:"bold"}})
       }
        }
        likeCourse()
    }}>
        <h1 className='text-[9px] uppercase font-bold m-auto'>
            {hasLiked?"Added To Wishlist":"Add To Wishtlist"}
        </h1>
        <img className='h-[13px] w-[13px] mr-[5px]' src={hasLiked?"https://tse2.mm.bing.net/th?id=OIP.fSWeo0IKhrIGXO__3pR2PQHaHa&pid=Api&P=0&h=220":"https://tse1.mm.bing.net/th?id=OIP.61MLWCmq6WTNfjw8jsEU2gHaHa&pid=Api&P=0&h=220"}/>
    </button>
}
{
 localStorage.getItem("UID")==course.addedBy||localStorage.getItem("role")=="Admin"||localStorage.getItem("role")=="Job Seeker"?<></>:<button disabled={isEnrolled} className='text-white bg-green-500 w-[150px] text-center mt-[20px] mb-[20px] rounded-full m-auto font-caslonantique font-semibold text-[10px]' onClick={()=>{
    async function enrollInCourse()
    {
     let response=await axios.post(`http://127.0.0.1:5000/maritime/educationsystem/enroll/${Id}/${localStorage.getItem("UID")}`)
     if(response.data.success)
     {
        getCourse()
        toast.success("Successfully Enrolled!",{position:"top-center"})
     }
     else
     {
        toast.error("There Was Error While Enrolling In The Course",{position:"top-center"})
     }
    }
    enrollInCourse()
}}>{isEnrolled?<div className='flex flex-row justify-center'>
    <h1>ENROLLED</h1>
    <img src='https://tse4.mm.bing.net/th?id=OIP.tT6a3_OHZk04dvNTxWHJvQHaHa&pid=Api&P=0&h=220' className='h-[13px] w-[13px] rounded-full'/>
</div>:"ENROLL NOW"}</button>   
}


<hr></hr>
{localStorage.getItem("UID")==course.addedBy||localStorage.getItem("role")=="Admin"||localStorage.getItem("role")=="Job Seeker"?<></>:<div className='flex flex-col shadow-xl shadow-gray-50 w-full sm:w-full md:w-[500px] lg:w-[550px] xl:w-[600px] m-auto'>
<h1 className='font-caslonantique text-[11px] text-center mt-[20px] font-bold'>CHAPTERS</h1>
{
    isEnrolled==false?<h1 className='font-caslonantique text-center'>Chapters Will Appear Here When You Are Enrolled</h1>:<button className='m-auto w-[160px] font-caslonantique rounded-full bg-green-600 text-white text-center' onClick={()=>{
      navigate(`/chapters/${course.id}`)  
    }}>View Chapters</button>}
    </div>}

<hr></hr>

<div className='flex flex-col shadow-xl w-full mt-[20px] sm:w-full md:w-[400px] lg:w-[400px] xl:w-[400px] m-auto'>
 
<Link to={`/profile/${course.addedBy}`}><div className='flex flex-row mt-[10px]  justify-between font-caslonantique m-auto w-full sm:w-full md:w-[350px] lg:w-[350px] xl:w-[350px]'>
    <img src={course.uploaderProfilePhotoUrl} className='h-[60px] w-[60px] rounded-full'/>
    
        <h1 className='font-bold text-[13px]'>{course.uploaderName}</h1>

    
    <h1 className='text-[12px]'>{course.postedON}</h1>
</div>
</Link>
</div>
<div className='flex flex-col shadow-lg'>
<h1 className='font-caslonantique font-bold text-[11px mt-[20px]  text-center'>REVIEWS</h1>

  <div className='flex flex-row w-full sm:w-full md:w-[270px] lg:w-[270px] xl:w-[270px] m-auto'>
  <input className='font-caslonantique text-center  rounded-full h-[30px] border-2 w-[260px] ' placeholder='Write Review' onChange={(e)=>{
    setReview(e.target.value)
  }}/>
  <button onClick={()=>{
    async function addReview()
    {
        console.log("Adding Review")
     let response=await axios.post(`http://127.0.0.1:5000/maritime/educationsystem/addreview/${Id}/${localStorage.getItem("UID")}`,{review})
     if(response.data.success)
     {
        toast.success("Succesffully Review Added!",{position:"top-center",style:{fontFamily:"NSimSun",fontWeight:"bold"}})
        getCourse()

     }
     else
     {
        toast.error("There Was Error While Adding Review!",{position:"top-center",style:{fontFamily:"NSimSun",fontWeight:"bold"}})

     }

    }
    addReview()
  }} >
    <img src='https://tse2.mm.bing.net/th?id=OIP.a3k0WRzI2HvcPg3MqLj8PAHaGv&pid=Api&P=0&h=220' className='h-[20px] w-[20px]'/>
  </button>
 
    </div>
{
    course.reviews.length==0?<h1 className='font-caslonantique text-center'>No Reviews</h1>:<div ><Swiper modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={4}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}>
        {
            course.reviews.map((review)=>{
                return(<SwiperSlide className='shadow-2xl'>
                    <div className='flex flex-row shadow-lg shadow-white h-[200px] font-caslonantique justify-between'>
                        <img className='h-[30px] w-[30px] rounded-full' src={review.userProfilePhotoUrl}/>
                        <div className='flex flex-col m-auto'>
                            <h1 className='font-bold'>{review.userName}</h1>
                            <h4>{review.text}</h4>
                            <h4 className='mt-auto'>{review.addedON}</h4>
                        </div>
                        <hr></hr>
                        
                    </div>
                </SwiperSlide>)
            })
        }

    </Swiper>
    </div>
   }
   </div>
    
   <h1 className='font-caslonantique text-[11px] underline text-center font-bold'>RELATED COURSES</h1>
<ToastContainer/>
</div>

   }
   else
   {
    <div>There Was Some Error;</div>
   }
   
}
export default Course

/*
*/