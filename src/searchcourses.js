import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function SearchCourse()
{
   let [searchParams,setSearchParams]=useSearchParams()
   const[successfullyFetched,setSuccessfullyFetched]=useState(false)
  const[searchQuery,setSearchQuery]=useState(searchParams.get("q"))
   const[searchResults,setSearchResults]=useState([])
   let getSearchResults=async()=>{
    
    let response=await axios.get(`http://127.0.0.1:5000/maritime/educationsystem/getcourses`)
    if(response.data.success)
    {
        console.log("Getting courses")
        let _searchResults=response.data.courses.filter((course)=>{return(course.title.toLowerCase().includes(searchQuery.toLowerCase())||course.description.toLowerCase().includes(searchQuery.toLowerCase())||course.category.toLowerCase().includes(searchQuery.toLowerCase()))})
        setSearchResults(_searchResults)
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
    return(<div className="font-caslonantique font-bold text-center">Cannot Get Results</div>)

   }
   else
   {
    return(<div className="flex flex-col">
         <div className='w-[250px] mb-[30px]  flex flex-row  m-auto '>
        
        <input placeholder="Search Courses" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} className="font-caslonantique   text-center rounded-2xl   w-[190px] m-auto h-[35px] text-[13px] border-2 border-black" />
        <button className='mb-[10px] w-[35px]' onClick={()=>{
          getSearchResults()
        }}>
          <img src='https://tse2.mm.bing.net/th?id=OIP.ZS8DWmao41d_V2oGFZ5PzQHaHa&pid=Api&P=0&h=220'className='w-[30px] h-[40px] mt-[10px] rounded-full'/>
         </button>
         
          </div>
        {searchResults.length==0?<h1 className="font-caslonantique font-bold text-center">No Results!</h1>:searchResults.map((course)=>{
            return(<div className='flex flex-col w-full mt-[10px] h-[300px] m-auto sm:w-full md:w-[450px] lg:w-[460px] xl:w-[460px]  justify-between font-caslonantique shadow-lg'>
            <Link to={`/course/${course.id}`}>
            <img src={course.photoUrl} className='h-[200px] w-full'/>
            <h1 className='font-extrabold text-[15px] uppercase text-center'>{course.title}</h1>
            <div className='flex flex-row justify-between'>
                <img src={course.uploaderPhotoUrl} className='h-[30px] w-[30px] rounded-full'/>
                <h1 className='text-[11px] uppercase font-bold'>{course.uploaderName}</h1>

            </div>
            
            </Link>
            </div>)
        })}
    </div>)


   }
}
export default SearchCourse