import React,{useEffect, useState} from 'react'
import { actionGetme } from "../api/auth"
import useAuthStore from '../store/auth-store';

function ProtectRoute({el, allows}) {

    const token = useAuthStore((state) => state.token)
    console.log("Protect Route js")
    console.log(token)

    const [ ok, setOk ] = useState(null)

    useEffect(() => {

        console.log("Step 2 in use Effect")
        checkPermission()
    },[])

    const checkPermission = async () => {
        try {
            const res = await actionGetme(token)
            const role = res.data.result.role;
            console.log(role)

            if(allows.includes(role)){

                setOk(true)
            } else {
                setOk(false)
            }
        } catch (error) {
            setOk(false)
            // console.log(error.response.data?.message)
        }
    }
    console.log(ok)
  
    if( ok === null) {
        console.log("Step 1 in ok === null")
        return <h1>Loading...</h1>
    }
    if( !ok ) {
        return <h1>Hello, USER !!!</h1>
    }
    return el;
}

export default ProtectRoute