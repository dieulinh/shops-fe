
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync } from "@/features/blogs/postsSlice.js";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewPost = () => {
  const {status} = useSelector(state => state.jobs)
  const dispatch = useDispatch();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')


  const sendApplication = () => {
    dispatch(createPostAsync({post: {title, content}}))
    setTimeout(()=> {
      console.log('Post created')
      setTitle('')
      setContent('')

    })


  }
  if(status==='loading') return <div>Loading...</div>

  return <>
    <h1>Create a new post</h1>
    <div className={"flex-right"}><Link to={"/blogs"}>Blog</Link></div>
    <div className={"form-control"}>
      <label>blog title</label>
      <input name="title" placeholder={"title"} onChange={(e) => setTitle(e.target.value)}/>
    </div>

    <div className={"blog-editor"}>
      <ReactQuill theme="snow" value={content} onChange={setContent} rows={"10"} />
    </div>


    <div className={"job-apply"}>
      <button onClick={sendApplication} disabled={status === 'loading'} className={"btn primary-btn"}>Send Application
      </button>
    </div>

  </>
}
export default NewPost;