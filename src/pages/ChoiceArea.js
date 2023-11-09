import React, { useState } from 'react';
import Results from './Results';
import '../css/ChoiceArea.css'


// doing this with elo is so bad
// need to get the number of matches down
// gamefaqssort with 128 items takes 127-448 matches with that google translated japanese source code

export default function ChoiceArea({categoryData}){

  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [currentList, setCurrentList] = useState([]);
  const [sublistIndex, setSublistIndex] = useState(0)
  const [nextList, setNextList] = useState([]);
  const [justStarted, setJustStarted] = useState(true);
  const [sublistLength, setSublistLength] = useState(1)

  React.useEffect(function setupListener() {
    window.addEventListener("keydown", handleKeyPress)

    return function cleanupListener() {
      window.removeEventListener("keydown", handleKeyPress)
    }
  })
  
  

  


  // TODO this should get done in App or somewhere
  let id = 0;
  let itemList = categoryData.filenames.map(name => buildItem(name))
  function buildItem(name){
    let result = {
      id: id, 
      name: name, 
      imageUrl: "/images/" + categoryData.foldername + "/" + name
    };
    id++;
    return result;
  }


  

  if(justStarted){
    // split into sublists for merge sort type situation
    let splitList = itemList.map(item => [item])

    setCurrentList(splitList);
    setNextList([Math.ceil(currentList.length / 2.0)])
    setJustStarted(false);
  }


  // if we're done with the current sublists move on to the next 2
  // like [a, b, c, >d] [e, f, g, >h] ok done move on
  // or some shit
  if (sublistIndex === sublistLength){
    setCurrentListIndex(currentListIndex + 1);
    setSublistIndex(0)
  }

  let gameOver = false;

  if(currentListIndex === currentList.length - 1){
    // time to merge (go up a level)
    let tempCurrentList = currentList;
    setCurrentList(nextList);
    setSublistLength(sublistLength * 2);

    if(currentList.length === itemList.length)
      gameOver = true;
    else
      setNextList([Math.ceil(tempCurrentList.length / 2.0)])
  }
  
  let leftItem, rightItem = {id: -1, name: '', imageUrl: ''};

  if(gameOver){
    return <Results sortedList={currentList} />;
  }
  else{
    let sublist1 = currentList[currentListIndex*2];
    let sublist2 = currentList[currentListIndex*2 + 1];

    leftItem = sublist1[sublistIndex];
    rightItem = sublist2[sublistIndex];
  }

  

  return(
    <>
      <p className='progressIndicator'>??? matches remaining</p>

      <div className='ChoiceArea'>
        <div className='choice'>
          <img alt='Option 1' width='280' height='385' onClick={() => makeChoice('left')} src={leftItem.imageUrl} />
          <p >{leftItem.name.toUpperCase()}</p>
        </div>

        <p className='vs'>VS.</p>

        <div className='choice'>
          <img alt='Option 2' width='280' height='385' onClick={() => makeChoice('right')} src={rightItem.imageUrl}/>
          <p >{rightItem.name.toUpperCase()}</p>
        </div>
      </div>
      <br></br>
      <div className='buttonControls'>
        <button className='button-23' onClick={() => undo()}>Undo ↓</button>
        <button className='button-23' onClick={() => makeChoice('tie')}>Skip ↑</button>
      </div>
    </>
  );


  function makeChoice(choice) {
    if(choice === 'left'){
      nextList[currentListIndex] += leftItem;
      nextList[currentListIndex] += rightItem;
    }
    else if(choice === 'right'){
      nextList[currentListIndex] += rightItem;
      nextList[currentListIndex] += leftItem;
    }
    else {
      // who care
    }

    setSublistIndex(sublistIndex + 1);
  }



  function handleKeyPress(event) {
    if(event.key === "ArrowDown")
      undo();
    else if(event.key === "ArrowUp")
      makeChoice('tie');


    // you have to do this or else we get 1 million keydowns per millisecond
    else if (event.repeat)
      return 

    else if(event.key === "ArrowLeft")
      makeChoice("left");
    else if(event.key === "ArrowRight")
      makeChoice("right");
    
  }

  function undo() {
    // make it again asshole
  }



}