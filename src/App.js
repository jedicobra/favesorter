import './App.css';
import testList from './testdata.json'
import ChoiceArea from './ChoiceArea';

// fav sorter for arbitrary things
// maybe you could swipe options away like cards
// 64bits video

function App() {

  return (
    <div className="App">
      <ChoiceArea itemList={testList.real_games}/>
    </div>
  );
}





export default App;
