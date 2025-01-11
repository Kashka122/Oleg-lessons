import Image from 'next/image';
import styles from './Modal.module.css';
import { useState, useEffect } from 'react';

interface ModalProps {
  active: boolean;
  onOpen: (active: boolean) => void;
  id: number | null;
  setId: (id: number | null) => void
}

export function Modal({ active, onOpen, id = 0, setId }: ModalProps) {
  const [post, setPost] = useState<{ title: string; body: string } | null>(
    null
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if(id){
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((value) => setPost(value))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [id]);

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
        <p className={styles.title}>{post ? post.title : ''}</p>
        <p className={styles.body}>{post ? post.body : ''}</p>
      </>
    );
  };

  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => {
          setId(null);
          onOpen(false)
        }
      }
    >
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    </div>
  );
}
