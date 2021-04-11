import "./styles.css";
import { data } from "./data";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function getColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (25 + 70 * Math.random()) +
    "%," +
    (85 + 10 * Math.random()) +
    "%)"
  );
}

const cardsWithZIndex = data.map((d, index) => ({
  ...d,
  zIndex: data.length - index,
  position: null,
  id: index,
  highlight: false,
  color: getColor()
}));

const wyberVorm = [1, 3, 4, 3, 1];

export default function App() {
  const [sorting, setSorting] = useState(true);
  const [cards, setCards] = useState(cardsWithZIndex);
  const constraintsRef = useRef(null);

  function moveToTop(currentindex: number) {
    setCards(
      cards.map((c, index) => {
        return currentindex === index
          ? { ...c, zIndex: 100, highlight: true }
          : { ...c, zIndex: 0, highlight: false };
      })
    );
  }

  // const loadStellingen = async () => {
  //   const googleUrl =
  //     'https://docs.google.com/spreadsheets/d/1UGHgBfLm6D-TCKu3kEZ2Ujl07_XPS7LKhqjSgfYEsCw/export?format=csv&id=1UGHgBfLm6D-TCKu3kEZ2Ujl07_XPS7LKhqjSgfYEsCw&gid=0';
  //   const csvData = await onlineCsvToJson(googleDirect);
  //   initScript(csvData);
  //   return await import('./config');
  // };

  useEffect(() => {
    moveToTop(0);
  }, []); // empty array, ensure this useEffect only runs once.

  return (
    <div
      ref={constraintsRef}
      className="App relative w-screen h-screen bg-white"
    >
      <div
        onClick={() => setSorting(!sorting)}
        className="py-2 px-4 bg-blue-500 w-32 cursor-pointer text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Sorteren
      </div>
      {!sorting && (
        <>
          <div className="flex w-full justify-around">
            <div className="w-48 text-left">
              {/* Ik voel niet zo mee met wat de Ander voelt */}
              Niet zo meevoelen met de ander
            </div>
            <div className="w-48 text-left ">
              {/* Ik voel erg mee met wat de Ander voelt */}
              Erg meevoelen met de ander
            </div>
          </div>

          <div className="pointer-events-none mt-4 w-full flex justify-center absolute inset-x-0 top-0">
            {wyberVorm.map((w, index) => (
              <div key={index} className="flex flex-col justify-center">
                {Array.from(Array(w).keys()).map((w, index) => (
                  <div key={index} className="card card-drop m-1"></div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
      {/* 
{ JSON.stringify(cards) } 
*/}
      {sorting && (
        <div className="flex justify-center absolute inset-x-0 bottom-16">
          {cards.find((c) => c.highlight) &&
            cards
              .find((c) => c.highlight)
              .Positions.map((pos, index) => (
                <div key={index} className="answer flex flex-col m-2">
                  <div className="card card-drop mb-2"></div>
                  <div
                    className="text-left p-2 text-sm"
                    style={{
                      width: "200px",
                      height: "80px",
                      backgroundColor: cards.find((c) => c.highlight).color
                    }}
                  >
                    {pos}
                  </div>
                </div>
              ))}
        </div>
      )}

      {cards.map((d, index) => (
        <motion.div
          key={index}
          drag={true}
          dragMomentum={true}
          dragElastic={0.9}
          dragConstraints={constraintsRef}
          onDrag={(event, info) => {
            const element = document
              .elementsFromPoint(info.point.x, info.point.y)
              .find((el) => el.classList.contains("answer"));
            // console.log(element);
            // element?.classList.add("bg-blue-500");
          }}
          onTap={(event, info) => {
            moveToTop(index);
          }}
          onDragStart={(event, info) => {
            moveToTop(index);
            // console.log(info.point.x, info.point.y)
          }}
          onDragEnd={(event, info) => {
            // console.log(info.point.x, info.point.y);
          }}
          style={{ zIndex: d.zIndex, backgroundColor: d.color }}
          className={`${
            d.highlight || !sorting
              ? `text-gray-900 text-opacity-70`
              : `text-gray-800 text-opacity-20`
          }
              ${
                d.highlight && sorting ? `shadow-2xl ` : `shadow-sm`
              } absolute text-sm card card-drag`}
        >
          {cards[index].Stelling}
        </motion.div>
      ))}
    </div>
  );
}
