/* eslint-disable no-constant-condition */
import { Checkbox } from "@nextui-org/react";
import { forwardRef, useState } from "react";
import './item.css'
// eslint-disable-next-line react/display-name
const Item = forwardRef(
  ({ id, index, deletedImg, setDeletedImg, withOpacity, isDragging, style, ...props }, ref) => {
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(false);
    const handleDeletedImages = () => {
      setSelected(!selected);
      if(selected){
        setDeletedImg(deletedImg.filter(img => img !== id))
      }
      else{
        setDeletedImg([...deletedImg, id])
      }
    }
    const inlineStyles = {
      opacity: withOpacity ? "0.5" : "1",
      transformOrigin: "0% 0%",
      height: `${index == 0 ? "340px" : "140px"}`,
      width: `${index == 0 ? "340px" : "140px"}`,
      borderRadius: "10px",
      gridColumn: `${index == 0 ? "1 / span 2" : ""}`,
      gridRow: `${index == 0 ? "1 / span 2" : ""}`,
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: isDragging
        ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
        : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };
    console.log(id);
    return (
      <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false) } className="relative" style={inlineStyles} {...props}>
        <img src={id} alt="" />
        <Checkbox className={`absolute top-2 left-2 ${selected ? "selectedImg" : ""} ${hovered ? "" : "hidden"}`} onValueChange={handleDeletedImages} ></Checkbox>
      </div>
    );
  }
);

export default Item;
