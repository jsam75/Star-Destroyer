import { useState, useRef, useEffect } from 'react';

import Star from './Star';

const STAR_SIZE = 20;

export default function Space() {

// Section 1: Hooks (state, ref, effect - may not use all every time)
const [stars, setStars] = useState([
    {id: 1, 
    position: {x: 100, y: 120}}
]);

const nextId = useRef(2);

useEffect (() => {
    const intervalId = setInterval(() => {
        setStars(prev => [...prev, createStar()]);
    }, 2500);
    return () => clearInterval(intervalId);
}, []);


// Section 2: Event Handlers - (user or system-triggered)
    
   function destroyStar(id) {
        setStars (prev => prev.filter(star => star.id !== id));
    }

//Section 3: Helper Functions - (create or transform data)

function createStar() {
        const id = nextId.current;
        nextId.current += 1;
          return (  {
            id : id, 
            position: {x: Math.random() * (window.innerWidth - STAR_SIZE), 
                        y: Math.random() * (window.innerHeight - STAR_SIZE)} 
          }            
       );
    }

//Section 4: Derived Values (if any)

//Section 5: Renders (JSX)
  
     return (
        <div className="space">
            {stars.map(star => (
                <Star
                    key={star.id}
                    id={star.id}
                    position={star.position}
                    destroyStar={destroyStar}
                />
            ))}
        </div>
    );
}

/* Notes:
1. The React parent component flow is universal. (Written inside of default export function)
   I. Hooks (state, ref, effect - in this order by convention)
   II. Event Handlers/Helper Functions, III. Derived Values, IV. Renders (JSX)
2. Determining data types:
   a. single value -> primitive (string, number, boolean)
   b. multiple related values -> array, object
   c. many objects -> array of objects
   In React, UI elements almost always grow beyond a single value, which is why arrays of objects
   show up everywhere. (object -> needed behavior + data travel together)
3. Intervals and effects come after data structures are ready.
   You don’t schedule behavior until you know what you’re creating.
4. useState initialization in this scenario. Since we are dealing with an array of objects, 
   for an item (star) that gets rendered, we have to give it a unique id that exists. If
   we were to use 0, 0 is technically non-existent, and we cannot use null for rendered
   item; null means not assigned.
5. useState vs useRef in this case: useState -> what exists now; useRef -> what number to use next.
   Mental model: stars = the visible list, nextId = the ticket dispenser. They are not duplicates.
   State tracks what exists; refs track things that should persist but not cause re-renders.
   ID's fall into the latter category.
6. State owns what exists, refs track what persists, effects control when things happen.
7. Every interval effect has 3 parts: 1. start the interval, 2. do the work, 3. clean it up.
   In useEffect, must put setInterval in a variable to be able to clean up.
 */

