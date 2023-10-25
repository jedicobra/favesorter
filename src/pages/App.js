import { useState } from 'react';
import '../css/App.css';
import ChoiceArea from './ChoiceArea';

// fav sorter for arbitrary things
// maybe you could swipe options away like cards

import data from '../data.json'

function App() {
  const [category, setCategory] = useState('');

  const mainMenu = <>
    <p>Select your whatever</p>
    <button onClick={() => setCategory(data.pixarmovies)}>Pixar Movies</button>
  </>


  if(category === ''){
    return mainMenu;
  }
  else{
    return <ChoiceArea categoryData={category}/>
  }
}


export default App;
