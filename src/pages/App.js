import { useState } from 'react';
import '../css/App.css';
import ChoiceArea from './ChoiceArea';
import Results from './Results';

// fav sorter for arbitrary things
// maybe you could swipe options away like cards

import data from '../data.json'

function App() {
  const [category, setCategory] = useState('');
  const [results, setResults] = useState([])

  const mainMenu = <>
    <p>Select your whatever</p>
    <button onClick={() => setCategory(data.pixarmovies)}>Pixar Movies</button>
    <button onClick={() => setCategory(data.pixarlite)}>Pixar test</button>
  </>


  if(category === '')
    return mainMenu;
  else if(results.length > 0)
    return <Results sortedList={results} />
  else
    return <ChoiceArea categoryData={category} showResults={setResults}/>
}


export default App;
