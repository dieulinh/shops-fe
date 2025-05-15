import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchJobApplicationsAsync} from "@/features/jobs/jobsSlice.js";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "@/components/Pagination.jsx";

const JobListing = () => {
  const dispatch = useDispatch();
  const [page,setPage] = useState(1)
  const {jobapplications, status, total_pages} = useSelector((state) => state.jobs)
  useEffect(() => {
    dispatch(fetchJobApplicationsAsync({page: page, q: ''}))
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
      {jobapplications.map((job) => {
        const {id, name, email, cover_letter,resume_url} = job
        return <div className={'job-post'} key={id}>
          <Link to={`/jobs/${id}`}><h1>{name}</h1></Link>
          <hr />
          <div className={"job-description"}>
            <p>Resume: {resume_url&&<a href={resume_url} target="_blank" rel="noopener noreferrer">resume</a>}</p>
            <p>Cover letter</p>
            <p>{cover_letter}</p>
            <span>Name: {name}</span>
          </div>
        </div>
      }) }
    </div>
  </>)
}
export default JobListing;