import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import ReactLoading from'react-loading'
function Search()
{
  let navigate=useNavigate()
  
  const[searchParams,setSearchParams]=useSearchParams()
  const[searchQuery,setSearchQuery]=useState(searchParams.get("q"))

  const[searchResults,setSearchResults]=useState([])
  const[successfullyFetched,setSuccessfullyFetched]=useState(false)
  let getSearchResults=async()=>{
    let response=await axios.get(`http://127.0.0.1:5000/maritime/jobportal/getjobs`)
      console.log(searchQuery)
      console.log("Query In Lowercase")
      console.log(searchQuery.toLowerCase())
      if(response.data.success)
      {
        let allJobs=response.data.jobs.filter((job)=>{return(job.title.toLowerCase().includes(searchQuery.toLowerCase())||job.description.toLowerCase().includes(searchQuery.toLowerCase()))})
        setSearchResults(allJobs)
        setSuccessfullyFetched(true)
      }
    }
  useEffect(()=>{  
    if(successfullyFetched==false)
    {
      getSearchResults()
    }
  })
  if(successfullyFetched==false)
  {
    return(
    <ReactLoading/>
    )
  }
  else
  {
    return(
    <div className="flex flex-col">
      <div className='w-[250px] mb-[30px]  flex flex-row  m-auto '>
        
        <input placeholder="Search Jobs" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} className="font-caslonantique   text-center rounded-2xl   w-[190px] m-auto h-[35px] text-[13px] border-2 border-black" />
        <button className='mb-[10px] w-[35px]' onClick={()=>{
          getSearchResults()
        }}>
          <img src='https://tse2.mm.bing.net/th?id=OIP.ZS8DWmao41d_V2oGFZ5PzQHaHa&pid=Api&P=0&h=220'className='w-[30px] h-[40px] mt-[10px] rounded-full'/>
         </button>
         
          </div>
          {searchResults.length==0?<h2 className="font-caslonantique font-bold text-center">No Results!</h2>:<div className='flex flex-col w-full mt-[45px]'>
                {
                    searchResults.map((job)=>{
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
export default Search