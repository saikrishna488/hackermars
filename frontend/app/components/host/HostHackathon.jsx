"use client"
import React, { useState, useContext, useEffect } from 'react'
import { globalContext } from '@/context_api/globalContext'
import Aside from './Aside'
import MainSection from './MainSection'
import { useRouter } from 'next/navigation'

const HostHackathon = () => {

    const router = useRouter()

    const { client, hackathon } = useContext(globalContext);
    const [fields, setFields] = useState(hackathon?.title ? hackathon : {
        title: '',
        image: null,
        team_size: '',
        about: '',
        themes: [],
        judges: [''],
        organizers: [''],
        description: '',
        partners: [''],
        prizes: [],
        date: '',
        mode: '',
        phone: '',
        email: '',
        max_users: '',
        fee: '',
        eligibility: '',
        isPrivate: false,
        start_time: '',
        end_time: '',
        conducted_by: client.name,
        client_id: client._id
    })



    useEffect(()=>{
        if (!client?.name) {
            router.push('/host')
        }

        console.log(hackathon)
    })


    


    return (
        <div className='flex flex-col w-full h-[100vh]'>
            <div className='flex lg:flex-row flex-col w-full h-full'>
                <Aside />
                <MainSection fields={fields} setFields={setFields} client={client} />
            </div>

        </div>
    )
}

export default HostHackathon