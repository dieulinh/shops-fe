
import { useDispatch, useSelector } from "react-redux";
import { sendJobApplicationAsync } from "@/features/jobs/jobsSlice.js";
import {useEffect, useState} from "react";

const NewJobApplication = ({jobId,appliedsuccess}) => {
  const {auth} = useSelector(state => state.auth)

  const {status} = useSelector(state => state.jobs)
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [resume, setResume] = useState('')
  const [coverLetter, setCoverLetter] = useState('')

  const handleChange = (e) => {
    const {name, value} = e.target
    console.log('name', name)
    console.log('value', value)
    formData.append(name, value)
  }
  const sendApplication = () => {
    console.log('sendApplication', jobId)
    const formData = new FormData();

    formData.append("job_id", jobId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("cover_letter", coverLetter);
    formData.append("resume", resume);


    console.log('formData', formData)
    dispatch(sendJobApplicationAsync(formData))
    setTimeout(()=> {
      appliedsuccess()
    })

  }
  if(status==='loading') return <div>Loading...</div>

  return <>
    <h1>Apply</h1>
    <div className={"form-control"}>
      <label>Your name</label>
      <input name="name" placeholder={"name"} onChange={(e) => setName(e.target.value)}/>
    </div>
    <div className={"form-control"}>
      <label>Email</label>
      <input name="email" placeholder={"email"} onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className={"form-control"}>
      <label>Cover letter</label>
      <textarea name="cover_letter" placeholder={"cover letter"} rows="5" onChange={(e) => setCoverLetter(e.target.value)}/>
    </div>


    <div className={"form-control"}>
      <label>Resume</label>
      <input type="file" name="resume" accept={'image/*,.pdf,.docx,.doc'} onChange={(e) => setResume(e.target.files[0])}
             placeholder={"choose resume file"}/>
    </div>

    <div className={"job-apply"}>
      <button onClick={sendApplication} disabled={status === 'loading'} className={"btn primary-btn"}>Send Application
      </button>
    </div>

  </>
}
export default NewJobApplication;