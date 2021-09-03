// import "./App.css";
// import { useState } from "react";
// import { DndContext, useDroppable } from "@dnd-kit/core";
// import Droppable from "./components/Droppable";
// import Draggable from "./components/Draggable";

// function App() {
//   const [tap, setTap] = useState(false);
//   const { isOver, setNodeRef } = useDroppable({
//     id: "droppable",
//   });
//   const isOverStyle = {
//     color: isOver ? "red" : undefined,
//   };

//   const onCheckHandle = ({ over }) => {
//     if (!over) return;
//     setTap(true);
//   };

//   // const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

//   return (
//     <DndContext onDragEnd={onCheckHandle}>
//       <div className="container">
//         {!tap ? <Draggable id="draggable">Drag me</Draggable> : null}

//         <Droppable>
//           <div className="drop" ref={setNodeRef} style={isOverStyle}>
//             {tap ? <Draggable id="draggable">Drag me</Draggable> : "Drop Area"}
//           </div>
//         </Droppable>
//       </div>
//     </DndContext>
//   );
// }

// export default App;

import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

export default function App() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {parent === id ? draggableMarkup : "Drop here"}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
}
