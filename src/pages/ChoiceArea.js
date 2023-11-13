import React, { useState } from 'react';
import '../css/ChoiceArea.css'


// doing this with elo is so bad
// need to get the number of matches down
// gamefaqssort with 128 items takes 127-448 matches with that google translated japanese source code

export default function ChoiceArea({categoryData, showResults}){

  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [currentList, setCurrentList] = useState([]);
  const [leftSublistIndex, setLeftSublistIndex] = useState(0)
  const [rightSublistIndex, setRightSublistIndex] = useState(0)
  const [nextList, setNextList] = useState([]);
  const [justStarted, setJustStarted] = useState(true);
  const [sublistLength, setSublistLength] = useState(1)

  const [gameOver, setGameOver] = useState(false)

  React.useEffect(() => {
    if(gameOver)
      showResults(nextList[0])

    
  })  

  React.useEffect(function setupListener() {
    window.addEventListener("keydown", handleKeyPress)

    return function cleanupListener() {
      window.removeEventListener("keydown", handleKeyPress)
    }
  })  

  //probably like a hook for this
  if(justStarted){
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

  
    // split into length-1 sublists for merge sort type situation
    let splitList = itemList.map(item => [item])
    setCurrentList(splitList);

    let tempNextList = new Array(Math.ceil(splitList.length / 2.0))
    for(let i=0; i < tempNextList.length; i++)
      tempNextList[i] = [];
    setNextList(tempNextList)

    setJustStarted(false);

    return
  }

  if(nextList.length === 1 && nextList[0].length === categoryData.filenames.length){
    if(gameOver === false)
      setGameOver(true)
    return null
  }

  
    // when we're done with the current list, go up a level
  if(currentListIndex >= Math.floor(currentList.length / 2)){

    // odd numbered stepchild
    let loneFinalSublist = null;
    if(currentList.length % 2 === 1)
      loneFinalSublist = currentList[currentListIndex*2];
    

    let tempNextList = nextList
    if(loneFinalSublist){
      loneFinalSublist.forEach(e =>
        tempNextList[currentListIndex].push(e))
    }
    
    setCurrentList(tempNextList);
    setSublistLength(sublistLength * 2);
    setCurrentListIndex(0);
    setLeftSublistIndex(0);
    setRightSublistIndex(0);

    let newNextList = new Array(Math.ceil(nextList.length / 2.0))
    for(let i=0; i < newNextList.length; i++)
      newNextList[i] = [];
    setNextList(newNextList)

    return
    

  }


  
  
  // mulitply by 2 cause we do 2 sublists at a time
  let leftSublist = currentList[currentListIndex*2];
  let rightSublist = currentList[currentListIndex*2 + 1];


  // if we're done with the current sublists move on to the next 2
  // like [a, b, c, >d] [e, f, g, >h] ok done move on
  // or even [a, b, c, >d] [e, f, >g, h] the answer is known
  // or some shit
  if (leftSublistIndex === leftSublist.length ){
    let i = rightSublistIndex;
    let rightSublist = currentList[currentListIndex*2 + 1];
    let temp = nextList;
    while (i < sublistLength){
      temp[currentListIndex].push(rightSublist[i]);
      i++;
    }

    setNextList(temp);
    setCurrentListIndex(currentListIndex + 1);
    setLeftSublistIndex(0)
    setRightSublistIndex(0)


    return
  }
  else if (rightSublistIndex === rightSublist.length ){
    let i = leftSublistIndex;
    let leftSublist = currentList[currentListIndex*2];
    let temp = nextList;
    while (i < sublistLength){
      temp[currentListIndex].push(leftSublist[i]);
      i++;
    }

    setNextList(temp);
    setCurrentListIndex(currentListIndex + 1);
    setLeftSublistIndex(0)
    setRightSublistIndex(0)

    return
  }

  
  
  let leftItem, rightItem = {id: -1, name: '', imageUrl: ''};

  console.log("\n")
  console.log(currentListIndex)
  console.log(currentList)
  console.log(nextList)
  
  leftItem = leftSublist[leftSublistIndex];
  rightItem = rightSublist[rightSublistIndex];
  

  

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
    let temp = nextList;

    if(choice === 'left'){
      temp[currentListIndex].push(leftItem);
      setLeftSublistIndex(leftSublistIndex + 1);
    }
    else if(choice === 'right'){
      temp[currentListIndex].push(rightItem);
      setRightSublistIndex(rightSublistIndex + 1);
    }
    else {
      // who care
    }

    setNextList(temp)

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