import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storage from "./firebaseConfig";
import axios from 'axios'
import { useNavigate } from "react-router";
import { useNavigation } from "react-router";
import {useHistory} from 'react-router-dom'

function SignUp() {
    let navigate=useNavigate()
    
    const [userName, setUserName] = useState("")
    const [EMailAddress, setEMailAddress] = useState("")
    const [passWord, setPassword] = useState("")

    const [profilePhotoUrl, setProfilePhotoUrl] = useState("")
    const [selectedRole, setSelectedRole] = useState("")
    return (<div className="flex flex-col m-auto font-caslonantique w-full md:w-3/4 lg:w-1/2 xl:w-1/2">
        <h1 className="font-extrabold text-center">MARITIME JOB PORTAL</h1>
        {profilePhotoUrl.length > 0 ? <img src={profilePhotoUrl} className="m-auto h-[50px] w-[50px] rounded-full" /> : <div className="text-center bg-slate-50 h-[40px] w-[40px] rounded-full m-auto font-extrabold">{userName.at(0)}</div>}
        <input placeholder="Name" onChange={(e) => {
            setUserName(e.target.value)
        }} className="font-extrabold border-2 mt-[15px] border-black rounded-2xl text-center h-[39px] text-[13px]" />
        <input onChange={(e) => {
            setEMailAddress(e.target.value)
        }} placeholder="EMail Address" className="font-extrabold border-2 mt-[15px] border-black rounded-2xl text-center h-[39px] text-[13px]" />
        <input onChange={(e) => {
            setPassword(e.target.value)
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
        <h1 className="font-extrabold text-center text-[13px]">JOIN AS:</h1>
        <div className="m-auto">
            <div className="flex flex-row"><input type="radio" value="Admin" checked={selectedRole == "Admin"} onChange={(e) => { setSelectedRole(e.target.value) }} /> <h1 className="font-semibold text-[12px]">Admin</h1> </div>
            <div className="flex flex-row"><input type="radio" value="Job Seeker" checked={selectedRole == "Job Seeker"} onChange={(e) => { setSelectedRole(e.target.value) }} /> <h1 className="font-semibold text-[12px]">Job Seeker</h1> </div>
            <div className="flex flex-row"><input type="radio" value="Student" checked={selectedRole == "Student"} onChange={(e) => { setSelectedRole(e.target.value) }} /> <h1 className="font-semibold text-[12px]">Student</h1> </div>
        
        </div>
        <button className="m-auto bg-green-700 rounded-full text-white font-nsimsum text-[13px] font-extrabold w-[100px] mt-[30px]" onClick={()=>{
           async function signUp()
            {
           let response=await axios.post("http://127.0.0.1:5000/maritime/user/register",{name:userName,EMailAddress,passWord,profilePhotoUrl,role:selectedRole})
            if(response.data.success)
            {
                localStorage.setItem("UID",response.data.userId)
                localStorage.setItem("token",response.data._jwt)

                localStorage.setItem("role",selectedRole)
                toast.success("Account Successfully Created!",{position:"top-center",style:{fontFamily:"Print Clearly",fontWeight:"bold"}})
                setTimeout(()=>{navigate("/")},3000)
            }
            else if(response.data.success==false && response.data.isRegistered)
            {
                toast.error("This EMail Address Is Already Taken!",{position:"top-center",style:{fontFamily:"Print Clearly",fontWeight:"bold"}})
            }
            else
            {
                toast.error("There Was An Error While Creating Account",{position:"top-center",style:{fontFamily:"Print Clearly",fontWeight:"bold"}})
            }
            }
            signUp()
        }}>Register</button>
        <ToastContainer/>
    </div>)
}
export default SignUp