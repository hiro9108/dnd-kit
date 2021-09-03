import React from "react";
import "./Draggable.css";
import { useDraggable } from "@dnd-kit/core";

const Draggable = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const draggableStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className="drag"
      ref={setNodeRef}
      style={draggableStyle}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
};

export default Draggable;
