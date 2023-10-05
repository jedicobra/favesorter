function Results({itemsWithScores}) {
  const listItems = itemsWithScores.map(element => 
    <>
      <img alt="Thumbnail" className='thumbnail' width='100' height='50' src={element.imageUrl} />
      <li>
        {element.name} 
        <br></br> 
        ELO: {element.score}
      </li>
      <br></br>
      <br></br>
      <br></br>
    </>
  );

  return (<ol className='rankedList'>{listItems}</ol>);
}


export default Results;
