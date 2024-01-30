import React, { useState } from "react";

const GridComponent = () => {
  const items = [...Array(100)].map((_, i) => { return { name: `Item ${i}` } })
  const itemCount = items.length
  const itemSize = 200

  const [indices, setIndex] = useState({ startIndex: 0, stopIndex: 12 })

  const getStartIndexForOffset = (
    { itemCount, itemSize },
    offset
  ) =>{
    //何個要素を通り過ぎたのか
    return Math.max(
      0,
      Math.min(itemCount - 1, Math.floor(offset / itemSize))
    )
  }
  
  const getStopIndexForStartIndex = (
    { itemCount, itemSize, width },
    startIndex,
    scrollOffset,
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

  const handleScroll = (event) => {
    const width = event.target.clientWidth
    const startIndex = getStartIndexForOffset({ itemCount: items.length, itemSize: itemSize }, event.target.scrollLeft)
    const stopIndex = getStopIndexForStartIndex({ itemCount: items.length, itemSize: itemSize, width: width }, startIndex, event.target.scrollLeft)
    setIndex({ startIndex: startIndex, stopIndex: stopIndex + 2 })
  };

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
          {items.slice(indices.startIndex, indices.stopIndex).map((item, index) => (
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
          {items.slice(indices.startIndex, indices.stopIndex).map((item, index) => (
            <div
              key={index}
              style={{
                gridColumn: `${indices.startIndex + index + 2} / ${indices.startIndex + index + 3}`,
                backgroundColor: "#fbfbfb",
              }}
            >Hedear Bottom{item.name}</div>
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
          {items.slice(indices.startIndex, indices.stopIndex).map((item, index) => (
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
          {items.slice(indices.startIndex, indices.stopIndex).map((item, index) => (
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
            {items.slice(indices.startIndex, indices.stopIndex).map((item, index) => (
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