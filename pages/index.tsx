import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/Home.module.css'
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
      const data = {
        email,
        password,
      };
  
      await signIn(data);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit} >
      <input
        className={styles.input}
        type="email"
        name='email'
        placeholder='E-mail'
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className={styles.input}
        type="password"
        name='password'
        placeholder='Senha'
        onChange={e => setPassword(e.target.value)}
      />
      <button className={styles.submitButton} type='submit' >Entrar</button>
    </form>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});

