
import HackathonPage from '@/app/components/hackathon/Hackathon'
import Navbar from '@/app/components/navbar/Navbar'
import axios from 'axios'
import React from 'react'

const page =  async ({params}) => {


  let hackathon = {}
    try {

        const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/hackathon/one?id=' + params.hackathon)

        if (res.data.res) {
            hackathon = res.data.hackathon
        }
        else {
            console.log(res.data.msg)
        }

    }
    catch (err) {
        console.log("Error occured",params.id)
        // toast.error("Error occured")
    }

  return (
    <>
    <HackathonPage hackathonn={hackathon}/>
    </>
  )
}

export default page