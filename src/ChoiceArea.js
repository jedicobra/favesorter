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
    const [currentMatchup, setCurrentMatchup] = useState(1);
    const [likes, setLikes] = useState( Array(itemList.length).fill(0) );


    //each choice has an id a name and an image address 
    // [12, 'mario 2', 'https://nsa.gov/toad.png']
    const [leftChoice, setLeftChoice] = useState( itemList[ listOfMatchups[0][0] ] ); 
    const [rightChoice, setRightChoice] = useState( itemList[ listOfMatchups[0][1] ] );
    

    
    function handleKeyPress(event) {
      // you have to do this or else we get 1 million keydowns per millisecond
      if (event.repeat) { return }
  
      if(event.key === "ArrowLeft"){
        makeChoice("left");
      }
      else if(event.key === "ArrowRight"){
        makeChoice("right");
      }
    }
  
    React.useEffect(function setupListener() {
      window.addEventListener("keydown", handleKeyPress)
  
      return function cleanupListener() {
        window.removeEventListener("keydown", handleKeyPress)
      }
    })


  
    function updateLikes(likedItemIndex){
      let incrementedLikes = likes.slice();
      incrementedLikes[likedItemIndex]++;
      setLikes(incrementedLikes);
    }
  
    function makeChoice(chosenValue){
      if(currentMatchup + 1 === listOfMatchups.length){
        let winnerId = likes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
        alert("done, winner is " + itemList[winnerId].name)
        return
      }


      //update the chosen item's like score
      let chosenItem = chosenValue === 'left' ? leftChoice : rightChoice;
      updateLikes(chosenItem.id);
  
      

      setCurrentMatchup(currentMatchup + 1);
      
      // update choices
      setLeftChoice(itemList[ listOfMatchups[currentMatchup][0] ]);
      setRightChoice(itemList[ listOfMatchups[currentMatchup][1] ]);
    }
  
    return(
      <div className='ChoiceArea'>
        <img width='200' height='200' onClick={() => makeChoice('left')} src={leftChoice.imageUrl} />
        <div className='or'>OR...</div>
        <img width='200' height='200' onClick={() => makeChoice('right')} src={rightChoice.imageUrl}/>
      </div>
    );
  }