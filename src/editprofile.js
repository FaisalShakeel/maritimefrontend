import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ref,getDownloadURL,uploadBytes } from "firebase/storage"
import storage from "./firebaseConfig"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function EditProfile()
{
    const{Id}=useParams()
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    const[userName,setUserName]=useState("")
    let navigate=useNavigate()
    const[passWord,setPassWord]=useState("")
    const[profilePhotoUrl,setProfilePhotoUrl]=useState("")
    useEffect(()=>{
        async function getUser()
        {
            let response=await axios.get(`http://127.0.0.1:5000/maritime/user/getuser/${Id}`)
            if(response.data.success)
            {
                setUserName(response.data.user.name)
                
                setPassWord(response.data.user.password)
                setProfilePhotoUrl(response.data.user.photoUrl)
                setSuccessfullyFetched(true)
            }
        }
        if(successfullyFetched==false)
        {
        getUser()


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
        return(<div className="font-caslonantique text-center font-bold">Cannot Get Profile</div>)
    }
    else
    {
        return (<div className="flex flex-col m-auto font-caslonantique w-full md:w-3/4 lg:w-1/2 xl:w-1/2">
        <h1 className="font-extrabold text-center">MARITIME JOB PORTAL</h1>
        {profilePhotoUrl.length > 0 ? <img src={profilePhotoUrl} className="m-auto h-[50px] w-[50px] rounded-full" /> : <div className="text-center bg-slate-50 h-[40px] w-[40px] rounded-full m-auto font-extrabold">{userName.at(0)}</div>}
        <input placeholder="Name" value={userName} onChange={(e) => {
            setUserName(e.target.value)
        }} className="font-extrabold border-2 mt-[15px] border-black rounded-2xl text-center h-[39px] text-[13px]" />
        
       
        <input value={passWord} onChange={(e) => {
            setPassWord(e.target.value)
        }} placeholder="Password" className="font-extrabold border-2 mt-[7px] h-[39px] text-[13px] border-black rounded-2xl text-center" type="password" />
        <div className="flex flex-col h-[100px]">
            <h1 className="text-center font-extrabold text-[13px]">PROFILE PHOTO</h1>
            <input type="file" accept=".jpg" className="font-extrabold border-2 border-black rounded-2xl text-[13px] text-center" onChange={(e) => {
                async function getProfilePhotoUrl() {
                    let selectedPhoto = e.target.files[0]
                    let storageRef = ref(storage, selectedPhoto.name + Math.random().toString())
                    await uploadBytes(storageRef, selectedPhoto)
                    let downloadUrl = await getDownloadURL(storageRef)
                    setProfilePhotoUrl(downloadUrl)
                }
                getProfilePhotoUrl()
            }} />
        </div>
        
        <button className="m-auto bg-green-700 rounded-full text-white font-nsimsum text-[13px] font-extrabold w-[100px] mt-[30px]" onClick={()=>{
           async function updateUser()
            {
           let response=await axios.put(`http://127.0.0.1:5000/maritime/user/updateuser/${Id}`,{name:userName,passWord,profilePhotoUrl})
            if(response.data.success)
            {
               
                toast.success("Account Successfully Updated!",{position:"top-center",style:{fontFamily:"Caslon Antique",fontWeight:"bold"}})
                localStorage.setItem("profilePhotoUrl",response.data.profilePhotoUrl)
            }
            else 
            {
                toast.error("There Was Error While Updating Account",{position:"top-center",style:{fontFamily:"Caslon Antique",fontWeight:"bold"}})
            }
        }
            updateUser()
        }}>Update</button>
        <ToastContainer/>
    </div>)

    }
    
}
export default EditProfile