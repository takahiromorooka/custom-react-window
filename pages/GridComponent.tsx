import React, { useState, memo, useMemo } from "react";

function arePropsEqual(oldProps: { style: { gridColumn: string } }, newProps: { style: { gridColumn: string } }) {
  return oldProps.style['gridColumn'] === newProps.style['gridColumn']
}

const HeaderRowComponent = memo(function HeaderRowComponent({ index, style, item }: { index: number, style: { gridColumn: string }, item: { name: string } }) {
  console.log(item)
  return (
    <div
      className={"item-cell"}
      style={style}
    >
      <div>
        Hedear top {item.name}
      </div>
    </div>
  )
}, arePropsEqual)

const GridComponent = () => {
  const items = [...Array(100)].map((_, i) => { return { name: `Item ${i}` } })
  const itemCount = items.length
  const itemSize = 200

  const [indices, setIndex] = useState({ startIndex: 0, stopIndex: 6 })

  const getStartIndexForOffset = (
    { itemCount, itemSize }: { itemCount: number, itemSize: number },
    offset: number
  ) =>{
    //何個要素を通り過ぎたのか
    return Math.max(
      0,
      Math.min(itemCount - 1, Math.floor(offset / itemSize))
    )
  }
  
  const getStopIndexForStartIndex = (
    { itemCount, itemSize, width }: { itemCount: number, itemSize: number, width: number },
    startIndex: number,
    scrollOffset: number,
  ) => {
    //通り過ぎた要素の数×要素のサイズ
    const offset = startIndex * itemSize;
    //横幅
    const size = width;
    //表示可能のアイテム
    const numVisibleItems = Math.ceil(
      (size + scrollOffset - offset) / itemSize
    );
    return Math.max(
      0,
      Math.min(
        itemCount - 1,
        startIndex + numVisibleItems - 1 // -1 is because stop index is inclusive
      )
    );
  }

  const handleScroll = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    const width = target.clientWidth
    const startIndex = getStartIndexForOffset({ itemCount: items.length, itemSize: itemSize }, target.scrollLeft)
    const stopIndex = getStopIndexForStartIndex({ itemCount: items.length, itemSize: itemSize, width: width }, startIndex, target.scrollLeft)
    setIndex({ startIndex: startIndex, stopIndex: stopIndex })
  };

  const virtualItems = useMemo(() => {
    const ary = [];
    if (itemCount > 0) {
      for (let index = indices.startIndex; index <= indices.stopIndex; index++) {
        ary.push(
          { ...items[index], style: { gridColumn: `${index + 2} / ${index + 3}` } }
        );
      }
    }
    return ary
  }, [indices])


  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "scroll",
      }}
      onScroll={handleScroll}
    >
      <div className="header">
        <div
          style={{
            display: 'grid',
            pointerEvents: undefined,
            width: itemCount * itemSize,
            gridTemplateColumns: `repeat(${itemCount}, 1fr)`,
          }}
        >
          <div
            style={{
              position: "sticky",
              left: 0,
              height: "80px",
              background: "white",
            }}
          >
            
          </div>
          {virtualItems.map((item, index) => (
            <HeaderRowComponent
              key={item.style['gridColumn']}
              index={index}
              style={item.style}
              item={item}
            />
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            pointerEvents: undefined,
            width: itemCount * itemSize,
            gridTemplateColumns: `repeat(${itemCount}, 1fr)`,
          }}
        >
          <div
            style={{
              position: "sticky",
              left: 0,
              height: "50px",
              background: "white",
            }}
          >
            
          </div>
          {virtualItems.map((item, index) => (
            <div
              key={index}
              style={{
                gridColumn: `${indices.startIndex + index + 2} / ${indices.startIndex + index + 3}`,
                backgroundColor: "#fbfbfb",
              }}
            >
              <div>
                Hedear top {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="body">
        <div
          style={{
            display: 'grid',
            pointerEvents: undefined,
            width: itemCount * itemSize,
            gridTemplateColumns: `repeat(${itemCount}, 1fr)`,
          }}
        >
          <div
            style={{
              position: "sticky",
              left: 0,
              height: "100px",
              background: "white",
            }}
          >
            Item
          </div>
          {virtualItems.map((item, index) => (
            <div
              key={index}
              style={{
                gridColumn: `${indices.startIndex + index + 2} / ${indices.startIndex + index + 3}`,
                backgroundColor: "#efefef",
                border: "1px solid #ddd",
              }}
            >{item.name}</div>
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            pointerEvents: undefined,
            width: itemCount * itemSize,
            gridTemplateColumns: `repeat(${itemCount}, 1fr)`,
          }}
        >
          <div
            style={{
              position: "sticky",
              left: 0,
              height: "100px",
              background: "white",
            }}
          >
            Item
          </div>
          {virtualItems.map((item, index) => (
            <div
              key={index}
              style={{
                gridColumn: `${indices.startIndex + index + 2} / ${indices.startIndex + index + 3}`,
                backgroundColor: "#efefef",
                border: "1px solid #ddd",
              }}
            >{item.name}</div>
          ))}
        </div>
        <div>
          <div
            style={{
              display: 'grid',
              pointerEvents: undefined,
              width: itemCount * itemSize,
              gridTemplateColumns: `repeat(${itemCount}, 1fr)`,
            }}
          >
            <div
              style={{
                position: "sticky",
                left: 0,
                height: "100px",
                background: "white",
              }}
            >
              Item
            </div>
            {virtualItems.map((item, index) => (
              <div
                key={index}
                style={{
                  gridColumn: `${indices.startIndex + index + 2} / ${indices.startIndex + index + 3}`,
                  backgroundColor: "#efefef",
                  border: "1px solid #ddd",
                }}
              >{item.name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

};

export default GridComponent;