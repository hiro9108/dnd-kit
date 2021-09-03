import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

export default function App() {
  const containers = ["A", "B", "C", "D", "E"];

  const [parent, setParent] = useState(null);

  // Test: To be able to sort
  const [containersState, setContainersState] = useState(containers);

  // const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* {parent === null ? draggableMarkup : null} */}

      {containersState.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          <Draggable id={id}>Drag me {id}</Draggable>
          {/* {parent === id ? draggableMarkup : "Drop here"} */}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over, active } = event;
    console.log("active", active);
    console.log("over", over);
    console.log("event", event);

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);

    // Consider the better algorithm.
    const activeIndex = containersState.indexOf(active.id);
    const overIndex = containersState.indexOf(over.id);

    const newContainerArray = containersState.map((el) => {
      if (el === containersState[activeIndex]) {
        return containersState[overIndex];
      }
      if (el === containersState[overIndex]) {
        return containersState[activeIndex];
      }
      return el;
    });

    setContainersState(newContainerArray);
    //
  }
}
