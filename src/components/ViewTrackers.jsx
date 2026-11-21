import React from "react";

function ViewTrackers(props) {
  console.log("props", props);

  return (
    <div>
      {props?.tableData?.history?.map((history, index) => {
        return <div key={index}>{history}</div>;
      })}
    </div>
  );
}

export default ViewTrackers;
