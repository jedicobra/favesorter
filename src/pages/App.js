import '../App.css';
import ChoiceArea from './ChoiceArea';
import testList from '../data/testdata.json';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// fav sorter for arbitrary things
// maybe you could swipe options away like cards
// 64bits video

function App() {
  document.body.style = 'background:#1F1F1F'

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<ChoiceArea itemList={testList.real_games}/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
