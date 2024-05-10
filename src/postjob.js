import { useState } from "react"
import {ref,uploadBytes, getDownloadURL} from 'firebase/storage'
import storage from "./firebaseConfig"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router"
function PostJob() {
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
    const[companyName,setCompanyName]=useState("")
    const [type,setType]=useState("")
    return (<div className="flex flex-col m-auto font-caslonantique w-full md:w-3/4 lg:w-1/2 xl:w-1/2">
        <h1 className="font-extrabold text-center">MARITIME JOB PORTAL</h1>
        <input placeholder="Title" className="border-2 mt-[15px] text-[13px] border-black rounded-2xl text-center h-[39px] " onChange={(e)=>{
            setTitle(e.target.value)
        }} />
        <textarea rows={4} placeholder="Description" className=" border-black text-[13px] border-2 mt-[7px] rounded-2xl text-center" onChange={(e)=>{
            setDescription(e.target.value)
        }}></textarea>
        <textarea rows={4} placeholder="Key Reponsibilities And Requirements" className=" text-[13px] border-black border-2 mt-[7px] rounded-2xl text-center" onChange={(e)=>{
            setRequirementsAndResponsibilities(e.target.value)
        }}></textarea>
        <textarea rows={4} placeholder="Perks And Benefits" className=" border-black border-2 mt-[7px] text-[13px] rounded-2xl text-center" onChange={(e)=>{
            setPerksAndBenefits(e.target.value)
        }}></textarea>
        <input placeholder="Salary In (USD)" className="border-2 mt-[7px] h-[39px]  border-black text-[13px] rounded-2xl text-center" type="number" onChange={(e)=>{
            setSalary(e.target.value)
        }} />
        <select className=" border-2 border-black rounded-2xl text-[11px] mt-[7px]  h-[39px] text-center" onChange={(e) => {
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
        <select className=" border-2 border-black rounded-2xl text-[11px] mt-[7px]  h-[39px] text-center" onChange={(e) => {
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
        <input placeholder="Location" className="border-2 mt-[15px] border-black rounded-2xl text-center h-[39px] text-[13px]" onChange={(e)=>{
            setLocation(e.target.value)
        }} />
          <input placeholder="Company Name" className="border-2 mt-[15px] border-black rounded-2xl text-center h-[39px] text-[13px]" onChange={(e)=>{
            setCompanyName(e.target.value)
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
        <button className="m-auto mt-[20px] rounded-full bg-green-700" onClick={()=>{
            async function postJob()
            {
                let attributes =[title,description,requirementsAndResponsibilities,perksAndBenefits,companyLogoUrl,location,category,vesselType,companyName] 
                let missingFields=false
                let invalidSalary=false
                for(let attribute of attributes)
                {
        
                        if(attribute.length==0)
                        {
                            missingFields=true
                        }
                    
                }
                if(salary<=0)
                {
                invalidSalary=true
                }
                if(invalidSalary)
                {
                    toast.info("Invalid Salary!Caanot Be Less Than 0",{position:"top-center",style:{fontFamily:"Print Clearly",fontWeight:"bold"}})
                }   
                if(missingFields)
                {
                    toast.info("Missing Fields!",{position:"top-center",style:{fontFamily:"Print Clearly",fontWeight:"bold"}})
                }
                else if(missingFields==false &&invalidSalary==false)
                {
                let response=await axios.post(`http://127.0.0.1:5000/maritime/jobportal/addjob/${localStorage.getItem("UID")}`,{title,description,salary,perksAndBenefits,requirementsAndResponsibilities,category,location,type,companyLogoUrl,postedON:new Date().toDateString(),vesselType,companyName})
                if(response.data.success)
                {
                    toast.success("Job Successfully Posted!",{position:"top-center",style:{fontFamily:"Print Clearly",fontWeight:"bold"}})
               setTimeout(()=>{
                navigate("/jobs")
               },3000)
                }
                else
                {
                    toast.error("There Was Error While Posted Job!",{position:"top-center",style:{fontFamily:"Print Clearly",fontWeight:"bold"}})
                    
                }

                }
                           
            }
            postJob()
        }} >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq6A7fqXJLg4EhD5F6whpmdmyEduBRriB2RA&usqp=CAU" className="h-[30px] w-[30px] rounded-full" />
        </button>
    </div>)
}
export default PostJob