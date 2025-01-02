import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCar } from "react-icons/fa";
import Button from "../components/Button";

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
      showMessage("Plate number cannot be empty!");
      return;
    }
    if (garage.includes(plateNumber)) {
      showMessage("Plate number must be unique!");
      return;
    }
    if (garage.length >= 10) {
      showMessage("Garage is full!");
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
      showMessage("Garage is empty!");
      return;
    }
    if (!plateNumber.trim()) {
      showMessage("Plate number cannot be empty!");
      return;
    }

    if (!garage.includes(plateNumber)) {
      showMessage("Car is not in the garage!");
      return;
    }

    if (garage.indexOf(plateNumber) !== 0) {
      showMessage("Car is not in front!");
      return;
    }
    const departingCar = garage[garage.indexOf(plateNumber)];
    // Immediately remove the first car
    setGarage((prev) => prev.filter((car) => car !== plateNumber));
    setDepartures((prev) => prev + 1);
    showNotification(`Car ${departingCar} departed!`);
  };

  return (
    <div className="min-h-screen bg-secondary p-10 text-gray-800 relative">
      <h1 className="text-4xl font-bold mb-6 text-center">PUP-CEA Parking Garage</h1>

      {/* Notification (Animated Slide-In) */}
      {notification && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="fixed top-4 right-4 bg-green-500 text-white py-2 px-8 rounded shadow-lg z-50"
        >
          {notification}
        </motion.div>
      )}

      {/* Form Section */}
      <div className="flex justify-center mb-8">
        <div className="bg-secondary-light text-black p-6 rounded-lg shadow-lg border border-gray-200 w-[1300px] max-w-7xl min-h-64">
          <h2 className="text-2xl font-bold mb-4 text-center">Car Arrival/Departure</h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 justify-center"
          >
            <input
              type="text"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="Enter Plate Number"
              className="p-2 rounded border text-black border-dark bg-transparent w-full md:w-auto"
            />
            <Button
              variant="success"
              size="md"
              onClick={handleArrival}
              className="flex items-center justify-center gap-2"
            >
              <FaCar className="text-xl" />
              <span>Arrival</span>
            </Button>
            <Button
              variant="danger"
              size="md"
              className="flex items-center justify-center gap-2"
              onClick={() => departCar(plateNumber)}

            >
              <FaCar className="text-xl" />
              <span>Departure</span>
            </Button>


            <Button
              type="primary"
              onClick={handleDepartureLastCar}
              className="flex items-center justify-center gap-2"
            >
              <FaCar className="text-xl" />
              <span>Depart Front Car</span>
            </Button>
          </form>
          <div className="mt-6 w-full flex justify-around">
            <div className="flex gap-10">
              <p className="text-lg">Total Arrivals: {arrivals}</p>
              <p className="text-lg">Total Departures: {departures}</p>
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
      <div className="bg-secondary-light p-4 rounded-lg shadow-lg border border-gray-200 w-full max-w-7xl mx-auto flex justify-center items-center overflow-x-auto space-x-4">
        <div className="flex gap-2 justify-start items-center w-full mx-auto">
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
                borderClass = "border-4 border-primary"; 
              } else if (highlightedCar === car) {
                borderClass = "border-4 border-delete";
              } else if (isFront) {
                borderClass = "border-4 border-primary";
              } else if (isRear) {
                borderClass = "border-4 border-green-500";
              }

              return (
                <motion.div
                  key={car}
                  layout
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  className={`relative bg-gray-100 text-gray-800 p-2 rounded-lg flex items-center justify-between flex-col shadow-md border border-gray-300 min-w-[100px] ${borderClass}`}
                >
                  {/* Car icon and plate number */}
                  <FaCar className="text-3xl text-gray-600" />
                  <span className="text-sm font-bold">{car}</span>

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
                      className="absolute -top-4 left-1/2 transform font-primary font-bold -translate-x-1/2 bg-primary px-2 py-1 rounded-full text-dark text-xs shadow"
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
                      className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-dark px-2 py-1 rounded-full text-xs font-bold shadow"
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
                      className="absolute -top-4 right-1/2 transform translate-x-1/2 bg-delete px-2 py-1 rounded-full text-dark text-xs font-bold shadow"
                    >
                      SELECTED
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
                <FaCar className="text-6xl text-gray-300" />
                <p className="text-2xl font-bold text-gray-400">Garage is Empty</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queue;
