import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import userStore from "./store"
import io from 'socket.io-client'
function Conversations({socket})
{
   console.log(socket)
   let navigate=useNavigate()
      
    const [successfullyFetched,setSuccessfullyFetched]=useState(false)
    const [users,setUsers]=useState([])
    const [conversations,setConversations]=useState([])
    useEffect(()=>{
        socket.on("connected",()=>{
            console.log("I am connected")
        })

        async function getConversations()
        {
    
           
            let conversationsResponse=await axios.get(`http://127.0.0.1:5000/maritime/message/getconversations/${localStorage.getItem("UID")}`)
            console.log(conversationsResponse.data.conversations)
            if(conversationsResponse.data.success)
            {



                setSuccessfullyFetched(true)
                setConversations(conversationsResponse.data.conversations)
            
            }
        }
        if(successfullyFetched==false)
        {
        getConversations()
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

    return(<div className="flex flex-col">
        <div className="flex flex-row">
        {
            users.map((user)=>{
               return(<Link to={`/chat/${user.id}`}><div className="flex flex-col font-nsimsun w-[500px] ml-3 rounded-sm flex-wrap">
                    <img src={user.profilePhotoUrl} className="h-[150px] w-[500px]"/>
                    <h1 className="font-extrabold text-[12px] text-center">{user.name}</h1>
                    <button className="text-white bg-green-700 rounded-full text-center text-[10px] font-bold">Message</button>

                </div>
                </Link>
               )
            })

        }
        </div>
        <div className="flex flex-row justify-between">
        <div className="w-full sm-full md:w-3/4 lg:w-1/2 xl:w-1/2 m-auto">
            {
                conversations.length==0?<h5 className="text-center font-alice font-extrabold">No Conversations!</h5>:conversations.map((conversation)=>{
                    return(<Link to={`/chat/${conversation.UID}`}><div className="flex flex-row  mt-[5px] bg-white text-black rounded-full  justify-between font-alice">
                        <img src={conversation.withProfilePhotoUrl} className="h-[50px] w-[50px] rounded-full"/>
                        <div className="flex flex-col w-[130px]">
                            <h1 className="font-bold text-[11px]">{conversation.with}</h1>
                            <h3 className="font-thin text-[10px]">{conversation.lastMsg.text.length>0?conversation.lastMsg.text:(conversation.lastMsg.mediaUrl.length>0&&conversation.lastMsg.mediaType=="image")&&(conversation.lastMsg.senderId==localStorage.getItem("UID"))?<h1>(You)Sent An Image</h1>:(conversation.lastMsg.mediaUrl.length>0&&conversation.lastMsg.mediaType=="video")&&(conversation.lastMsg.senderId==localStorage.getItem("UID"))?<h1>(You) Sent A Video</h1>:(conversation.lastMsg.mediaUrl.length>0&&conversation.lastMsg.mediaType=="image")&&(conversation.lastMsg.senderId!=localStorage.getItem("UID"))?<h1>({conversation.with}) Sent An Image</h1>:(conversation.lastMsg.mediaType=='video'&&conversation.lastMsg.mediaUrl.length>0)&&(conversation.lastMsg.senderId!=localStorage.getItem("UID"))?<h1>({conversation.with}) Sent A Video</h1>:<></>}</h3>
                            </div>
                            <h4 className="font-semibold text-[10px] mr-[8px]">{conversation.lastMsg.addedON==new Date().toLocaleDateString()?conversation.lastMsg.addedAt:conversation.lastMsg.addedON}</h4>
                    </div>
                    <hr></hr>
                    </Link>)
                })
                
            }
        
        </div>
        </div>
       
    </div>)
}
}
export default Conversations