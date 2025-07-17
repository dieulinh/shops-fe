
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync } from "@/features/blogs/postsSlice.js";
import {useEffect, useState, useRef} from "react";

import {Link} from "react-router-dom";
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

const NewPost = () => {

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{'header': 1}],
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
  ];
  const editorRef = useRef()
  const dispatch = useDispatch();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const handleContent = (value) => {
    console.log('value', value)
  }


  const createPost = () => {
    dispatch(createPostAsync({post: {title, content}}))
    setTimeout(()=> {
      console.log('Post created')
      setTitle('')
      setContent('')
    })


  }


  return <>
    <h1>Create a new post</h1>
    <div className={"flex-right"}><Link to={"/blogs"}>Blog</Link></div>
    <div className={"form-control"}>
      <label>blog title</label>
      <input name="title" placeholder={"title"} onChange={(e) => setTitle(e.target.value)}/>
    </div>

    <div className={"blog-editor"}>
      <ReactQuill theme="snow" modules={{toolbar: toolbarOptions}} ref={editorRef} onChange={handleContent} rows={"10"} />
    </div>


    <div className={"job-apply"}>
      <button onClick={createPost} disabled={status === 'loading'} className={"btn primary-btn"}>Create Post
      </button>
    </div>

  </>
}
export default NewPost;