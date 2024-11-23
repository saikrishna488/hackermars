import ProjectPage from '@/app/components/projects/Project'
import axios from 'axios';
import React from 'react'

const page = async ({ params }) => {

  let p = {};
  const id = (params.project)

  try {

    const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/project/getproject/' + id);

    if (res.data.res) {
      p = res.data.project;
    }

    else {
      console.log(res.data.msg);
    }
  }
  catch (err) {
    console.log(err);
  }


  return p?.title ? <ProjectPage project={p} /> : <div>Project not found</div>;
}

export default page;