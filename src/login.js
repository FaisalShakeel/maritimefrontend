import axios from "axios"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
function Login()
{
    let navigate=useNavigate()
    const[EMailAddress,setEMailAddress]=useState("")
    const[passWord,setPassword]=useState("")
    return(<div className="flex flex-col m-auto font-caslonantique w-full sm:w-[300px] md:w-[350px] lg:w-[350px] xl:w-[350px]">
         <h1 className="font-extrabold text-center">MARITIME</h1>
        <input placeholder="EMail Address" onChange={(e)=>{
            setEMailAddress(e.target.value)
        }} className="font-extrabold border-2 mt-[15px] border-black rounded-2xl text-center h-[39px] text-lg"/>
        <input placeholder="Password" onChange={(e)=>{
            setPassword(e.target.value)
        }} type="password" className="font-extrabold border-2 mt-[15px] border-black rounded-2xl text-center h-[39px] text-lg"/>
        <button className="m-auto bg-green-700 rounded-full text-white font-extrabold w-[130px] mt-[10px]" onClick={()=>{
            async function Login()
            {
                let response=await axios.post(`http://127.0.0.1:5000/maritime/user/login`,{EMailAddress,passWord})
                if(response.data.success)
                {
                    localStorage.setItem("UID",response.data.user.id)
                    localStorage.setItem("role",response.data.user.role)
                    localStorage.setItem("token",response.data.token)
                    toast.success("Successfully LoggedIn",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                    setTimeout(()=>{
                        navigate("/")
                    },3000)
                }
                else if(response.data.success==false &&response.data.message=="PassWord Is Incorrect")
                {
                    toast.error("Incorrect PassWord",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }
                else if(response.data.success==false &&response.data.message=="EMailAddress Does Not Exist")
                {
                    toast.error("EMail Address Does Not Exist",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }
                else
                {
                    toast.error("There Was An Error While Logging In",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }

            }
            Login()
        }}>
            Login
        </button>
        <ToastContainer/>
    </div>)

}
export default Login