import {create} from 'zustand'
let userStore=create((set,get)=>({
    user:{UID:localStorage.getItem("UID")},
    socket:null,
    setUser:(_user)=>{
       let user=  get().user
       console.log(user)
        set({user:_user})
    },
    setSocket:(_socket)=>{
        console.log("Updating Socket",_socket)
        set({socket:_socket})
    }
}))
export default userStore