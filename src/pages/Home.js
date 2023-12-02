import '../css/Home.css';

// fav sorter for arbitrary things
// maybe you could swipe options away like cards

import data from '../data.json'
import CategoryPreview from './CategoryPreview';

function Home() {

  return <div className='homeMenuMain'>
    <br></br>
    <h1>Premade templates</h1>
    <p>These are just some lists I made arbitrarily</p>

    <CategoryPreview category={data.pixarmovies}></CategoryPreview>
    <CategoryPreview category={data.youtubers}></CategoryPreview>
    <CategoryPreview category={data.importantgames}></CategoryPreview>

    
  </div>


}


export default Home;
