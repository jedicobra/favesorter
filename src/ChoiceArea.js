import React, { useState } from 'react';

function getRatingDelta(myRating, opponentRating, myGameResult) {
  if ([0, 0.5, 1].indexOf(myGameResult) === -1) {
    return null;
  }
  
  var myChanceToWin = 1 / ( 1 + Math.pow(10, (opponentRating - myRating) / 400));

  return Math.round(32 * (myGameResult - myChanceToWin));
}


function roundRobin(items){
    let DUMMY = -1

    let numItems = items.length

    const rounds = [];
    if (!items) {
      items = [];
      for (let k = 1; k <= numItems; k += 1) {
        items.push(k);
      }
    } else {
      items = items.slice();
    }
    
    if (numItems % 2 === 1) {
      items.push(DUMMY); // so we can match algorithm for even numbers
      numItems += 1;
    }
    for (let j = 0; j < numItems - 1; j += 1) {
      for (let i = 0; i < numItems / 2; i += 1) {
        const o = numItems - 1 - i;
        if (items[i] !== DUMMY && items[o] !== DUMMY) {
          // flip orders to ensure everyone gets roughly n/2 home matches
          const isHome = i === 0 && j % 2 === 1;
          // insert pair as a match - [ away, home ]
          rounds.push([isHome ? items[o].id : items[i].id, isHome ? items[i].id : items[o].id]);
        }
      }
      items.splice(1, 0, items.pop()); // permutate for next round
    }
    return rounds;
}





export default function ChoiceArea({itemList}){
    const listOfMatchups = roundRobin(itemList)
    const [currentRound, setCurrentRound] = useState(0);
    const [scores, setScores] = useState( Array(itemList.length).fill(1000.0) );
    const [matchHistory, setMatchHistory] = useState([]);

    
    function handleKeyPress(event) {
      if(event.key === "ArrowDown")
        undo();

      // you have to do this or else we get 1 million keydowns per millisecond
      if (event.repeat) { return }
  
      if(event.key === "ArrowLeft")
        makeChoice("left");
      else if(event.key === "ArrowRight")
        makeChoice("right");
      
    }
  
    function updateScores(left, right, increment){
      let incrementedScores = scores.slice();

      incrementedScores[left] += increment;
      incrementedScores[right] -= increment;
      setScores(incrementedScores);

      let newHistory = matchHistory.slice();
      newHistory.push({left, right, increment});
      setMatchHistory(newHistory);
    }

    function undo(){
      if(currentRound === 0)
        return

      setCurrentRound(currentRound-1);
    
      let newHistory = matchHistory.slice();
      let lastMatch = newHistory.pop();

      // reverse the last match
      updateScores(
        lastMatch.left, lastMatch.right, lastMatch.increment*-1);
      setMatchHistory(newHistory);
    }
  
    function makeChoice(chosenValue){
      if(gameOver)
        return
      let choices = listOfMatchups[currentRound];
      let left = choices[0]; let right = choices[1];
      let result = -1;

      if(chosenValue === 'left')
        result = 1;
      else if(chosenValue === 'right')
        result = 0;
      else
        result = 0.5;

      let increment = getRatingDelta(scores[left], scores[right], result)

      updateScores(left, right, increment);
      setCurrentRound(currentRound + 1);
    }

    

    let leftItem, rightItem = {id: -1, name: '', imageUrl: ''};
    let gameOver = currentRound === listOfMatchups.length;

    React.useEffect(function setupListener() {
      window.addEventListener("keydown", handleKeyPress)
  
      return function cleanupListener() {
        window.removeEventListener("keydown", handleKeyPress)
      }
    })

    if(gameOver){
      let itemsWithScores = []
      for(let i=0; i<itemList.length; i++){
        itemsWithScores.push(
          {score: scores[i], name: itemList[i].name, id: itemList[i].id, imageUrl: itemList[i].imageUrl})
      }
      itemsWithScores.sort((a, b) => a.score-b.score).reverse();

      const listItems = itemsWithScores.map(element => 
        <>
          <img className='thumbnail' width='100' height='50' src={element.imageUrl} />
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
    else{
      // update choices
      leftItem = itemList[ listOfMatchups[currentRound][0] ];
      rightItem = itemList[ listOfMatchups[currentRound][1] ];
    }


    return(
      <>
        <div className='ChoiceArea'>
          <div>
            <img width='200' height='200' onClick={() => makeChoice('left')} src={leftItem.imageUrl} />
            <p>{leftItem.name}</p>
          </div>
          
          <div className='or'>OR...</div>

          <div>
            <img width='200' height='200' onClick={() => makeChoice('right')} src={rightItem.imageUrl}/>
            <p>{rightItem.name}</p>
          </div>
        </div>
        <br></br>
        <button className='undo' onClick={() => undo()}>Undo</button>
      </>
    );
  }