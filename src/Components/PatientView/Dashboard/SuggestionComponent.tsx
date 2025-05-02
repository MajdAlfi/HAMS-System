import React, { JSX } from "react";
import { FaCalendarAlt } from "react-icons/fa";
type SuggesionComponentProps = {
  items: Array<() => JSX.Element>; // Array of components (functions!)
  renderItem: (
    ItemComponent: () => JSX.Element,
    index: number
  ) => React.ReactNode;
  separator?: React.ReactNode;
};
const SuggesionComponent = ({
  items,
  renderItem,
  separator,
}: SuggesionComponentProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "20vh",
        width: "10vw",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "5vh",
        }}
      >
        {items.map((ItemComponent, index) => (
          <React.Fragment key={index}>
            {renderItem(ItemComponent, index)}
            {index < items.length - 1 && separator}
          </React.Fragment>
        ))}
      </div>
      <FaCalendarAlt style={{ marginRight: "6px" }} />
    </div>
  );
};

export default SuggesionComponent;
