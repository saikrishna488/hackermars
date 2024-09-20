
import HackathonPage from '@/app/components/hackathon/Hackathon'
import Navbar from '@/app/components/navbar/Navbar'
import React from 'react'

const page = ({params}) => {
  return (
    <>
    <Navbar/>
    <HackathonPage id={params.hackathon}/>
    </>
  )
}

export default page