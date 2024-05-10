import { useNavigate, useParams } from "react-router"
import { useState,useEffect } from "react"
import { ref,getDownloadURL,uploadBytes } from "firebase/storage"
import storage from "./firebaseConfig"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
function EditJob()
{
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    const[vesselType,setVesselType]=useState("")
    const [title,setTitle]=useState("")
    let navigate=useNavigate()
    const [description,setDescription]=useState("")
    const [requirementsAndResponsibilities,setRequirementsAndResponsibilities]=useState("")
    const [perksAndBenefits,setPerksAndBenefits]=useState("")
    const [salary,setSalary]=useState(0)
    const [category,setCategory]=useState("")
    const [location,setLocation]=useState("")
    const [companyLogoUrl,setCompanyLogoUrl]=useState("")
    const [type,setType]=useState("")
    const{Id}=useParams()
    useEffect(()=>{
        async function getJob()
        {
            let response=await axios.get(`http://127.0.0.1:5000/maritime/jobportal/getjob/${Id}`)
            if(response.data.success)
            {
                setTitle(response.data.job.title)
                setDescription(response.data.job.description)
                setRequirementsAndResponsibilities(response.data.job.requirementAndResponsibilities)
                setPerksAndBenefits(response.data.job.perksAndBenefits)
                setSalary(response.data.job.salary)
                setCategory(response.data.job.category)
                setLocation(response.data.job.location)
                setCompanyLogoUrl(response.data.job.companyLogoUrl)
                setType(response.data.job.type)
                setVesselType(response.data.job.vesselType)
                setSuccessfullyFetched(true)
            }
        }
        if(successfullyFetched==false)
        {
            getJob()
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
        return<div className="font-caslonantique font-bold text-center w-full">Cannot Get Job</div>
        
    }
    else
    {
    return (<div className="flex flex-col m-auto font-caslonantique w-full md:w-3/4 lg:w-1/2 xl:w-1/2">
        <h1 className="font-extrabold text-center">MARITIME JOB PORTAL</h1>
        <input placeholder="Title" value={title} className="border-2 mt-[15px] text-[13px] border-black rounded-2xl text-center h-[39px] " onChange={(e)=>{
            setTitle(e.target.value)
        }} />
        <textarea rows={4} value={description} placeholder="Description" className=" border-black text-[13px] border-2 mt-[7px] rounded-2xl text-center" onChange={(e)=>{
            setDescription(e.target.value)
        }}></textarea>
        <textarea rows={4} value={requirementsAndResponsibilities} placeholder="Key Reponsibilities And Requirements" className=" text-[13px] border-black border-2 mt-[7px] rounded-2xl text-center" onChange={(e)=>{
            setRequirementsAndResponsibilities(e.target.value)
        }}></textarea>
        <textarea rows={4} value={perksAndBenefits} placeholder="Perks And Benefits" className=" border-black border-2 mt-[7px] text-[13px] rounded-2xl text-center" onChange={(e)=>{
            setPerksAndBenefits(e.target.value)
        }}></textarea>
        <input value={salary} placeholder="Salary In (USD)" className="border-2 mt-[7px] h-[39px]  border-black text-[13px] rounded-2xl text-center" type="number" onChange={(e)=>{
            setSalary(e.target.value)
        }} />
        <select defaultValue={category} className=" border-2 border-black rounded-2xl text-[11px] mt-[7px]  h-[39px] text-center" onChange={(e) => {
            setCategory(e.target.value)
        }}>
            <option className="font-bold text-[11px]">Select Category</option>
            <option className="font-bold text-[11px]">Master</option>
            <option className="font-bold text-[11px]">Safety Officer</option>
            <option className="font-bold text-[11px]">Able Seaman</option>
            <option className="font-bold text-[11px]">Carpenter</option>
            <option className="font-bold text-[11px]">Motorman</option>
            <option className="font-bold text-[11px]">Cook</option>
            <option className="font-bold text-[11px]">Deck Cadget</option>
            <option className="font-bold text-[11px]"> Plumber</option>
            <option className="font-bold text-[11px]">IT Officer</option>
            <option className="font-bold text-[11px]">Others</option>
        </select>
        <select defaultValue={vesselType} className=" border-2 border-black rounded-2xl text-[11px] mt-[7px]  h-[39px] text-center" onChange={(e) => {
            setVesselType(e.target.value)
        }}>
            <option className="font-bold text-[11px]">Select Vessel Type</option>
            <option className="font-bold text-[11px]">Bulk Carrier</option>
            <option className="font-bold text-[11px]">Car Carrier</option>
            <option className="font-bold text-[11px]">Chemical Tanker</option>
            <option className="font-bold text-[11px]">Container Feeder</option>
            <option className="font-bold text-[11px]">Gas Tanker</option>
            <option className="font-bold text-[11px]">OffShore Vessel</option>
            <option className="font-bold text-[11px]">Sailing Vessel</option>
            <option className="font-bold text-[11px]"> Yachat</option>
            <option className="font-bold text-[11px]">Tug</option>
            <option className="font-bold text-[11px]">Others</option>
        </select>
        <input value={location} placeholder="Location" className="border-2 mt-[15px] border-black rounded-2xl text-center h-[39px] text-[13px]" onChange={(e)=>{
            setLocation(e.target.value)
        }} />

        <h1 className="font-extrabold mt-[25px] text-[13px] text-center">CONTRACT TYPE</h1>
        <div className="m-auto">
           <div className="flex flex-row"><input type="radio" value="Temporary"  checked={type=="Temporary"} onChange={(e)=>{setType(e.target.value)}} /> <h1 className="font-caslonantique text-[11px]">Temporary</h1> </div>
           <div className="flex flex-row"><input type="radio" value="Permanent" checked={type=="Permanent"} onChange={(e)=>{setType(e.target.value)}} /> <h1 className="font-caslonantique text-[11px]">Permanent</h1> </div>
        </div>
        <div className="flex flex-col mt-[25px] h-[100px]">
            <h1 className="text-center  font-extrabold text-[12px] font-caslonantique">COMPANY LOGO</h1>
            <input type="file" accept=".jpg" className="font-extrabold border-2 border-black rounded-2xl text-center" onChange={(e)=>{
                async function getCompanyLogoUrl()
                {
                    let selectedPhoto=e.target.files[0]
                   let storageRef=ref(storage,selectedPhoto.name+Math.random().toString())
                   await uploadBytes(storageRef,selectedPhoto)
                 let downloadUrl=await getDownloadURL(storageRef)
                 setCompanyLogoUrl(downloadUrl)
                
            }
                getCompanyLogoUrl()
            }} />
        </div>
        <ToastContainer/>
        {
            companyLogoUrl.length>0?<img src={companyLogoUrl} className="m-auto h-[110px] w-[100px]"/>:<h1 className="m-auto">Company Logo Will Appear Here</h1>
        }
        <button className="m-auto mt-[20px] rounded-full bg-green-700 w-[150px]" onClick={()=>{
            async function editJob()
            {
               
                let response=await axios.put(`http://127.0.0.1:5000/maritime/jobportal/editjob/${Id}`,{title,description,salary,perksAndBenefits,requirementsAndResponsibilities,category,location,type,companyLogoUrl,postedON:new Date().toDateString(),vesselType})
                if(response.data.success)
                {
                    toast.success("Job Successfully Updated!",{position:"top-center",style:{fontFamily:"Caslon Antique",fontWeight:"bold"}})
                }
                else
                {
                    toast.error("There Was Error While Updating Job!",{position:"top-center",style:{fontFamily:"Caslon Antique",fontWeight:"bold"}})
                    
                }

                
                           
            }
        
            editJob()

        
        }}>
            Update
        </button>
    </div>)

}
}
export default EditJob