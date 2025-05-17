import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchPostsAsync } from '@/features/blogs/postsSlice.js';
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
      <p>Here are some blog posts.</p>
      { posts.map ((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
export default Posts;