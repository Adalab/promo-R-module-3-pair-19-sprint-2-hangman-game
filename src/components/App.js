import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';
// api
import getWordFromApi from '../services/api';
//components
import Header from './Header';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';
import Instructions from './Instructions';
import Options from './Options';
import Dummy from './Dummy';
import Footer from './Footer';

// styles
import '../styles/App.scss';




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

  const handleKeyDown = (value) => {
    // Sabrías decir para qué es esta línea
    value.setSelectionRange(0, 1);
  };

  const handleChange = (value) => {
    let re = /^[a-zA-ZñÑá-úÁ-Ú´]$/; //add regular pattern 
    if (re.test(value) || value === '') {
      handleLastLetter(value);
    }
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
        <Routes>
            <Route path='/' element={
              <section>
                {/*solution*/}
                <SolutionLetters word = {word} userLetters = {userLetters}/>
                {/*Error*/}
                <ErrorLetters word = {word} userLetters = {userLetters}/>
                {/*Form*/}
                <Form lastLetter={lastLetter} handleChange={handleChange} handleKeyDown={handleKeyDown} ></Form>
              </section>
            }/>
            <Route path='/instructions' element={<Instructions/>}/>
            <Route path='/options' element={<Options/>}/>
        </Routes>
        {/*Dummy*/}
        <Dummy getNumberOfErrors={getNumberOfErrors()}/>
      </main>
      {/*Footer*/}
      <Footer/>
    </div>
  );
}

export default App;
