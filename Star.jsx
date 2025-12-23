import { useRef, useEffect } from "react";

export default function Star ({ id, position, destroyStar }) {
      
    const starRef = useRef(null);

        useEffect(() => {
        starRef.current?.focus();}, 
        [] );


  

    return (
       <div className="star" tabIndex="0" style={{ left: position.x, top: position.y}}
       ref={starRef} onClick={() => destroyStar(id)}>
        ⭐
       </div>
    );
}

/*Notes:
1. "Pass the plan, not the action". Parent passes the plan (function), child triggers
    it later, on user action. No parens in JSX events:
    onClick={doThing()} XXX wrong!
    onClick={() => doThing()} Yes, correct!
    Events get functions, not results.
2. Event Handlers checklist:
   a. Name it correctly (camelCase)
   b. Pass a function, not a function call (open parens)
   c. If you need arguments, wrap it in an arrow function. (see above)
   d. Child triggers, parent owns state changes. (child does not mutate parent state directly)
   e. Don't put side effects in render. (useEffect for side effects, not in JSX)
   f. For DOM actions, useRef
   g. Quick "smell" test: if you see () in JSX, it's probably wrong. If your handler
      does nothing, check camelCase + correct prop names.
*/