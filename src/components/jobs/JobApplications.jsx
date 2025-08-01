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
  }, [dispatch, page, total_pages]);
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
        const {id, name, email, cover_letter,resume_url, created_at} = job
        const createdAt = (new Date(created_at)).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        return <div className={'job-post'} key={id}>
          <Link to={`/job_applications/${id}`}><h1>{name} {email} </h1></Link>

          <div className={"job-description"}>
            <div>Resume: {resume_url&&<a href={resume_url} target="_blank" rel="noopener noreferrer">resume</a>} <span className={"flex-right"} >{createdAt}</span></div>
            <p>Cover letter</p>
            <p><strong>{cover_letter}</strong></p>
            <span>Name: {name}</span>
          </div>
          <hr />
        </div>
      }) }
    </div>
  </>)
}
export default JobListing;