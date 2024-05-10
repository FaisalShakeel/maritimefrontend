import {useState,useRef,useEffect} from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import storage from './firebaseConfig'
import {ref,getDownloadURL,uploadBytes} from 'firebase/storage'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
function EditCourse()
{
    const{courseID}=useParams()
    let navigate=useNavigate()
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    const[photoUrl,setPhotoUrl]=useState("")
    const [previewUrl,setPreviewUrl]=useState("")
    const [category,setCategory]=useState("")
    let getCourse=async()=>{
        let response=await axios.get(`http://127.0.0.1:5000/maritime/educationsystem/getcourse/${courseID}`)
        if(response.data.success)
        {
 
         console.log(response.data.course)
         setDescription(response.data.course.description)
         
         setTitle(response.data.course.title)
         setCategory(response.data.course.category)
         setPhotoUrl(response.data.course.photoUrl)
         setPreviewUrl(response.data.course.introUrl)
         
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
   else if(successfullyFetched)
    {
        return(<div className="flex flex-col m-auto font-caslonantique w-full md:w-3/4 lg:w-1/2 xl:w-1/2">
        <h1 className="font-extrabold text-center">MARITIME ELEARN</h1>
        <input value={title} onChange={((e)=>{setTitle(e.target.value)})} aria-label='Title' placeholder="Title" className="border-2 mt-[15px] border-black rounded-2xl text-center h-[39px] text-lg"/>
        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} rows={4} placeholder="Description"   className="text-xl border-black border-2 mt-[7px] rounded-2xl  text-center"></textarea>
        
        <select defaultValue={category} className=" border-2 border-black rounded-2xl mt-[7px] text-[13px] h-[39px] text-center" onChange={(e)=>{
            setCategory(e.target.value)
        }}>
            <option className="font-thin text-[11px]">Select Category</option>
            <option className="font-thin text-[11px]">Basic Safety And Medical</option>
            <option className="font-thin text-[11px]">Deck</option>
            <option className="font-thin text-[11px]">Engine</option>
            <option className="font-thin text-[11px]">Meteorology</option>
            <option className="font-thin text-[11px]">Maritime Law</option>
            <option className="font-thin text-[11px]">Navigation</option>
            <option className="font-thin text-[11px]">Radio</option>
            <option className="font-thin text-[11px]">Security</option>
            <option className="font-thin text-[11px]">Others</option>

        </select>
        <div className="flex flex-col rounded-xl mt-[17px] h-[100px]">
            <h1 className="text-center font-extrabold ">PHOTO</h1>
            <input type="file" className="font-extrabold border-2 border-black rounded-2xl text-center" onChange={(e)=>{
                async function getPhotoUrl()
                {
                    let selectedPhoto=e.target.files[0]
                    let storageReference=ref(storage,selectedPhoto.name+Math.random().toString())
                   await uploadBytes(storageReference,selectedPhoto)
                   let downloadUrl=await getDownloadURL(storageReference)
                   setPhotoUrl(downloadUrl)
                }
                getPhotoUrl()
               
            }} />
           
        </div>
        <img src={photoUrl} className='h-[300px] w-[300px] m-auto'/>
        <div className="flex flex-col h-[100px]">
            <h1 className="text-center font-extrabold">PREVIEW</h1>
            <input type="file" accept=".mp4" className="font-extrabold border-2 border-black rounded-2xl text-center" onChange={(e)=>{
                async function getPreviewUrl()
                {
                    let selectedVideo=e.target.files[0]
                    let storageReference=ref(storage,selectedVideo.name+Math.random().toString())
                    await uploadBytes(storageReference,selectedVideo)
                    let _previewUrl=await getDownloadURL(storageReference)
                    setPreviewUrl(_previewUrl)
                }
                getPreviewUrl()
            }} />
        </div>
        <video className='m-auto' src={previewUrl} controls={true} height={300} width={300}/> 
           <ToastContainer/>

        <button className='bg-green-700 rounded-full w-[130px] m-auto font-caslonantique font-bold text-center' onClick={()=>{
            async function updateCourse()
            {
                let response=await axios.put(`http://127.0.0.1:5000/maritime/educationsystem/editcourse/${courseID}`,{title,description,category,photoUrl,previewUrl})
                if(response.data.success)
                {
                    toast.success("Course Successfully Updated",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }
                else
                {
                    toast.error("There Was An Error While Updating Course",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }
            }
            updateCourse()
        }}>Update</button>
        </div>)
    }
    else
    {
    return(<div className='text-cente w-full font-caslonantique font-bold'>You Can Customize Your Course Here</div>)

    }

}
export default EditCourse