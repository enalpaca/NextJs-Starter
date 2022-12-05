import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { pid , foo, foo1} = router.query;
  console.log(Object.keys(router.query)); //['pid', 'foo', 'foo1']
  console.log(Object.values(router.query));
  return <p>Post: {Object.values(router.query)}</p>
}

export default Post