import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import image1 from "../../public/images/image-1.webp";
import image2 from "../../public/images/image-2.webp";
import image3 from "../../public/images/image-3.webp";
import image4 from "../../public/images/image-4.webp";
import image5 from "../../public/images/image-5.webp";
import image6 from "../../public/images/image-6.webp";
import image7 from "../../public/images/image-7.webp";
import image8 from "../../public/images/image-8.webp";
import image9 from "../../public/images/image-9.webp";
import image10 from "../../public/images/image-10.jpeg";
import image11 from "../../public/images/image-11.jpeg";
import addImage from "../../public/images/add-photo.png";
import SortableItem from "./SortableItem";
import Item from "../Components/Item/Item";
import { Button, Card, Checkbox } from "@nextui-org/react";

const App = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
  ];
  const [deletedImg, setDeletedImg] = useState([]);
  const [items, setItems] = useState(images);
  const [activeId, setActiveId] = useState(null);
  const handleDeleteImg = () => {
    const filteredArray1 = items.filter((item) => !deletedImg.includes(item));
    setDeletedImg([]);
    setItems(filteredArray1);
  };
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);
  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active?.id);
        const newIndex = items.indexOf(over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }, []);
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);
  return (
    <div className="max-w-6xl mx-auto bg-[#fafafa]">
      <Card className="p-4 md:p-8 mx-4 md:mx-0 my-8">
        <div className="flex justify-between mb-3">
          {deletedImg.length === 0 ? (
            <h3 className="text-2xl uppercase font-semibold">
              Gallery Master Pro
            </h3>
          ) : (
            <div className="flex justify-center items-center gap-1">
              <Checkbox isSelected={true}></Checkbox>{" "}
              <p className="text-lg md:text-xl uppercase font-semibold">
                Image Selected: {deletedImg.length}
              </p>
            </div>
          )}
          <Button
            onClick={handleDeleteImg}
            className="float-right"
            color="danger"
            variant="ghost"
          >
            Delete
          </Button>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items?.length !== 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-max mx-auto">
                {items.map((id, index) => (
                  <SortableItem
                    key={index}
                    deletedImg={deletedImg}
                    setDeletedImg={setDeletedImg}
                    index={index}
                    id={id}
                  />
                ))}
                <div className="w-[144px] flex flex-col gap-2 rounded-[10px] cursor-pointer border-2 border-dashed border-slate-300 justify-center items-center h-[144px] bg-slate-100">
                  <img className="w-8 h-8" src={addImage} alt="" />
                  <h4>Add Images</h4>
                </div>
              </div>
            ) : (
              <div>
                {" "}
                <h2 className="text-5xl font-bold uppercase my-40 text-center">
                  Reload the page
                </h2>
              </div>
            )}
          </SortableContext>
          <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
            {activeId ? <Item id={activeId} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </Card>
    </div>
  );
};

export default App;
