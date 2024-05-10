import { Axios } from "axios"
import { useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'

import axios from 'axios'
import {ref,getDownloadURL,uploadBytes} from 'firebase/storage'
import storage from './firebaseConfig'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Chat({socket})
{
  
    const{receiverId}=useParams()
    const[receiver,setReceiver]=useState("")
    const[isImageDialogOpen,setIsImageDialogOpen]=useState(false)
    const[isVideoDialogOpen,setIsVideoDialogOpen]=useState(false)
    const [successfullyFetched,setSuccessfullyFetched]=useState(false)
    const [messages,setMessages]=useState([])
    const [text,setText]=useState("")
    const [mediaType,setMediaType]=useState("")
    const [mediaUrl,setMediaUrl]=useState("")
    let navigate=useNavigate()
    let getMessages =async()=>{
        let _response=await axios.get(`http://127.0.0.1:5000/maritime/user/getuser/${receiverId}`)
        let response= await axios.get(`http://127.0.0.1:5000/maritime/message/getmessages/${localStorage.getItem("UID")}/${receiverId}`)
        if(response.data.success && _response.data.success)
        {
            
          setSuccessfullyFetched(true)
          setReceiver(_response.data.user)
          console.log(_response.data.user)
          setMessages(response.data.messages)
          console.log(response.data.messages)
        }
    }
    useEffect(()=>{
        console.log("Socket Id",socket.id)
        socket.on("newMsg",(msg)=>{
            console.log("New Message",msg)
            console.log("New Message Received")
           getMessages()
        })
        if(successfullyFetched==false)
        {
        getMessages()
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
        else
        {
    return(<div className="flex flex-col  bg-slate-50 h-[740px]">
        <div className="flex flex-row justify-between bg-zinc-50 ">
            <div className="h-[50px] w-[50px] rounded-full bg-slate-100 font-bold font-nsimsun">
                <img src={receiver.profilePhotoUrl} className="h-[50px] w-[50px] rounded-full"/>
            </div>
            <div className="flex flex-col font-caslonantique">
                <h1 className="font-bold text-[10px]">{receiver.name}</h1>
                
            </div>
            <div>
               
            </div>

        </div>
        <div className="h-[700px] overflow-y-scroll">
        {
                    messages.map((message)=>{
                        if((message.mediaUrl.length>0&&message.mediaType=="image")&&(message.senderId==localStorage.getItem("UID")))
                        {
                            return(<div className="flex flex-col shadow-2xl bg-white w-[200px] rounded-lg ml-auto mt-[5px]">
                                <img src={message.mediaUrl} className="h-[200px] w-[200px] m-auto rounded-lg"/>
                                 <div className="flex flex-row justify-between">
                            <h1 className="font-caslonantique font-bold text-[10px]">{message.addedON}</h1>
                            <h2 className="font-caslonantique font-bold text-[10px]">{message.addedAt}</h2>


                            </div>
                            </div>)
                        }
                        else if((message.mediaUrl.length>0&&message.mediaType=="image") &&(message.senderId!=localStorage.getItem("UID")))
                        {
                            return(<div className="flex flex-col bg-white rounded-lg w-[200px] mt-[5px]">
                            <img src={message.mediaUrl} className="h-[200px] w-[200px] rounded-sm"/>
                             <div className="flex flex-row justify-between">
                            <h1 className="font-caslonantique font-bold text-[10px]">{message.addedON}</h1>
                            <h2 className="font-caslonantique font-bold text-[10px]">{message.addedAt}</h2>


                            </div>
                        </div>)
                        }
                        else if((message.mediaUrl.length>0&&message.mediaType=="video") &&(message.senderId==localStorage.getItem("UID")))
                        {
                            
                            return(<div className="flex flex-col bg-white rounded-lg w-[200px] ml-auto mt-[5px]">
                            <video src={message.mediaUrl} height={200} width={200} className=" rounded-sm"/>
                             <div className="flex flex-row justify-between">
                            <h1 className="font-caslonantique font-bold text-[10px]">{message.addedON}</h1>
                            <h2 className="font-caslonantique font-bold text-[10px]">{message.addedAt}</h2>


                            </div>
                        </div>)
                            

                        }
                        else if((message.mediaUrl.length>0&&message.mediaType=="video") &&(message.senderId!=localStorage.getItem("UID")))
                        {
                            
                            return(<div className="flex flex-col bg-white w-[200px] rounded-lg ">
                            <video src={message.mediaUrl} className="h-[200px] w-[200px] rounded-sm"/>
                            <div className="flex flex-row justify-between">
                            <h1 className="font-caslonantique font-bold text-[10px]">{message.addedON}</h1>
                            <h2 className="font-caslonantique font-bold text-[10px]">{message.addedAt}</h2>


                            </div>
                        </div>)
                            

                        }
                        else if(message.text.length>0)
                        {
                            return(  <div className={message.senderId==localStorage.getItem("UID")?"ml-auto mt-[5px] w-[180px] rounded-full bg-white":"mr-auto mt-[5px] w-[180px] rounded-full bg-white"}><h2 className="font-caslonantique font-bold text-[10px] text-center">{message.text}</h2>
                            <div className="flex flex-row font-caslonantique justify-between">
                                <h2 className="text-[10px]">{message.addedON}</h2>
                                <h2 className="text-[10px]">{message.addedAt}</h2>
                            </div>
                            </div> )
                              
                        }
                    
                    })
                }
        </div>
        <dialog open={isImageDialogOpen} className="m-auto">
            <div className="flex flex-col font-caslonantique h-[300px] w-full sm:w-full md:w-[400px] lg:w-[400px] xl:w-[400px]">
                <div className="flex flex-row w-full">
                    <h1 className="m-auto text-center">Select Image</h1>
                    <button className="ml-auto" onClick={()=>{setIsImageDialogOpen(false)}}>
                        <img src="https://tse2.mm.bing.net/th?id=OIP.HgRH4nu0HtdY-wXEJTwpgAHaHa&pid=Api&P=0&h=220" className="h-[15px] w-[15px]"/>
                    </button>
                </div>
                <input className="font-caslonantique border-2 rounded-full" type="file" onChange={(e)=>{
                    async function uploadImage()
                    {
                        let selectedImage=e.target.files[0]
                       let storageReference=ref(storage,selectedImage.name+Math.random())
                       await uploadBytes(storageReference,selectedImage)
                      let imageUrl=await getDownloadURL(storageReference)
                      setMediaType("image")
                      setMediaUrl(imageUrl)
                    }
                    uploadImage()
                }}/>
                {mediaUrl.length>0&&mediaType=="image"?<img src={mediaUrl} className="w-full h-[100px]"/>:<h1 className="font-caslonantique text-center">Image Will Appear Here</h1>}
            <button className="text-black bg-gray-100 w-[110px] m-auto rounded-full text-center shadow-sm" onClick={()=>{
                 async function sendMsg()
                 {
                    setText("")
                     if(mediaUrl.length>0&&mediaType=="image")
                     {
                     let response=await axios.post(`http://127.0.0.1:5000/maritime/message/addmessage/${localStorage.getItem("UID")}/${receiverId}`,{text,mediaType,mediaUrl,addedON:new Date().toLocaleDateString(),addedAt:new Date().toLocaleTimeString()})
                     if(response.data.success)
                     {
                        getMessages()
                         toast.success("Send IMage")
                         setIsImageDialogOpen(false)
 
                     }
                     else
                     {
                         console.log("Msg Could Not Be Sent")
                     }
                     }
                     else
                     {
                         toast.warn("Kindly Pick An Image",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                      
                     }
                 }
                 sendMsg()
            }}>Send</button>
            </div>

        </dialog>
        <dialog open={isVideoDialogOpen}>
            <div className="flex flex-col font-caslonantique h-[300px] w-full sm:w-full md:w-[400px] lg:w-[400px] xl:w-[400px]">
            <div className="flex flex-row w-full">
                    <h1 className="m-auto text-center">Select Video</h1>
                    <button className="ml-auto" onClick={()=>{setIsVideoDialogOpen(false)}}>
                        <img src="https://tse2.mm.bing.net/th?id=OIP.HgRH4nu0HtdY-wXEJTwpgAHaHa&pid=Api&P=0&h=220" className="h-[15px] w-[15px]"/>
                    </button>
                </div>
                <input className="font-caslonantique border-2 rounded-full" type="file" accept="video/*" onChange={(e)=>{
                    async function uploadVideo()
                    {
                        let selectedVideo=e.target.files[0]
                       let storageReference=ref(storage,selectedVideo.name+Math.random())
                       await uploadBytes(storageReference,selectedVideo)
                      let videoUrl=await getDownloadURL(storageReference)
                      setMediaType("video")
                      setMediaUrl(videoUrl)
                    }
                    uploadVideo()
                }}/>
                {mediaUrl.length>0&&mediaType=="video"?<video src={mediaUrl} className="w-full h-[100px]"/>:<h1 className="font-caslonantique text-center">Video Will Appear Here</h1>}
            <button className="text-black bg-gray-100 w-[110px] m-auto rounded-full text-center shadow-sm" onClick={()=>{
                async function sendMsg()
                {
                    setText("")
                    if(mediaUrl.length>0&&mediaType=="video")
                    {
                    let response=await axios.post(`http://127.0.0.1:5000/maritime/message/addmessage/${localStorage.getItem("UID")}/${receiverId}`,{text,mediaType,mediaUrl,addedON:new Date().toLocaleDateString(),addedAt:new Date().toLocaleTimeString()})
                    if(response.data.success)
                    {
                        toast.success("Send Video")
                        getMessages()
                        setIsVideoDialogOpen(false)

                    }
                    else
                    {
                        console.log("Msg Could Not Be Sent")
                    }
                    }
                    else
                    {
                        toast.warn("Kindly Pick A Video",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                     
                    }
                }
                sendMsg()
            }}>Send</button>
            </div>

        </dialog>
        <ToastContainer/>
        <div className="flex flex-row mt-auto w-full justify-center">
            <input className=" border-2 mt-[15px] text-[13px] border-black w-[230px] rounded-full font-alice text-center h-[39px]" onChange={(e)=>{
                setText(e.target.value)
            }} placeholder="Type Message"/>
            <img src="https://tse2.mm.bing.net/th?id=OIP.JIo_erHjGUXp0-Z86gJAqAHaHa&pid=Api&P=0&h=220" className="h-[25px] w-[25px] mt-[20px]" onClick={()=>{setIsVideoDialogOpen(false);setIsImageDialogOpen(true)}}/>
            <img src="https://tse2.mm.bing.net/th?id=OIP.POGtxoJ7oqpi_Ks2FgBpCAHaHa&pid=Api&P=0&h=220" className="h-[18px] mt-[23px] w-[18px]" onClick={
                ()=>{
                    setIsImageDialogOpen(false);
                setIsVideoDialogOpen(true)
            }}/>
            <button className="ml-[10px]" onClick={()=>{
                async function addMessage()
                {
                 let response=await axios.post(`http://127.0.0.1:5000/maritime/message/addmessage/${localStorage.getItem("UID")}/${receiverId}`,{text,mediaType,mediaUrl,addedON:new Date().toLocaleDateString(),addedAt:new Date().toLocaleTimeString()})
                 if(response.data.success)
                 {
                    getMessages()
                    toast.success("Messaged Added")
                    console.log("Message Added")
                 }
                }
                addMessage()
            }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkMqLSGuqfKU7xlVdfYV4-6HyT1VjKQd_6Sg&s" className="h-[25px] w-[25px] mt-[15px]"/>
            </button>

        </div>
    </div>)
}
}
export default Chat