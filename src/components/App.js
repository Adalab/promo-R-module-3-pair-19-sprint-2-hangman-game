import { useEffect, useState } from 'react';

// api
import getWordFromApi from '../services/api';
//components
import Header from './Header';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
// styles
import '../styles/App.scss';
import '../styles/Form.scss';


function App() {
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events

  const handleKeyDown = (ev) => {
    // Sabrías decir para qué es esta línea
    ev.target.setSelectionRange(0, 1);
  };

  const handleChange = (ev) => {
    let re = /^[a-zA-ZñÑá-úÁ-Ú´]$/; //add regular pattern 
    if (re.test(ev.target.value) || ev.target.value === '') {
      handleLastLetter(ev.target.value);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

 

 
  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  return (
    <div className='page'>
      {/*Header*/}
      <Header></Header>
      <main className='main'>
        <section>
          {/*solution*/}
          <SolutionLetters word = {word} userLetters = {userLetters}/>
          {/*Error*/}
          <ErrorLetters word = {word} userLetters = {userLetters}/>
          <form className='form' onSubmit={handleSubmit}>
            <label className='title' htmlFor='last-letter'>
              Escribe una letra:
            </label>
            <input
              autoFocus
              autoComplete='off'
              className='form__input'
              maxLength='1'
              type='text'
              name='last-letter'
              id='last-letter'
              value={lastLetter}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
            />
          </form>
        </section>
        {/*Dummy*/}
        <Dummy getNumberOfErrors={getNumberOfErrors()}/>
      </main>
    </div>
  );
}

export default App;
