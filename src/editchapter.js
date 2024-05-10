import axios from "axios"
import { useEffect,useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {ref,getDownloadURL,uploadBytes} from 'firebase/storage'
import storage from "./firebaseConfig"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function EditChapter()
{
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const[videoUrl,setVideoUrl]=useState("")
    const[photoUrl,setPhotoUrl]=useState("")
    const{courseId,chapterId}=useParams()
    let navigate=useNavigate()
    useEffect(()=>{
        async function getChapter()
        {
            let response=await axios.get(`http://127.0.0.1:5000/maritime/educationsystem/getchapter/${courseId}/${chapterId}`)
            if(response.data.success)
            {
                setTitle(response.data.chapter.title)
                setDescription(response.data.chapter.description)
                setVideoUrl(response.data.chapter.videoUrl)
                setPhotoUrl(response.data.chapter.photoUrl)
                setSuccessfullyFetched(true)
            

            }
        }
        if(successfullyFetched==false)
        getChapter()
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
    {return(<div className="flex flex-col w-full sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 m-auto font-caslonantique bg-slate-50">
        
        <input value={title} onChange={(e)=>{setTitle(e.target.value)}}  className="border-2 rounded-full   text-center" placeholder="Title"/>
        <textarea value={description} rows={4} cols={4} className="border-2 rounded-sm   text-center" placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
        <div className="flex flex-col h-[100px]">
            <h1 className="text-center font-extrabold">PHOTO</h1>
            <input type="file" accept=".jpg" className="font-extrabold border-2 border-black rounded-2xl text-center" onChange={(e)=>{
                async function getPhotoUrl()
                {
                    let selectedPhoto=e.target.files[0]
                    let storageReference=ref(storage,selectedPhoto.name+Math.random().toString())
                    await uploadBytes(storageReference,selectedPhoto)
                    let photoUrl=await getDownloadURL(storageReference)
                    setPhotoUrl(photoUrl)
                }
                getPhotoUrl()
            }} />
        </div>
        {photoUrl.length==0?<h1 className="text-center">Photo Will Appear Here</h1>:<img src={photoUrl} className="h-[200px] w-[350px] m-auto"/>}
        <div className="flex flex-col h-[100px]">
            <h1 className="text-center font-extrabold">VIDEO</h1>
            <input type="file" accept=".mp4" className="font-extrabold border-2 border-black rounded-2xl text-center" onChange={(e)=>{
                async function getVideoUrl()
                {
                    let selectedVideo=e.target.files[0]
                    let storageReference=ref(storage,selectedVideo.name+Math.random().toString())
                    await uploadBytes(storageReference,selectedVideo)
                    let videoUrl=await getDownloadURL(storageReference)
                    setVideoUrl(videoUrl)
                }
                getVideoUrl()
            }} />
        </div>
        {videoUrl.length==0?<h1 className="text-center mb-[30px]">Video Will Appear Here</h1>:<video className="m-auto" src={videoUrl} controls={true} height={200} width={350}></video>}
        <button className="text-white bg-green-700 rounded-full m-auto w-[150px] font-bold" onClick={()=>{
            async function updateChapter()
            {
                let missingFields=false
                let attributes=[title,description,photoUrl,videoUrl]
                for(let attribute of attributes)
                {
                    if(attribute.length==0)
                    {
                        missingFields=true

                    }

                }
                if(missingFields)
                {
                    toast.info("Missing  Fields!",{position:"top-center",className:"font-nsimsun font-weight text-[12px]"})
                }
                else
                {
                let response= await axios.put(`http://127.0.0.1:5000/maritime/educationsystem/editchapter/${courseId}/${chapterId}`,{title,description,photoUrl,videoUrl})
                if(response.data.success)
                {
                    toast.success("Successfully Updated!",{position:"top-center",className:"font-caslonantique font-bold text-[11px]"})
                }
                else
                {
                    toast.error("There Was Error While Updating Chapter!",{position:"top-center",className:"font-caslonantique font-bold text-[11px]"})
                }
                }
            }
            updateChapter()
        }}>Update</button>
        <ToastContainer/>
    </div>)

}
}
export default EditChapter