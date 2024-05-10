import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { toast, useToast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
function Home() {
    let navigate=useNavigate()
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
    return(<div className='flex flex-col'>
        <div className='flex flex-col shadow-lg'>
         {localStorage.getItem("UID")==undefined?<h1 className='font-caslonantique font-bold text-center'>MARITIME</h1>:<div className='flex flex-row w-full  h-[40px] justify-between'>
        <Link to={`/notifications`} className='mt-[10px]'><button>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmmag3cBmYqrweGwrsL5h4RL5UqpSi9z275w&usqp=CAU" className="h-[30px] w-[35px] ml-[10px]" />
                    </button></Link>
                    <Link to={`/conversations`} className='rounded-full mt-[12px] w-[50px] ml-[20px]'><button>
                        <img src="https://tse2.mm.bing.net/th?id=OIP.Thm2v7WpQ_FlDQQJZFbkrAHaHa&pid=Api&P=0&h=220" className="h-[27px] w-[30px]  rounded-full" />
                    </button>
                    </Link> 
                   <Link to={`/profile/${localStorage.getItem("UID")}`} className='rounded-full ml-[10px] mt-[5px]'><button>
                        <img src={localStorage.getItem("profilePhotoUrl")} className="h-[38px] w-[38px] ml-[10px ] rounded-full" />
                    </button></Link>
        </div>}
     {localStorage.getItem("UID")==undefined?<button className='w-[35px] mt-[10px] m-auto' onClick={()=>{
        navigate('/signupandlogin')
     }}>
        <img src='https://tse1.mm.bing.net/th?id=OIP.GH2wertomtvN8Wr1G9vDXwHaHa&pid=Api&P=0&h=220' />
     </button>:<button className='w-[35px] mt-[10px] ml-auto' onClick={()=>{
            navigate("/signupandlogin")
        }}>
            <img src='https://tse1.mm.bing.net/th?id=OIP.GH2wertomtvN8Wr1G9vDXwHaHa&pid=Api&P=0&h=220' className='h-[27px] w-[30px]'/>
        </button>
     }   

        </div>
        <h1 className='text-center font-caslonantique'>MARITIME</h1>
        <p className='font-caslonantique'>
        Transportation & Logistics›
Water Transport
Maritime industry in the United States (U.S.) - statistics & facts
Like many countries deeply embedded in the international trade system, the United States (U.S.) depends on maritime transport for imports and exports of many vital commodities and products. Underscored by its geographical location, the U.S. relies heavily on ships to secure the trade flows between itself and its partners. Nearly 69 percent of all the goods traded by the U.S. are transported via waterways, predominantly by seagoing vessels. In terms of value, ships transport over 41 percent of the total value of goods traded by the U.S.

The U.S. merchant fleet comprised nearly 1,800 ships in 2022. Their combined carrying capacity reached more than 54.3 million deadweight tons that year. Globally, the U.S. operated 2.6 percent of the world merchant fleet and ranked 11th behind seafaring nations like Greece, China, and Japan.
Slight decrease in cargo throughput in 2020
In 2020, more than 2.2 billion short tons of cargo passed through U.S. ports, a decrease of almost six percent compared with 2019. The Atlantic coast was the main gateway for the U.S.
        </p>
        <div className='h-[500px] w-[280px] m-auto shadow-sm bg-gray-100 rounded-sm'>
            <img src='https://tse2.mm.bing.net/th?id=OIP.5hH135ux0e28EvbK0wiUrQHaEK&pid=Api&P=0&h=220' className='w-full rounded-lg h-[300px]'/>
            <p className='text-center font-caslonantique'>Find The Ever New Learning And Employment Opportunities In Maritiem Industry.</p>
            <button onClick={()=>{navigate("/courses")}} className='w-full text-white font-bold text-center bg-blue-600 rounded-lg font-caslonantique mt-[80px]'>View Courses</button>
            <button onClick={()=>{navigate("/jobs")}} className='w-full text-white font-bold text-center bg-blue-600 rounded-lg font-caslonantique'  >View  Jobs</button>
            </div> 

    </div>)


    }
}

   

export default Home