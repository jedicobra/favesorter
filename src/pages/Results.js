import '../css/Results.css'

function Results({itemsWithScores}) {
  const listItems = itemsWithScores.map(element => 
    <>
      <img alt="Thumbnail" className='thumbnail' width='50' height='50' src={element.imageUrl} />
      <li>
        <b>{element.name}</b>
        <br></br> 
        ELO: {element.score}
        <br></br>
        <br></br>
      </li>
    </>
  );

  return (<ol className='rankedList'>{listItems}</ol>);
}


export default Results;
