import axios from "axios"
import { useEffect, useState } from "react"
import { usePageContext } from "react-pdf"
import { useNavigate, useParams } from "react-router"
import { ToastContainer, toast } from "react-toastify"
function Chapters()
{
    let navigate=useNavigate()
    const{courseId}=useParams()
    const[uploaderId,setUploaderId]=useState("")
    const[isFetched,setIsFetched]=useState(false)
const[chapters,setChapters]=useState([])
let getChapters=async()=>{
    let response=   await axios.get(`http://127.0.0.1:5000/maritime/educationsystem/getcourse/${courseId}`)
     if(response.data.success)
        {
            console.log(response.data.course.chapters)
            setChapters(response.data.course.chapters)
            setUploaderId(response.data.course.addedBy)
            setIsFetched(true)

        }
}
useEffect(()=>{
    
    if(isFetched==false)
        {
            getChapters()
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
        return(<div className="font-caslonantique text-center m-auto">Error While Getting Chpaters</div>)
    }
    else
    {
        return(<div className="flex flex-col font-caslonantique w-full m-auto shadow-lg sm:w-[380px] md:w-[450x] lg:w-[500px] xl:w-[500px]">
            <h1 className="font-caslonantique text-center">CHAPTERS</h1>
            {chapters.length==0?<h1 className="font-caslonantique text-center">No Chapters!</h1>:chapters.map((chapter)=>{
                return(<div className="flex flex-col rounded-sm mt-[10px]" >
                    <div className="flex flex-col mt-3" onClick={()=>{
                        navigate(`/chapter/${courseId}/${chapter.ID}`)
                    }}>
                    <img src={chapter.photoUrl}/>
                    <h1 className="font-caslonantique text-center">{chapter.title}</h1>
                    <p>{chapter.description}</p>
                    </div>
                    {uploaderId==localStorage.getItem("UID")?<button className="w-[150px] font-caslonantique m-auto text-center mb-[10px] bg-green-700 rounded-full" onClick={()=>{
                        navigate(`/editchapter/${courseId}/${chapter.ID}`)
                    }}>EDIT</button>:<></>}
                    {uploaderId==localStorage.getItem("UID")?<button onClick={()=>{
                        async function deleteChapter()
                        {
                            let response=   await axios.delete(`http://127.0.0.1:5000/maritime/educationsystem/deletechapter/${courseId}/${chapter.ID}`)
                        if(response.data.success)
                            {
                                toast.success("Chapter Has Been Deleted",{position:"top-center"})
                                getChapters()
                            }
                            else
                            {
                                toast.error("There Was An Error While Deleting Chapter")
                            }
                        }
                        deleteChapter()
                    }} className="w-[150px] font-caslonantique m-auto text-center bg-green-700 rounded-full">DELETE</button>:<></>}

                </div>)
            })}
            <ToastContainer/>
        </div>)
    }

}
export default Chapters