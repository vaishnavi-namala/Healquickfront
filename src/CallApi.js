import axios from 'axios'
import { useEffect, useState } from 'react'

export  const GetApi = (Api) => {
    const [data,setdata]=useState([])
    useEffect(()=>{
        axios.get(Api)
        .then(res=>{
            setdata(res.data)
        })
        .catch(err=>{
            alert(err)
        })
    },[Api,data])
  return (data)
}


export const DeleteApi = (Api) => {
    axios.delete(Api)
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>{
        console.log(err)
    }
    )
}


