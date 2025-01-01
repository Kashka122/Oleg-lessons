import Image from 'next/image';
import styles from './Modal.module.css'
import { useState, useEffect } from 'react'

interface ModalProps { // made interface for props, to avoid warning of linter about props we've received
  active: boolean;
  setActive: (active: boolean) => void;
  id?: number;
}

export function Modal({active, setActive, id= 0}: ModalProps) {
      const [post, setPost] = useState<{ title: string; body: string } | null>(null);// made types for post element, to avoid warning of linter about types on 44-45 lines
      const [error, setError] = useState(null)
      const [loading, setLoading] = useState(true)

      useEffect(() => {
          setLoading(true)
      
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then(value=> setPost(value))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
        }, [id])
        
        const renderContent = () =>{
            if (error) {
                return (
                <>
                    <Image src="/cross.svg" alt="Error sign" width={128} height={128} />
                    <div className={styles.error}>{String(error)}</div>
                </>
                )
              }
            
              if (loading) {
                  return (
                   <div className={styles.spinner}></div>
                      )
              }

              return (
                <>
                    <p className={styles.title}>{post ? post.title : ''}</p>
                    <p className={styles.body}>{post ? post.body : ''}</p>
                </>
                    )
        }
        

    return (
        <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={()=> setActive(false)} >   
                <div className={styles.modal__content} onClick={e=> e.stopPropagation()}>
                    {renderContent()}
                </div>
        </div>
    )
}