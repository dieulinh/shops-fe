import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchPostsAsync } from '@/features/blogs/postsSlice.js';
import {Link} from "react-router-dom";
import HtmlContent from "@/components/common/HtmlContent.jsx";
const Posts = () => {
  const { posts, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPostsAsync({page: 1, query: ''}));
    }
  },[dispatch])
  if(status === 'loading' || status==='idle') return <div>Loading...</div>

  return (
    <div className="posts">
      <h1>Posts</h1>
      <div className={"flex-right"}><Link to={"/blogs/new"}>Create new post</Link></div>
      <p>Here are some blog posts.</p>
      { posts.map ((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <HtmlContent html={post.content}/>
        </div>
      ))}
    </div>
  );
}
export default Posts;