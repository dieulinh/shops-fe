import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchJobsAsync} from "@/features/jobs/jobsSlice.js";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const JobListing = () => {
  const dispatch = useDispatch();
  const [currentPage,setCurrentPage] = useState(1)
  const {jobs, status, total_pages} = useSelector((state) => state.jobs)
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= total_pages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            margin: '0 4px',
            fontWeight: currentPage === i ? 'bold' : 'normal',
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  useEffect(() => {
    dispatch(fetchJobsAsync({page: currentPage, q: ''}))
  }, [dispatch, currentPage]);
  if(status === 'loading') return <div>Loading...</div>

  return (<>
    <div className={"flex-full search-bar"}>
      <div className={"form-control"}>
        <input type="text" placeholder={"Location or Title"} className={"search-input"}/>
      </div>
    </div>
    <div className={"job-listing-wrapper"}>
      <div className={"flex-right"}>
        {renderPages()}
      </div>
      {jobs.map((job) => {
      const {id, title, description, location} = job
      return <div className={'job-post'} key={id}>
        <Link to={`/jobs/${id}`}><h1>{title}</h1></Link>
        <hr />
        <div className={"job-description"}>
          <p>Location {location}</p>
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