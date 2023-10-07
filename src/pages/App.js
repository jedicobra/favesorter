import '../css/App.css';
import ChoiceArea from './ChoiceArea';
import testList from '../data/testdata.json';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// fav sorter for arbitrary things
// maybe you could swipe options away like cards

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<ChoiceArea itemList={testList.real_games}/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
