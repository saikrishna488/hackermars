import Projects from '../components/projects/Projects'
import axios from 'axios';

const page = async () => {

  let projects = [];

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/project/getprojects',{
      next :{revalidate : 60}
    });

    const data = await res.json();

    if (data.res) {
      projects = data.projects;
    }
    else {
      console.log(data.msg);
    }

  }
  catch (err) {
    console.log(err);
  }


  return <Projects projs={projects}/>
}

export default page