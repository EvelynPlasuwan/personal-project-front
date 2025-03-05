import React,{useEffect, useState} from 'react'
import { actionGetme } from "../api/auth"
import useAuthStore from '../store/auth-store';

function ProtectRoute({children, allows}) {
   
    const [ ok, setOk ] = useState(null)

    const token = useAuthStore((state) => state.token)
    // console.log("Protect Route js")
    // console.log(token)


    useEffect(() => {

        // console.log("Step 2 in use Effect")
        checkPermission()
    },[])

    const checkPermission = async () => {
        try {
            const res = await actionGetme(token);
            console.log("Response from getMe:", res.data);


            // const role = res.data.result?.role || res.data.users?.role;


            // setOk(allows.includes(role));
            const role = (res.data.result?.role || res.data.users?.role || "").toLowerCase();
            setOk(allows.map(a => a.toLowerCase()).includes(role));

            
        } catch (error) {
            setOk(false)
            console.log(error.response?.data?.message || error.message);
        }
    }
    console.log(ok)
  
    if( ok === null) {
        console.log("Step 1 in ok === null")
        return <h1>Loading...</h1>
    }
    if( !ok ) {
        return <h1>Unauthorized!!!</h1>
    }
    return children;
}

export default ProtectRoute