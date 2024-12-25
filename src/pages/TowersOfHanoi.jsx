import React, { useEffect, useState } from "react";

const TowersOfHanoi = () => {
  const [moveCount, setMoveCount] = useState(0);
  const [dragId, setDragId] = useState();
  const [tiles, setTiles] = useState([
    { id: "Tile-1", column: 1, row: 1, width: 2 },
    { id: "Tile-2", column: 1, row: 2, width: 4 },
    { id: "Tile-3", column: 1, row: 3, width: 6 },
    { id: "Tile-4", column: 1, row: 4, width: 8 },
    { id: "Tile-5", column: 1, row: 5, width: 10 },
    { id: "Tile-6", column: 1, row: 6, width: 12 },
  ]);

  useEffect(() => {
    document.title = "Towers of Hanoi (WIP)";
  }, []);

  const handleDrag = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === ev.currentTarget.id);
    const topTile = tiles
      .filter((tile) => tile.column === dragTile.column)
      .sort((a, b) => a.width - b.width)[0];

    if (topTile && ev.currentTarget.id === topTile.id) {
      setDragId(ev.currentTarget.id);
    } else {
      ev.preventDefault();
    }
  };

  const handleDrop = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === dragId);
    const dropColumn = ev.currentTarget.id;

    const dropColumnTopTile = tiles
      .filter((tile) => tile.column.toString() === dropColumn.toString())
      .sort((a, b) => a.width - b.width)[0];

    let newTileState = tiles;

    if (!dropColumnTopTile || dragTile.width < dropColumnTopTile.width) {
      newTileState = tiles.map((tile) => {
        if (tile.id === dragTile.id) {
          tile.column = parseInt(dropColumn, 10);
          setMoveCount(moveCount + 1);
        }

        return tile;
      });
    }

    setTiles(newTileState);
  };

  const column1Tiles = tiles.filter((tile) => tile.column === 1);
  const column2Tiles = tiles.filter((tile) => tile.column === 2);
  const column3Tiles = tiles.filter((tile) => tile.column === 3);

  const winCondition = tiles.every((tile) => tile.column === 3);
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <div>
          This page is currently under construction. Please come back later.
        </div>
        <div>
          bruh moment
        </div>
      </div>
      <div className="flex justify-around w-full">
        {[1, 2, 3].map((column) => (
          <div
            key={`column-${column}`}
            id={column}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
            className="flex flex-col items-center relative w-1/3 border border-gray-400 h-[80vh]"
          >
            {/* Center Pole */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-brown-700 w-2 h-full z-[-1]" />
            {tiles
              .filter((tile) => tile.column === column)
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileStyles = {
                  width: `${tile.width}em`,
                  marginTop: index === 0 ? `calc(80vh - ${tiles.length * 40}px)` : "0",
                };
                return (
                  <div
                    id={tile.id}
                    key={`tile-${tile.id}`}
                    draggable
                    onDragStart={handleDrag}
                    style={tileStyles}
                    className="h-10 bg-yellow-600 border border-black rounded-sm z-10"
                  />
                );
              })}
          </div>
        ))}
      </div>
      {winCondition && (
        <div className="absolute bg-green-700 text-yellow-300 text-4xl font-bold text-center p-4 rounded-lg">
          You Win!
          <div className="text-2xl font-medium mt-2">
            You did it in <span className="text-blue-300">{moveCount}</span> moves
          </div>
        </div>
      )}
      <div className="mt-4 text-lg">Move count: {moveCount}</div>
    </div>
  );
};

export default TowersOfHanoi;
