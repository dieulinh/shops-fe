import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchJobsAsync} from "@/features/jobs/jobsSlice.js";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@/components/Pagination.jsx";

const JobListing = () => {
  const dispatch = useDispatch();
  const [page,setPage] = useState(1)
  const {jobs, status, total_pages} = useSelector((state) => state.jobs)
  useEffect(() => {
    dispatch(fetchJobsAsync({page: page, q: ''}))
  }, [dispatch, page]);
  if(status === 'loading') return <div>Loading...</div>
  return (<>
    <div className={"flex-full search-bar"}>
      <div className={"form-control"}>
        <input type="text" placeholder={"Location or Title"} className={"search-input"}/>
      </div>
    </div>
    <div className={"job-listing-wrapper"}>
      <div className={"flex-right"}>
        <Pagination totalPages={total_pages} page={page} onPageChange={setPage}/>
      </div>
      {jobs.map((job) => {
      const {id, title, description, location} = job
      return <div className={'job-post'} key={id}>
        <Link to={`/jobs/${id}`}><h1>{title}</h1></Link>
        <hr />
        <div className={"job-description"}>
          <p>Job description</p>
          <p>{description}</p>
          <span>Location: {location}</span>
        </div>
      </div>
    }) }
    </div>
  </>)
}
export default JobListing;