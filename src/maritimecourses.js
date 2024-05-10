import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useRef, useState } from 'react';
import axios, { all } from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive'
import ReactLoading from'react-loading'
function MaritimeCourses() {
    let navigate=useNavigate()
    const[searchQuery,setSearchQuery]=useState("")
  let isLargeScreen=useMediaQuery({query:'(min-width:360px)'})
const [isFetched,setIsFetched]=useState(false)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [courses,setCourses]=useState([])
    const[allCourses,setAllCourses]=useState([])
    const[selectedSorting,setSelectedSorting]=useState("None")
    function isLiked(likedBy)
    {
        let hasLiked=false
        for(let user of likedBy)
        {
            if(user.ID==localStorage.getItem("UID"))
            {
                hasLiked=true
            }
        }
        return hasLiked
    }
    let getCourses=async()=>{
        console.log("Getting courses")
        let response= await axios.get("http://127.0.0.1:5000/maritime/educationsystem/getcourses")
        if(response.data.success)
       {
         
         setCourses(response.data.courses)
         setAllCourses(response.data.courses)
        
         setIsFetched(true)
         
       }

    }
    useEffect(()=>{
      
      
      if(isFetched==false)
      {
      getCourses()

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
   else if(isFetched==false)
    {
        return(<ReactLoading width={50} height={50} color='black' className='m-auto'></ReactLoading>)
    }
    else
    {
        
                    return (<div>
                <div className="flex  flex-row justify-between w-[250px] m-auto">
              
              <input onChange={(e)=>{setSearchQuery(e.target.value)}} className='w-[175px] border-2 rounded-full font-caslonantique m-auto text-center' placeholder='Search Courses' />
                  <button className='w-[60px] rounded-full font-caslonantique' onClick={()=>{navigate(`/searchcourses/?q=${searchQuery}`)}}>Search</button>
  
        </div>
        
                <Swiper className='mt-[10px]' modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={4}
                    navigation
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "All" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique", textAlign: "center",fontSize:"13px", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);setCourses(allCourses) }}>All</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Safety&Medical" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"13px", textAlign: "center", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredCourses=allCourses.filter((course)=>{return(course.category=="Safety&Medical")}); setCourses(filteredCourses)}} >Safety&Medical</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Deck" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"13px", textAlign: "center",  borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredCourses=allCourses.filter((course)=>{return(course.category=="Deck")}); setCourses(filteredCourses) }} >Deck</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Engine" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"13px", textAlign: "center",  borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredCourses=allCourses.filter((course)=>{return(course.category=="Engine")}); setCourses(filteredCourses) }} >Engine</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Maritime Law" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"13px", textAlign: "center",  borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredCourses=allCourses.filter((course)=>{return(course.category=="Maritime Law")}); setCourses(filteredCourses) }} >Maritime Law</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Navigation" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"13px", textAlign: "center",  borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredCourses=allCourses.filter((course)=>{return(course.category=="Navigation")}); setCourses(filteredCourses) }} >Navigation</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Security" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"13px", textAlign: "center",  borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredCourses=allCourses.filter((course)=>{return(course.category=="Security")}); setCourses(filteredCourses) }}>Security</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Radio" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"13px", textAlign: "center",  borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredCourses=allCourses.filter((course)=>{return(course.category=="Radio")}); setCourses(filteredCourses) }}>Radio</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Meteorology" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"13px", textAlign: "center",  borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredCourses=allCourses.filter((course)=>{return(course.category=="Meteorology")}); setCourses(filteredCourses) }}>Meteorology</SwiperSlide>
        
                
                </Swiper>
                <div className='flex flex-row w-[150px] mt-[10px]  ml-auto font-caslonantique'>
                    <h1 className='font-bold text-[9px]'>Sort By:</h1>
                    <select className='text-[10px] font-caslonantique' onChange={(e)=>{
                         setSelectedSorting(e.target.value)
                         console.log("Sorting")
                        
                      
                            if(e.target.value=="Latest")
                            {
                                console.log("All courses")
                                setCourses(allCourses.sort((c1,c2)=>{let d1=new Date(c1.postedON);let d2=new Date(c2.postedON); console.log(d1);console.log(d2); if(d1>d2){return -1} else {return 1}}))
                              
                            }
                            else if(e.target.value=="Oldest")
                            {
                                console.log("Oldest")
                                setCourses(allCourses.sort((c1,c2)=>{let d1=new Date(c1.postedON);let d2=new Date(c2.postedON); console.log(d1);console.log(d2); if(d1<d2){return -1} else {return 1}}))

                                
                            }
                            
                        
                            
                            
        
                         
                    }}>
                        <option className='text-[10px] font-bold'>Latest</option>
                        <option className='text-[10px] font-bold'>Oldest</option>
                    </select>
                </div>
                  
                {
                    courses.length==0?<h1 className='font-bold font-caslonantique text-center'>No Courses!</h1>:<div className='grid grid-cols-1 mt-[15px] gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {
                            courses.map((course)=>{
                                return(<div className='flex flex-col  justify-between font-caslonantique shadow-lg'>
                                    <Link to={`/course/${course.id}`}>
                                    <img src={course.photoUrl} className='h-[200px] w-full'/>
                                    <h1 className='font-extrabold text-[15px] uppercase text-center'>{course.title}</h1>
                                    <div className='flex flex-row justify-between'>
                                        <img src={course.uploaderProfilePhotoUrl} className='h-[30px] w-[30px] rounded-full'/>
                                        <h1 className='text-[11px] uppercase font-bold'>{course.uploaderName}</h1>
        
                                    </div>
                                    </Link>
                                    {
                                            course.addedBy==localStorage.getItem("UID")||localStorage.getItem("role")=="Admin"||localStorage.getItem("role")=="Job Seeker"?<></>:<div className='flex flex-row justify-between'>
                                       
                                            
                                            <button className='w-[50px] m-auto' onClick={()=>{
                                                async function likeCourse()
                                                {
                                                   let response=await axios.post(`http://127.0.0.1:5003/educationsystem/course/likecourse/${course.id}/${localStorage.getItem("UID")}`)
                                                if(response.data.success)
                                                {
                                                    toast.success("Successfully Liked!",{position:'top-center',style:{fontFamily:"Alice"}})
                                                    getCourses()
                                                }
                                                else
                                                {
                                                    toast.error("There Was Error While Liking!",{position:"top-center",style:{fontFamily:"Alice"}})
                                                }
                                                }
                                                likeCourse()
                                            }}>
                                            
                                            
                                                {isLiked(course.likedBy)?<img src='https://tse2.mm.bing.net/th?id=OIP.fSWeo0IKhrIGXO__3pR2PQHaHa&pid=Api&P=0&h=220' className='h-[20px] w-[20px]'/>:<img src='https://tse1.mm.bing.net/th?id=OIP.61MLWCmq6WTNfjw8jsEU2gHaHa&pid=Api&P=0&h=220' className='h-[20px] w-[20px]'/>}
                                        </button>    
                                            </div>
                                        }
                                   
                
                                    </div>
                                    
                                    )
                            })
                        }
                    </div>
                }
                    
            <ToastContainer/>
            
        
            </div>)

        }
    }
   

export default MaritimeCourses
/*
*/