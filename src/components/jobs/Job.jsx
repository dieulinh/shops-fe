import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchJobAsync} from "@/features/jobs/jobsSlice.js";
import NewJobApplication from "@/components/jobs/NewJobApplication.jsx";

const Job = () => {
  const {job_id} = useParams()
  const [newJobApplication, setNewJobApplication] = useState(false)
  console.log('job_id', job_id)
  const dispatch = useDispatch();
  const {currentJob, status} = useSelector((state) => state.jobs)
  const [applied, setApplied] = useState(false)
  const onClose = () => {
    setNewJobApplication(false)
  }
  const handleShowForm = (isOpen=true) => {
    setApplied(isOpen)

    setNewJobApplication(isOpen)

  }
  useEffect(() => {
    dispatch(fetchJobAsync({job_id}))

  }, [dispatch]);
  if(status === 'loading') return <div>Loading...</div>
  if(!currentJob) return null
  const {id, title, location, description, company_name} = currentJob

  if(status==='loading') return <div>Loading...</div>
  return <>
    <h1>{title} - { company_name}</h1>
    <div className={"job-description"}>
      <p>Working location <span>{location}</span></p>
      <div className={"tags"}>
        <ul className={"tagging"}></ul>
      </div>
      <div className={'job-content'}>
        <p>{description}</p>
      </div>
    </div>

    <div className={"job-apply"}>
      <button onClick={handleShowForm} className={"btn primary-btn"}>Apply</button>
    </div>
    {newJobApplication &&  <div id="myModal" className={'modal modal-open'}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
      <NewJobApplication jobId={job_id} appliedsuccess={onClose}/> </div></div>}
  </>
}
export default Job;