import { useNavigate } from "react-router"
function SignUpAndLogin()
{
    let navigate=useNavigate()
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
export default SignUpAndLogin