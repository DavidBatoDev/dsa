import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MinecraftBtn from "../components/MinecraftBtn";
import CartIcon from '/images/cart-icon.png';
import Cart from '/images/cart.png';
import AnimatedClouds from "../components/AnimatedCloud";

const Queue = () => {
  const [garage, setGarage] = useState([]);
  const [plateNumber, setPlateNumber] = useState("");
  const [arrivals, setArrivals] = useState(0);
  const [departures, setDepartures] = useState(0);
  const [message, setMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [highlightedCar, setHighlightedCar] = useState(null);

  useEffect(() => {
    document.title = "Queue";
  }, []);

  useEffect(() => {
    const foundCar = garage.find(car => plateNumber === car);
    setHighlightedCar(foundCar || null);
  }, [plateNumber, garage]);
  

  useEffect(() => {
    const audio = new Audio('/audio/queue.mp3');
    audio.volume = 0.1
    audio.loop = true; 
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);


  console.log(garage);
  console.log(highlightedCar);

  // Helper to show a quick error/warning message
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  // Helper to show a quick arrival/departure message
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  // Enqueue / Arrival
  const handleArrival = () => {
    if (!plateNumber.trim()) {
      showNotification("Plate number cannot be empty!");
      return;
    }
    if (garage.includes(plateNumber)) {
      showNotification("Plate number must be unique!");
      return;
    }
    if (garage.length >= 10) {
      showNotification("Garage is full!");
      return;
    }
    setGarage((prev) => [...prev, plateNumber]);
    setPlateNumber("");
    setArrivals((prev) => prev + 1);
    showNotification(`Car ${plateNumber} arrived!`);
  };

  // Dequeue / Departure
  const handleDepartureLastCar = () => {
    if (garage.length === 0) {
      showMessage("Garage is empty!");
      return;
    }
    const departingCar = garage[0];
    // Immediately remove the first car
    setGarage((prev) => prev.slice(1));
    setDepartures((prev) => prev + 1);
    showNotification(`Car ${departingCar} departed!`);
  };
  
  const departCar = (plateNumber) => {
    if (garage.length === 0) {
      showNotification("Garage is empty!");
      return;
    }
    if (!plateNumber.trim()) {
      showNotification("Plate number cannot be empty!");
      return;
    }

    if (!garage.includes(plateNumber)) {
      showNotification("Car is not in the garage!");
      return;
    }

    if (garage.indexOf(plateNumber) !== 0) {
      showNotification("Car is not in front!");
      return;
    }
    const departingCar = garage[garage.indexOf(plateNumber)];
    // Immediately remove the first car
    setGarage((prev) => prev.filter((car) => car !== plateNumber));
    setDepartures((prev) => prev + 1);
    showNotification(`Car ${departingCar} departed!`);
  };

  return (
    <div
      className="min-h-screen flex flex-col
        bg-[url('/images/green-field-bg.png')] bg-cover md:bg-[length:130%] lg:bg-[length:130%] bg-center 
        relative animate-scroll"
    >
      <div className="mt-5">
        Nav
      </div>

      <AnimatedClouds/>
  
      <div className='flex justify-center items-center gap-2'>
        <div className='pixel-corners bg-[#7f7f7f] p-2 rounded-lg border-4 border-black mb-2'>
          <h1 className=" z-30 text-4xl font-bold text-center text-white font-minecraftBold">PUP-CEA Parking Garage</h1>
        </div>
      </div>

      {/* Notification (Animated Slide-In) */}
      {notification && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="fixed top-4 right-4 bg-minecraft-whiteSecondary text-black font-minecraftItalic border-2 border-black shadow-craftingBoard py-2 px-8 rounded z-50"
        >
          {notification}
        </motion.div>
      )}

      {/* Form Section */}
      <div className="z-10 flex justify-center">
        <div className="w-screen text-black max-w-7xl min-h-64">
          <h2 className="text-xl font-pressStart my-2 text-center">Car Arrival/Departure</h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 justify-center"
          >
            <div className="flex flex-col gap-4 justify-center items-center">
              <div>
                <input
                  type="text"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  placeholder="ENTER PLATE NUMBER..."
                  className="p-2 font-minecraftRegular placeholder:text-gray-600 bg-minecraft-whiteSecondary rounded border text-black border-black w-full md:w-auto"
                />
              </div>
              <div className="flex gap-2">
                <MinecraftBtn
                  variant="success"
                  size="md"
                  onClick={handleArrival}
                  className="flex items-center justify-center gap-2"
                >
                  <img src={CartIcon} className="w-5 h-5" />
                  <span>Arrival</span>
                </MinecraftBtn>
                <MinecraftBtn
                  variant="danger"
                  size="md"
                  className="flex items-center justify-center gap-2"
                  onClick={() => departCar(plateNumber)}
                >
                  <img src={CartIcon} className="w-5 h-5" />
                  <span>Departure</span>
                </MinecraftBtn>
                <MinecraftBtn
                  type="primary"
                  onClick={handleDepartureLastCar}
                  className="flex items-center justify-center gap-2"
                >
                <img src={CartIcon} className="w-5 h-5" />
                  <span>Depart Front Car</span>
                </MinecraftBtn>

              </div>
            </div>
          </form>
          <div className="mt-6 w-full flex justify-around">
            <div className="flex gap-10">
              <p className="text-lg font-minecraftRegular">Total Arrivals: {arrivals}</p>
              <p className="text-lg font-minecraftRegular">Total Departures: {departures}</p>
            </div>
          </div>
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 bg-red-100 text-red-700 p-3 rounded border border-red-400 text-center"
            >
              {message}
            </motion.div>
          )}
        </div>
      </div>

      {/* Garage Section */}
      <div className="relative py-4 w-full min-h-40 flex justify-center items-center overflow-x-auto overflow-y-hidden">
        <div className="absolute h-20 bottom-[-20px] w-full bg-[url('/images/rail.png')] bg-contain animate-seamlessScroll" />
        <div className="flex gap-2 justify-center items-center w-full z-10 overflow-x-hidden overflow-y-hidden py-4 ">
          <AnimatePresence>
            {garage.map((car, index) => {
              // Is this car the front or rear of the queue?
              const isFront = index === 0;
              const isRear = index === garage.length - 1;

              // If there's only one car, it's both front and rear
              // You could add special styling if isFront && isRear
              // For simplicity, we'll show both labels if there's only 1 car.
              let borderClass = "";
              if (isFront && isRear) {
                // Both front and rear
                // borderClass = "border-4 border-primary"; 
                borderClass = "" 
              } else if (highlightedCar === car) {
                // borderClass = "border-4 border-delete";
                borderClass = "";
              } else if (isFront) {
                // borderClass = "border-4 border-primary";
                borderClass = "";
              } else if (isRear) {
                // borderClass = "border-4 border-green-500";
                borderClass = "";
              }

              return (
                <motion.div
                  key={car}
                  layout
                  initial={{ x: 1000, opacity: 1 }}
                  animate={{ x: 1, opacity: 1 }}
                  exit={{ x: -1000, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    layout: {
                      type: "spring",
                      stiffness: 20, // 300
                      damping: 20,
                    },
                  }}
                  className={`z-50 relative h-[90px] text-gray-800 rounded-lg flex items-center justify-between flex-col min-w-[100px] ${borderClass}`}
                >
                  {/* Car icon and plate number */}
                  <div className="w-28 h-14 absolute bottom-0 mb-[-24px]">
                    <img src={`/images/cart${index + 1}.png`} className="absolute bottom-0 w-20 h-32" />
                    <p className="absolute bottom-5 left-[-9px] text-center w-full text-xs font-minecraftRegular font-bold text-dark">{car}</p>
                  </div>

                  {isRear && isFront && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                        delay: 0.1,
                      }}
                      className="absolute z-40 -top-4 left-1/2 transform font-minecraftRegular font-bold -translate-x-1/2 bg-[#D8B589] border border-orange-200 px-2 py-1 text-dark text-xs shadow-inner"
                    >
                      FRONTREAR
                    </motion.div>
                  )}

                  {/* If front car => show the "Front" arrow */}
                  {isFront && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, y: -10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                        delay: 0.1,
                      }}
                      className="z-30 absolute -top-4 left-1/2 transform font-minecraftRegular font-bold -translate-x-1/2 bg-[#D8B589] border border-orange-200 px-2 py-1 text-dark text-xs shadow-inner"
                    >
                      FRONT
                    </motion.div>
                  )}

                  {/* If rear car => show the "Rear" arrow */}
                  {isRear && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                        delay: 0.1,
                      }}
                      className="absolute -top-4 left-1/2 transform font-minecraftRegular font-bold -translate-x-1/2 bg-[#D8B589] border border-orange-200 px-2 py-1 text-dark text-xs shadow-inner"
                    >
                      REAR
                    </motion.div>
                  )}

                  {/* if highlited */}
                  {highlightedCar === car && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 100, duration: 1 }}
                      className="z-10 absolute -top-4 left-1/2 transform font-minecraftRegular font-bold w-16 -translate-x-1/2 bg-[#D8B589] border border-orange-200 px-2 py-1 text-dark text-[9px] shadow-inner"
                    >
                      THAT'S ME!
                    </motion.div>
                  )}

                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* If garage is empty */}
          {garage.length === 0 && (
            <div className="w-full flex items-center justify-center">
              <div className="flex gap-5 items-center space-y-4">
                {/* <FaCar className="text-6xl text-gray-300" />
                <p className="text-2xl font-bold text-gray-400">Garage is Empty</p> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queue;
