'use client';
import { Modal } from '../components/Modal/Modal';
import styles from './page.module.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/Input';

type List = Array<{
  id: number | null;
  title: string;
  body: string;
}>;

export default function Home() {
  const [posts, setPosts] = useState<List>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [idForModal, setIdForModal] = useState<number | null>(null);
  const [userId, setUserId] = useState<string>('');
  const abortControllerRef = useRef<AbortController|null>(null);

  useEffect(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    setLoading(true);
    let didAbort = false;
    fetch(userId
      ?`https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      :'https://jsonplaceholder.typicode.com/posts',
      {signal: abortControllerRef.current?.signal}  
    ).then((response) => response.json())
    .then((value) => setPosts(value))
    .catch((error) => {if (error.name === 'AbortError') {
      didAbort = true;
    } else {
      setError(error);
    }})
    .finally(() => { if (!didAbort){setLoading(false);}});  
  }, [userId]);

  const showPosts = (posts:List) =>{
    if(posts.length){
      return (posts.map((item) => (
        <div key={item.id} className={styles.post}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.text}>{item.body}</p>
          <button
            className={styles.btn}
            onClick={() => {
              setModalActive(true);
              setIdForModal(item.id);
            }}
          >
            Подробнее
          </button>
        </div>
      )))
    } else{
      return (
        <div>There is no user with id:{userId}, or this user has no written posts</div>
      )
    }
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Image src="/cross.svg" alt="Error sign" width={128} height={128} />        
        <div className={styles.error}>{String(error)}</div>
      </div>
    );
  
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <Input
          type="number"
          placeholder="Enter  User ID, to show their messages..."
          setId={setUserId}
        />
        <div className={styles.posts}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
    <Input
        type="number"
        placeholder="Enter  User ID, to show their messages..."
        setId={setUserId}
      />
    <div className={styles.posts}>      
      {showPosts(posts)}
      <Modal active={modalActive} onOpen={setModalActive} id={idForModal} setId={setIdForModal} />
    </div>
  </div>
  );
}
