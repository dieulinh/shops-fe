import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchJobAsync} from "@/features/jobs/jobsSlice.js";

const Job = () => {
  const {job_id} = useParams()
  console.log('job_id', job_id)
  const dispatch = useDispatch();
  const {currentJob, status} = useSelector((state) => state.jobs)

  // const [job,setJob] = useState({})
  useEffect(() => {
    dispatch(fetchJobAsync({job_id}))

  }, [dispatch]);
  if(status === 'loading') return <div>Loading...</div>
  if(!currentJob) return null
  const {id, title, location, description} = currentJob
  if(status)
  return <>
    <h1>{title}</h1>
    <div className={"job-description"}>
      <span>{location}</span>
      <div className={'job-content'}>
        <p>{description}</p>
      </div>
    </div>
    <p>{description}</p>
  </>
}
export default Job;