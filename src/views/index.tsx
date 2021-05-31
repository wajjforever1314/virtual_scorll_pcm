import React from "react";
require("./index.less");

const list: any = new Array(200).fill(0).map((_, idx) => {
  return {
    name: `张${idx + 1}`,
    age: idx + 20,
    sex: idx % 2 === 0 ? "男" : "女",
  };
});
export default function VScroll({ size = 20, all_list = list }) {
  const [defaultList, setDefaultList] = React.useState<any[]>([]);
  React.useEffect(() => {
    setDefaultList(all_list.slice(0, size));
  }, [all_list, size]);
  return (
    <div className="box">
      <div className="box-scrollView">
        {!!defaultList[0] && (
          <div className="box-scrollView-child">
            <div>{defaultList[0].name}</div>
            <div>{defaultList[0].age}</div>
            <div>{defaultList[0].sex}</div>
          </div>
        )}
      </div>
    </div>
  );
}
