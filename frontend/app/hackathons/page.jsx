
import Navbar from '../components/navbar/Navbar'
import Hackathons from '../components/hackathons/Hackathons'
import axios from 'axios';

const page = async () => {

  let hackathons = [];
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/hackathon/show');

    if (res.data.res) {
      hackathons = res.data.hackathons;
    } else {
      console.log(res.data.msg);
    }
  }
  catch (err) {
    console.log(err);
  }

  return (
    <>
      <div className='min-h-screen'>
        <Hackathons hackathonss={hackathons} />
      </div>
    </>
  )
}

export default page