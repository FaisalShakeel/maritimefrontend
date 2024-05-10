import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ReactLoading from 'react-loading'
import { ToastContainer, toast } from "react-toastify"

function Notifications()
{
    let navigate=useNavigate()
    
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    const[notifications,setNotfications]=useState([])
    let getNotifications=async ()=>{
        let response=  await axios.get(`http://127.0.0.1:5000/maritime/notification/getmynotifications/${localStorage.getItem("UID")}`)
        if(response.data.success)
        {
            console.log("Getting Notifications")
            console.log(response.data.notifications)
            setNotfications(response.data.notifications)
            setSuccessfullyFetched(true)

        }
    }
    useEffect(()=>{
    
        if(successfullyFetched==false)
        {
            getNotifications()
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
  else  if(successfullyFetched==false)
    {
        return(<ReactLoading width={50} height={50} color="black" className="m-auto"></ReactLoading>)
    }
    else if(successfullyFetched==true &&notifications.length==0)
    { 
        return(<div className="text-center font-caslonantique">No Notifications!</div>)
    }
    else
    {
            return(<div className="flex flex-col">
                {
                    notifications.map((notification)=>{
                        
                         if(notification.type=="AddedReview")
                        {
                            return(<div className="flex flex-col font-caslonantique w-full shadow-lg m-auto h-[70px] sm:w-full md:w-[300px] lg:w-[300px] xl:w-[300px]">
                                <div onClick={()=>{navigate(`/course/${notification.courseId}`)}} className="flex flex-col" >
                                <h1 className="text-center">Someone Reviewed Your Course:</h1>
                                <h1 className="text-center">{notification.courseTitle.toUpperCase()}</h1>
                                </div>
                                <button onClick={()=>{
                                     async function deleteNotification()
                                     {
                                         let response=await axios.delete(`http://127.0.0.1:5000/maritime/notification/deletenotification/${notification.id}`)
                                         if(response.data.success)
                                             {
                                                 toast.success("Notification Deleted")
                                                 getNotifications()
                                             }
                                             else
                                             {
                                                 toast.error("Notification Could Not Be Deleted!")
                                             }
                                     }
                                     deleteNotification()
                                }} className="bg-green-700 font-caslonantique rounded-full w-[100px] m-auto font-bold" >Delete</button>
                           </div>
                            
                        )
                        }
                        else if(notification.type=="AddedChapter")
                        {
                            return(<div className="flex flex-col font-caslonantique w-full shadow-lg m-auto h-[70px] sm:w-full md:w-[300px] lg:w-[300px] xl:w-[300px]">
                                <div className="flex flex-col" onClick={()=>{navigate(`/chapter/${notification.courseId}/${notification.chapterId}`)}}>
                                    <h1>A New Chapter Was Added To Course:</h1>
                                    <h1>{notification.courseTitle.toUpperCase()}</h1>
                                    </div>
                                    <button onClick={()=>{
                                         async function deleteNotification()
                                         {
                                             let response=await axios.delete(`http://127.0.0.1:5000/maritime/notification/deletenotification/${notification.id}`)
                                             if(response.data.success)
                                                 {
                                                     toast.success("Notification Deleted")
                                                 getNotifications()
                                                    }
                                                 else
                                                 {
                                                     toast.error("Notification Could Not Be Deleted!")
                                                 }
                                         }
                                         deleteNotification()
                                    }} className="bg-green-700 font-caslonantique rounded-full w-[100px] m-auto font-bold" >Delete</button>

                                
                            </div>)
                        }
                        else if(notification.type=="Commented")
                        {
                            return(<div className="flex flex-col font-caslonantique w-full shadow-lg m-auto h-[70px] sm:w-full md:w-[300px] lg:w-[300px] xl:w-[300px]">
                                <div className="flex flex-col" onClick={()=>{navigate(`/chapter/${notification.courseId}/${notification.chapterId}`)}}>
                                    <h1>Someone Commented On Your Course Chapter</h1>
                                    <h1>{notification.courseTitle.toUpperCase()}</h1>
                                </div>
                                <button className="bg-green-700 font-caslonantique rounded-full w-[100px] m-auto font-bold" onClick={()=>{
                                    async function deleteNotification()
                                    {
                                        let response=await axios.delete(`http://127.0.0.1:5000/maritime/notification/deletenotification/${notification.id}`)
                                        if(response.data.success)
                                            {
                                                toast.success("Notification Deleted")
                                            getNotifications()
                                            }
                                            else
                                            {
                                                toast.error("Notification Could Not Be Deleted!")
                                            }
                                    }
                                    deleteNotification()
                                }} >Delete</button>
                                
    
                            </div>)
                        }
                    })
                }
                <ToastContainer/>
            </div>)


    }
}
export default Notifications