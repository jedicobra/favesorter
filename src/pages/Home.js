import '../css/Home.css';

// fav sorter for arbitrary things
// maybe you could swipe options away like cards

import data from '../data.json'
import CategoryPreview from './CategoryPreview';

function Home() {

  return <div className='homeMenuMain'>
    <br></br>
    <h1>My journey</h1>
    <p>
      Find your favorite whatever
      <br></br>
      Based on <a href="https://slimedrippings.tumblr.com/gamefaqssort">this website</a> 
    </p>


    <h1>Premade templates</h1>
    <p>These are just some lists I made arbitrarily</p>

    <CategoryPreview category={data.pixarmovies}></CategoryPreview>
    <CategoryPreview category={data.youtubers}></CategoryPreview>
    <CategoryPreview category={data.importantgames}></CategoryPreview>

    
  </div>


}


export default Home;
