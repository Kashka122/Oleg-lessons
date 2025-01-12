import Image from 'next/image';
import styles from './Input.module.css';
import { useRef,useState } from 'react';


interface InputProps {
  type: string;
  placeholder: string;
  setId:(id:string)=>void;
}

export function Input({ type, placeholder, setId }: InputProps) {

    const [value, setValue] = useState<string>('');
    const [currentValue, setCurrentValue] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null);
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
        
        const inputValue = event.target.value;
        const correctValue = inputValue.replace(/[eE]/g, '');
        setValue(correctValue);
        console.log(inputRef);
        
    }
    const  setUserId = ()=>{
        if(currentValue != value){
            setCurrentValue(value);
            setId(value);
        }
        
    }

    const enterKeyHandler = (e:React.KeyboardEvent<HTMLInputElement>) =>{
      if( e.key === 'Enter'){
        setUserId();
      } else if (e.key === 'e'|| e.key === 'E'){
        setValue(value.slice(0,value.length));
      }
    }

    return (
    <div className={styles.input}>
      <input value={value} type={type} ref={inputRef} placeholder={placeholder} className={styles.input__line} onInput={handleInput} onKeyDown={enterKeyHandler}/>
      <button className={styles.input__btn} onClick={setUserId}>
        <Image src="/search.svg" alt="Search icon" width={25} height={25} />
      </button>
    </div>
  );
}
