'use client';
import { Modal } from '../components/Modal/Modal';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type List = Array<{
  id: number;
  title: string;
  body: string;
}>;

export default function Home() {
  const [posts, setPosts] = useState<List>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [idForModal, setIdForModal] = useState(0);

  useEffect(() => {
    setLoading(true);

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((value) => setPosts(value))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const renderContent = () => {
    if (error) {
      return (
        <>
          <Image src="/cross.svg" alt="Error sign" width={128} height={128} />
          <div className={styles.error}>{String(error)}</div>
        </>
      );
    }

    if (loading) {
      return <div className={styles.spinner}></div>;
    }

    return (
      <>
        {posts.map((item) => (
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
        ))}
      </>
    );
  };

  return (
    <div className={styles.container}>
      {renderContent()}
      <Modal active={modalActive} setActive={setModalActive} id={idForModal} />
    </div>
  );
}
