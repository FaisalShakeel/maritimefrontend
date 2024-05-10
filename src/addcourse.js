import { useState } from "react"
import storage from "./firebaseConfig"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL,ref,updateMetadata,uploadBytes } from "firebase/storage"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function AddCourse() {
    let navigate=useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState(0)
    const [photoUrl,setPhotoUrl]=useState("")
    const [previewUrl,setPreviewUrl]=useState("")
    return (<div className="flex flex-col m-auto font-caslonantique shadow-lg w-full md:w-3/4 lg:w-1/2 xl:w-1/2">
        <h1 className="font-extrabold text-center">MARITIME ELEARN</h1>
        <input placeholder="Title" className=" border-2 mt-[15px] border-black rounded-2xl text-center h-[39px] text-[13px]" onChange={(e)=>{
            setTitle(e.target.value)
        }}/>
        <textarea rows={4} placeholder="Description" onChange={(e)=>{
            setDescription(e.target.value)
        }} className="text-[13px] border-black border-2 mt-[7px] rounded-2xl  text-center"></textarea>
    
        <select className=" border-2 border-black rounded-2xl mt-[7px] text-[13px] h-[39px] text-center" onChange={(e)=>{
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
            <h1 className="text-center">PHOTO</h1>
            <input type="file" className="border-2 border-black rounded-2xl text-center" onChange={(e)=>{
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
        {photoUrl.length==0?<h1 className="text-center font-caslonantique">Photo Will Appear Here</h1>:<img src={photoUrl} className="w-full h-[200px]"/>}
        <div className="flex flex-col h-[100px]">
            <h1 className="text-center">PREVIEW</h1>
            <input type="file" accept=".mp4" className="border-2 border-black rounded-2xl text-center" onChange={(e)=>{
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
        {previewUrl.length==0?<h1 className="text-center font-caslonantique">Preview Video Will Appear Here</h1>:<video className="w-full h-[200px]" controls={true} src={previewUrl}></video>}
        <button className="m-auto rounded-full bg-green-700"  onClick={()=>{
           async function addCourse()
            {
                let attributes=[title,description,photoUrl,previewUrl,category]
                let missingFields=false
                for(let attribute of attributes)
                {
                    if(attribute.length==0)
                    {
                        missingFields=true
                    }
                }
               
                if(missingFields==false)
                {
                
                        let response=await axios.post(`http://127.0.0.1:5000/maritime/educationsystem/addcourse/${localStorage.getItem("UID")}`,{title,description,category,price,photoUrl,previewUrl,addedON:new Date().toLocaleDateString()})
                        if(response.data.success)
                        {
                            toast.success("Course Successfully Added!",{position:"top-center",className:"font-nsimsun font-bold text-[11px]"})
                        setTimeout(()=>{
                            navigate("/courses")
                        },2000)
                        }
                        else
                        {
                            toast.error("There was some error while adding courses!",{position:"top-center",className:"font-nsimsun font-bold text-[11px]"})
                        }
    
                    
                }

            }
           
            addCourse()
        }} >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq6A7fqXJLg4EhD5F6whpmdmyEduBRriB2RA&usqp=CAU" className="h-[30px] w-[30px] rounded-full"/>
        </button>
        <ToastContainer/>
    </div>)
}
export default AddCourse
/*

*/