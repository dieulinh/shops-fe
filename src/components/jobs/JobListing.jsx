import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchJobsAsync} from "@/features/jobs/jobsSlice.js";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const JobListing = () => {
  const dispatch = useDispatch();
  const {jobs, status} = useSelector((state) => state.jobs)
  useEffect(() => {
    dispatch(fetchJobsAsync({page: 1,q: ''}))
  }, [dispatch]);
  if(status === 'loading') return <div>Loading...</div>
  return (<>
    {jobs.map((job) => {
      const {id,title,description,location} = job
      return <div className={'job-post'} key={id}>
        <Link to={`/jobs/${id}`}><h1>{title}</h1></Link>
        <div className={"job-description"}>
          <span>{location}</span>
        </div>
        <p>{description}</p>

      </div>
    }) }
  </>)
}
export default JobListing;