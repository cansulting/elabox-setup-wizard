import React,{ useState,useEffect } from 'react'
import * as Icon from "@aw-web-design/react-feather"
export default function Validation({label, validation =()=>{},src}) {
  const [isValid,setIsValid]=useState(false)
  useEffect(()=>{
    if(Array.isArray(src)){
      setIsValid(validation())      
    }
    setIsValid(validation(src))
    //eslint-disable-next-line
  },Array.isArray(src) ? src:[src])
  const icon = isValid ? <Icon.CheckCircle color="green"/>:<Icon.XCircle color="red"/>
  return (
    <p 
    style={{
        fontSize:12,display:"flex",
        justifyContent:"flex-start",alignItems:"center"
        }}>
        {icon} <span style={{marginLeft:"0.5em"}}>{label}</span>
    </p>
  )
}