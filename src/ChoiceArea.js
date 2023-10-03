import React, { useState } from 'react';

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

export default function ChoiceArea({onChoiceClick, itemList}){
    const listOfMatchups = roundRobin(itemList)
    const [currentRound, setCurrentRound] = useState(0);
    const [likes, setLikes] = useState( Array(itemList.length).fill(0) );
    
    function handleKeyPress(event) {
      // you have to do this or else we get 1 million keydowns per millisecond
      if (event.repeat) { return }
  
      if(event.key === "ArrowLeft")
        makeChoice("left");
      else if(event.key === "ArrowRight")
        makeChoice("right");
    }
  
    function updateLikes(likedItemIndex){
      let incrementedLikes = likes.slice();
      incrementedLikes[likedItemIndex]++;
      setLikes(incrementedLikes);
    }
  
    function makeChoice(chosenValue){
      if(gameOver)
        return
      let chosenItemId = listOfMatchups[currentRound][chosenValue === 'left' ? 0 : 1];
      updateLikes(chosenItemId);
      setCurrentRound(currentRound + 1);
    }

    let leftImageUrl, rightImageUrl = '';
    let gameOver = currentRound === listOfMatchups.length;

    React.useEffect(function setupListener() {
      window.addEventListener("keydown", handleKeyPress)
  
      return function cleanupListener() {
        window.removeEventListener("keydown", handleKeyPress)
      }
    })

    if(gameOver){
      // find winner
      let winnerId = likes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
      console.log("done, winner is " + itemList[winnerId].name)
    }
    else{
      // update choices
      leftImageUrl = itemList[ listOfMatchups[currentRound][0] ].imageUrl;
      rightImageUrl = itemList[ listOfMatchups[currentRound][1] ].imageUrl;
    }


    return(
      <div className='ChoiceArea'>
        <img width='200' height='200' onClick={() => makeChoice('left')} src={leftImageUrl} />
        <div className='or'>OR...</div>
        <img width='200' height='200' onClick={() => makeChoice('right')} src={rightImageUrl}/>
      </div>
    );
  }