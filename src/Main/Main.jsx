import { useState, useCallback } from "react"
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from "@dnd-kit/sortable"


import image1 from '../../public/images/image-1.webp';
import image2 from '../../public/images/image-2.webp';
import image3 from '../../public/images/image-3.webp';
import image4 from '../../public/images/image-4.webp';
import image5 from '../../public/images/image-5.webp';
import image6 from '../../public/images/image-6.webp';
import image7 from '../../public/images/image-7.webp';
import image8 from '../../public/images/image-8.webp';
import image9 from '../../public/images/image-9.webp';
import image10 from '../../public/images/image-10.jpeg';
import image11 from '../../public/images/image-11.jpeg';
import SortableItem from "./SortableItem"
import Item from "../Components/Item/Item"

const App = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];
  const [deletedImg, setDeletedImg] = useState([]);
  const [items, setItems] = useState(images)
  const [activeId, setActiveId] = useState(null)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))
console.log(items);
  const handleDragStart = useCallback(event => {
    setActiveId(event.active.id)
  }, [])
  const handleDragEnd = useCallback(event => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems(items => {
        const oldIndex = items.indexOf(active?.id)
        const newIndex = items.indexOf(over?.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }, [])
  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])
  console.log(deletedImg);
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-5 gap-8 w-max mx-auto my-10"> 
          {items.map((id, index)=> (
            <SortableItem key={index} deletedImg={deletedImg} setDeletedImg={setDeletedImg} index={index} id={id} />
          ))}
        </div>
          
        
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
        {activeId ? <Item id={activeId} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default App
