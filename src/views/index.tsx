import React from "react";
require("./index.scss");

const list: any = new Array(2000).fill(0).map((_, idx) => {
  return {
    id: idx + 1,
    name: `张${idx + 1}`,
    age: idx + 20,
    sex: idx % 2 === 0 ? "男" : "女",
  };
});
export default function VScroll({ size = 20, allList = list }) {
  const [defaultList, setDefaultList] = React.useState<any[]>([]);
  const scrollBox = React.useCallback(
    (childHeight: number, groupSize: number, arrDefault: any[]) => {
      const box: React.ReactDOM | any = document.querySelector(".box");
      if (box) {
        // 记录上一次最近的滚动区间，用于减少重绘次数
        const indexReducer = [0, 0];
        box.onscroll = function () {
          const scrollTop = box.scrollTop;
          // 滚到了第几个区间
          const indexPiece = Math.floor(scrollTop / groupSize);
          // 滚到该区间的哪一个item
          const indexItem = Math.floor((scrollTop % groupSize) / childHeight);
          // console.log("滚动位移", scrollTop, childHeight);
          // console.log(`第 ${indexPiece} 个区间,第 ${indexItem} 个item`);
          // 拆分两组视图。下去的和即将下去的
          if (indexPiece !== indexReducer[0] || indexItem !== indexReducer[1]) {
            // 此时发现了区间或者某项item滚过去了，需要记录下新的区间，
            // 方便下次比较，判断是否需要重绘局部virtual dom
            indexReducer[0] = indexPiece;
            indexReducer[1] = indexItem;
            const arr = new Array(size).fill(0).map((item, idx) => idx);
            var down = arr.slice(0, indexItem);
            var will_down = arr.slice(indexItem);
            // console.log("down", down, "will_down", will_down);
            const dl = [...arrDefault];
            down.forEach((item, idx) => {
              const itemDom: React.ReactDOM | any = document.querySelector(
                `.item${item}`
              );
              // console.log("itemDomdown", itemDom);
              const number = (indexPiece + 1) * size + item;
              if (itemDom && number < allList.length) {
                itemDom.style.transform = `translateY(${
                  groupSize * (indexPiece + 1)
                }px)`;
                // 定位，确定移动的是整体的第几个数据
                // console.log("number", number);
                // console.log("item", item);
                // console.log("arrDefault", arrDefault);
                dl[Number(item)] = allList[number];
                // console.log("dldown", dl, allList, number);
              }
            });
            will_down.forEach((item, idx) => {
              const itemDom: React.ReactDOM | any = document.querySelector(
                `.item${item}`
              );
              // console.log("itemDomwill_down", itemDom);
              const number = indexPiece * size + item;
              if (itemDom && number < allList.length) {
                itemDom.style.transform = `translateY(${
                  groupSize * indexPiece
                }px)`;
                // 定位，确定移动的是整体的第几个数据
                // console.log('number',number)
                // console.log('item',item)
                // console.log('vm.default_list',vm.default_list)
                dl[Number(item)] = allList[number];
                // console.log("dlwilldown", dl, allList, number);
              }
            });
            setDefaultList(dl);
          }
        };
      }
    },
    [allList, size]
  );
  const getChildSize = React.useCallback(
    (arr: any[], arrDefault: any[]) => {
      // 获取单个高度
      const firstChild: React.ReactDOM | any =
        document.querySelector(".firstChild");
      console.log("firstChild--->", firstChild);
      if (firstChild) {
        firstChild.style.display = "block";
        const childHeight = firstChild.offsetHeight;
        console.log("childHeight--->", childHeight);
        firstChild.style.display = "none";
        // 获取所有item的高度
        const all_height = childHeight * arr.length;
        console.log("all_height--->", all_height);
        // 所有高度赋值给滚动的scrollBox
        const boxScrollView: React.ReactDOM | any =
          document.querySelector(".box-scrollView");
        boxScrollView.style.height = `${all_height}px`;
        // // 每个size的一組移动的距离绝对值
        console.log("size对应的每一组高度--->", size * childHeight);
        // // 调用box滚动方法
        scrollBox(childHeight, size * childHeight, arrDefault);
      }
    },
    [scrollBox, size]
  );
  React.useEffect(() => {
    setDefaultList(allList.slice(0, size));
    if (size > 0) {
      console.log("defaultList--->", allList.slice(0, size));
      // 延时器为了能最后获取最新的virtual dom
      setTimeout(() => {
        getChildSize(allList, allList.slice(0, size));
      });
    }
  }, [allList, getChildSize, size]);
  return (
    <div className="box">
      <div className="box-scrollView">
        {!!defaultList[0] && (
          <div className="box-scrollView-child firstChild">
            <div>{defaultList[0].name}</div>
            <div>{defaultList[0].age}</div>
            <div>{defaultList[0].sex}</div>
          </div>
        )}
        {defaultList.length > 0 &&
          defaultList.map((item: any, index: number) => (
            <div key={item.id} className={`box-scrollView-child item${index}`}>
              <div>{item.name}</div>
              <div>{item.age}</div>
              <div>{item.sex}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
