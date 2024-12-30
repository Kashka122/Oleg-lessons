'use client'

import { useEffect, useState } from "react";

type List = Array<{
  id: number
  title: string
  body: string
}>

export default function Home() {
  const [posts, setPosts] = useState<List>([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(value => setPosts(value))
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, [])

  if (error) {
    return <div>{String(error)}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {posts.map(item => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
