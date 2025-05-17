import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchJobApplicationAsync} from "@/features/jobs/jobsSlice.js";


const JobApplication = () => {
  const {job_application_id} = useParams()

  console.log('job_application_id', job_application_id)
  const dispatch = useDispatch();
  const {currentJobApplication, status} = useSelector((state) => state.jobs)
  const requestAvailability = () => {
    console.log('requestAvailability')

  }
  useEffect(() => {
    dispatch(fetchJobApplicationAsync({id: job_application_id}))

  }, [dispatch, job_application_id]);

  if(status === 'loading' || status==='idle') return <div>Loading...</div>
  if(status === 'failed') return <div>Failed to load job application</div>
  if(!currentJobApplication) return null

  const {name,resume_url, email, cover_letter, created_at,job_title} = currentJobApplication
  const createdAt = (new Date(created_at)).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return <>
    <h1>{name} Job application - {job_title}</h1>
    <div className={"job-application-details"}>
      <div className={"flex-right"}> <button onClick={requestAvailability} className={"btn primary-btn flex-right"}>Request candidate availability</button></div>
      <div className={"flex-right"}>Applied at: {createdAt}</div>

      <p> name {name} </p>
      <p> email {email}</p>
      <p>Cover letter: {cover_letter}</p>
      <p> Resume: {resume_url && <a href={resume_url} target="_blank" rel="noopener noreferrer">Download Resume</a>}</p>
    </div>
  </>
}
export default JobApplication;