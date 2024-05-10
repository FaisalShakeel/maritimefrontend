import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive'
function Jobs() {
    let navigate=useNavigate()
    let isLargeScreen=useMediaQuery({query:'(min-width:360px)'})
    const[selectedLocation,setSelectedLocation]=useState("All")
    const[selectedVesselType,setVesselType]=useState("All")
    const[selectedContractType,setContractType]=useState("All")
    const [successfullyFetched,setSuccessfullyFetched]=useState(false)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const[searchQuery,setSearchQuery]=useState("")
    const [jobs,setJobs]=useState([])
    const[allJobs,setAllJobs]=useState([])
    let getJobs=async()=>{
      let response=  await axios.get("http://127.0.0.1:5000/maritime/jobportal/getjobs")
      if(response.data.success)
      {
        console.log(response.data.jobs)
        setSuccessfullyFetched(true)
        
        setAllJobs(response.data.jobs)
        setJobs(response.data.jobs)
      }
      else
      {
        setSuccessfullyFetched(false)
      }
    }
    useEffect(()=>{
  

        if(successfullyFetched==false)
        {
            getJobs()
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
    return<div className='h-[70px] w-[70px] m-auto'>
    <ReactLoading color='black' type='spin' height={60} width={60}></ReactLoading>
    </div>
    }
    else 
    {
        

            return (<div>
                <div className="flex  flex-row justify-between w-[250px] m-auto">
              
                <input onChange={((e)=>{setSearchQuery(e.target.value)})} className='w-[175px] border-2 rounded-full font-caslonantique m-auto text-center' placeholder='Search Jobs' />
                    <button onClick={()=>{
                        navigate(`/search/?q=${searchQuery}`)
                    }} className='w-[60px] rounded-full font-caslonantique'>Search</button>
    
          </div>
        
                <Swiper className='mt-[10px]' modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={4}
                    navigation
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "All" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"12px", textAlign: "center", fontWeight: "bold", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);setJobs(allJobs) }}>All</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Master" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"12px", textAlign: "center", fontWeight: "bold", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredJobs=allJobs.filter((job)=>{return(job.category.toLowerCase()=="master")}); setJobs(filteredJobs) }} >Master</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Safety Officer" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"12px", textAlign: "center", fontWeight: "bold", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredJobs=allJobs.filter((job)=>{return(job.category.toLowerCase()=="safety officer")}); setJobs(filteredJobs) }}>Safety Officer</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Able Seaman" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"12px", textAlign: "center", fontWeight: "bold", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredJobs=allJobs.filter((job)=>{return(job.category.toLowerCase()=="able seaman")}); setJobs(filteredJobs) }} >Able Seaman</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Carpenter" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"12px", textAlign: "center", fontWeight: "bold", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredJobs=allJobs.filter((job)=>{return(job.category.toLowerCase()=="carpenter")}); setJobs(filteredJobs) }} >Carpenter</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Motorman" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"12px", textAlign: "center", fontWeight: "bold", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredJobs=allJobs.filter((job)=>{return(job.category.toLowerCase()=="motorman")}); setJobs(filteredJobs) }} >Motorman</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Cook" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"12px", textAlign: "center", fontWeight: "bold", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredJobs=allJobs.filter((job)=>{return(job.category.toLowerCase()=="ccok")}); setJobs(filteredJobs) }}>Cook</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Deck Cadget" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"12px", textAlign: "center", fontWeight: "bold", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredJobs=allJobs.filter((job)=>{return(job.category.toLowerCase()=="deck cadget")}); setJobs(filteredJobs) }} >Deck Cadget</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "Plumber" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"12px", textAlign: "center", fontWeight: "bold", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredJobs=allJobs.filter((job)=>{return(job.category.toLowerCase()=="plumber")}); setJobs(filteredJobs) }} >Plumber</SwiperSlide>
                    <SwiperSlide style={{ backgroundColor: selectedCategory == "IT Officer" ? "gray" : "black", color: "white", fontFamily: "Caslon Antique",fontSize:"12px", textAlign: "center", fontWeight: "bold", borderRadius: "8px" }} onClick={(e) => { setSelectedCategory(e.target.textContent);let filteredJobs=allJobs.filter((job)=>{return(job.category.toLowerCase()=="it officer")}); setJobs(filteredJobs) }}>IT Officers</SwiperSlide>
                </Swiper>
                <div className='flex flex-col m-auto w-full sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between'>
                <div className='flex flex-row m-auto font-caslonantique w-[150px] bg-gray-100 rounded-full'>
                    <h1 className='text-[19px] w-[50px] font-bold '>Location:</h1>
                    <select className='w-[100px]' onChange={(e)=>{
                        console.log(e.target.value)
                        setSelectedLocation(e.target.value)
                    }}>
                        <option className='text-[11px]'>All</option>
                        <option className='text-[11px]'>United States</option>
                        <option className='text-[11px]'>Spain</option>
                        <option className='text-[11px]'>Pakistan</option>
                        <option className='text-[11px]'>England</option>
                        
                    </select>
    
                </div>
                <div className='flex flex-row m-auto font-caslonantique justify-between w-[150px]'>
                    <h1 className='text-[17px] w-[50px] font-bold'>Vessel Type:</h1>
                    <select className='w-[100px]' onChange={(e)=>{
                        setVesselType(e.target.value)
                    }}>
                        <option className='text-[10px]'>All</option>
                        <option className='text-[10px]'>Bulk Carrier</option>
                        <option className='text-[10px]'>Chemical Tanker</option>
                        <option className='text-[10px]'>OffShore Vessel</option>
                        <option className='text-[10px]'>Sailing Vessel</option>
                        <option className='text-[10px]'>Tug</option>
                        <option className='text-[10px]'>Yachat</option>
                        
                    </select>
                    
    
                </div>
                <div className='flex flex-row m-auto font-caslonantique w-[150px]'>
                    <h1 className='text-[17px] w-[50px] font-bold mt-[14px]'>TYPE:</h1>
                    <select className='w-[100px] mt-[10px]' onClick={(e)=>{
                        setContractType(e.target.value)
                    }}>
                        <option className='text-[11px]'>All</option>
                        <option className='text-[11px]'>Permanent</option>
                        <option className='text-[11px]'>Temporary</option>
                
                    </select>
    
                </div>
                <button className='font-caslonantique m-auto bg-gray-100 rounded-full w-[100px] text-black' onClick={()=>{
                    function filterJobs()
                    {
                        console.log(selectedLocation)
                        console.log(selectedContractType)
                        console.log(selectedVesselType)
                        let _allLocationsSelected=false
                        let allContractTypesSelected=false
                        let allVesselTypesSelected=false
                        if(selectedVesselType=="All")
                        {
                            allVesselTypesSelected=true
                        }
                        if(selectedContractType=="All")
                        {
                            allContractTypesSelected=true
                        }
                        if(selectedLocation=="All")
                        {
                        _allLocationsSelected=true
                            
                        }
                         let filteredJobs=allJobs.filter((job)=>{
                            if(_allLocationsSelected==true)
                            {
                                return true
                            }
                            else
                            {
                           return(job.location.toLowerCase()==selectedLocation.toLowerCase())
                            }
                        })
                        let _filteredJobs=filteredJobs.filter((job)=>{
                            if(allContractTypesSelected)
                            {
                                return true
                            }
                            else
                            {
                                return(job.type.toLowerCase()==selectedContractType.toLowerCase())
                            }
                        })
                        console.log("Jobs After Contact Filter")
                        console.log(_filteredJobs)
                        let __filteredJobs=_filteredJobs.filter((job)=>{
                            if(allVesselTypesSelected)
                            {
                                return true
                            }
                            else
                            {
                                return(job.vesselType.toLowerCase()==selectedVesselType.toLowerCase())
                            }
                        })
                        console.log("Jobs After Vessel Type Filter")
                        console.log(__filteredJobs)
                        setJobs(__filteredJobs) 
                    }
                    filterJobs()
                }}>Filter</button>      
                </div>
               <hr></hr>
               {jobs.length==0?<div className='font-caslonantique font-bold text-center w-full'>NO JOBS</div>:<div className='flex flex-col w-full mt-[45px]'>
                    {
                        jobs.map((job)=>{
                            return(
                               <Link to={`/job/${job.id}`}> <div  key={job.Id} className='flex flex-row bg-neutral-50 m-auto w-full h-[150px] mt-[10px] sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/2 '>
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
                
                </div>
               }
                
        
            </div>)

        }
        
       

    
   
}
export default Jobs