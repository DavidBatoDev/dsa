import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCar } from 'react-icons/fa';
import CustomButton from '../components/CustomButton';
import CartEmpty from '/svg/cart-empty.svg';
import InventoryTable from '../components/InventoryTable';
import CartChest from '/svg/cart-chest.svg';

const Stack = () => {
  const [garage, setGarage] = useState([]);
  const [plateNumber, setPlateNumber] = useState('');
  const [arrivals, setArrivals] = useState(0);
  const [departures, setDepartures] = useState(0);
  const [message, setMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [departingCar, setDepartingCar] = useState(null);
  const [isDeparting, setIsDeparting] = useState(false); // Track departure state

  useEffect(() => {
    document.title = "Stack";
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const departLastCar = () => {
    if (isDeparting) return; // Prevent spamming
    if (garage.length === 0) {
      showMessage('Garage is empty!');
      return;
    }

    setIsDeparting(true); // Set departure state
    const lastCar = garage[garage.length - 1];
    setDepartingCar(lastCar);

    setTimeout(() => {
      setGarage(garage.slice(0, -1));
      setDepartures(departures + 1);
      setDepartingCar(null);
      setIsDeparting(false); // Reset departure state
      showNotification(`Car ${lastCar} departed!`);
    }, 1000); // Match this timeout to the animation duration
  };

  const handleArrival = () => {
    if (!plateNumber.trim()) {
      showMessage('Plate number cannot be empty!');
      return;
    }
    if (plateNumber.length > 11) {
      showMessage('Plate number must be 11 characters or less!');
      return;
    }
    if (garage.includes(plateNumber)) {
      showMessage('Plate number must be unique!');
      return;
    }
    if (garage.length >= 10) {
      showMessage('Garage is full!');
      return;
    }
    setGarage([...garage, plateNumber]);
    setPlateNumber('');
    setArrivals(arrivals + 1);
    showNotification(`Car ${plateNumber} arrived!`);
  };

  const handleDeparture = () => {
    if (!plateNumber.trim()) {
      showMessage('Plate number cannot be empty!');
      return;
    }
    if (!garage.includes(plateNumber)) {
      showMessage('Car not found in the garage!');
      return;
    }
    if (garage[garage.length - 1] !== plateNumber) {
      showMessage('Car must be at the top of the stack to depart!');
      return;
    }
    departLastCar(); // Use the same logic as departLastCar
    setPlateNumber('');
  };

  return (
    <div className="min-h-screen bg-secondary p-8 text-gray-800 relative
            bg-[url('/images/stack-bg.png')] bg-cover md:bg-[length:150%] lg:bg-[length:150%] bg-center 
          animate-panBackground
    ">
      <div className='flex justify-center items-center gap-2'>
        <div className='bg-[#7f7f7f] p-2 rounded-lg border-4 border-black mb-2'>
          <h1 className="text-4xl font-bold text-center text-white font-minecraftBold">PUP-CEA Parking Garage</h1>
        </div>
      </div>

      {/* Notification */}
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

      <div className="flex gap-5">
        {/* Form Section */}
        <div className='w-[38%] h-[445px] bg-[#D9D9D9] flex justify-center items-center p-6 rounded-lg border-4 border-black shadow'>
          <div className="w-full h-full bg-minecraft-abyss bg-secondary-light text-black p-6 rounded-lg border border-[#1c1c1c] shadow-craftingBoard">
            <h2 className="text-2xl font-bold mb-1 font-minecraftRegular text-center text-[#C28340]">Car Arrival/Departure</h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col space-y-2"
            >
              <label className="text-lg font-minecraftRegular text-white text-center">Car Plate Number:</label>
              <input
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="Enter Plate Number"
                className="p-2 rounded border border-black bg-[#FFF] font-minecraftRegular text-center text-[#C28340]"
              />
              <CustomButton
                variant="arrival"
                icon={() => <FaCar className="text-xl h-[10px]" />}
                onClick={handleArrival}
              >
                Arrival
              </CustomButton>
              <CustomButton
                variant="departure"
                icon={() => <FaCar className="text-xl" />}
                onClick={handleDeparture}
              >
                Departure
              </CustomButton>
              <CustomButton
                variant="departLastCar"
                icon={() => <FaCar className="text-xl" />}
                onClick={departLastCar}
              >
                Depart Last Car
              </CustomButton>
            </form>
            <div className="mt-2">
              <p className="text-lg font-minecraftRegular text-white text-center">Total Arrivals: {arrivals}</p>
              <p className="text-lg font-minecraftRegular text-white text-center">Total Departures: {departures}</p>
            </div>
            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 bg-red-100 text-red-700 p-3 rounded border border-red-400"
              >
                {message}
              </motion.div>
            )}
          </div>
        </div>

        {/* Garage Section */}
        <div className="w-[62%] h-[445px] flex py-6 px-5 bg-minecraft-whiteSecondary border-black border-4 rounded-lg shadow-whiteinset">
          {/*  */}
          <div className='flex flex-col justify-center items-center h-full w-full'>
            <div className="border border-black w-[97%] bg-[#BBB] rounded-lg shadow-whiteinset">
              <div className="text-white">
                <h2 className="text-[15px] p-2 font-pressStart text-[#C28340] text-stroke">
                  Car Information
                </h2>
              </div>
            </div>
            <div className="rounded-lg w-full h-full flex flex-col-reverse items-center overflow-hidden">
              {garage.map((car, index) => {
                // Ensure 10 cells by padding with empty strings
                const paddedCarData = [...car.split(''), ...Array(11 - car.length).fill('')];
                return (
                  <motion.div
                    key={index}
                    initial={{ y: -50, opacity: 0 }}
                    animate={
                      departingCar === car
                        ? { x: 300, opacity: 0 } // Animate departure
                        : { y: 0, opacity: 1 }
                    }
                    transition={{ type: "spring", stiffness: 100, duration: 1 }}
                    className="bg-[#D9D9D9] rounded-lg shadow-md"
                  >
                    <InventoryTable
                      data={paddedCarData} // Pass the padded array with exactly 10 cells
                      className="bg-[#BBB] p-[2px] rounded shadow-md border border-[#8B8B8B]"
                      cellClassName="text-white font-pressStart text-sm w-[50px] h-[1.80rem]"
                    />
                  </motion.div>
                );
              })}
              {garage.length === 0 && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex justify-center flex-col items-center space-y-4">
                    <img src={CartEmpty} alt="Garage Empty" />
                    <p className="text-2xl font-pressStart text-stroke text-[#C28340]">
                      Garage is Empty ...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cart Chest Section */}
          <div className="flex flex-col justify-end items-center w-[70px] h-full">
            <div className="w-[97%] bg-[#BBB] rounded-lg shadow-whiteinset">
              <div className="rounded-lg w-full h-full flex flex-col-reverse items-center overflow-hidden">
                {[...Array(10)].map((_, index) => {
                  // Render the cart chest SVG if how many cars are in the garage, if the garage has 2 cars, render 2 cart chest SVGs
                  const cartNumber = index + 1; // Numbers from 10 (bottom) to 1 (top)

                  const isCartChest = garage.length >= cartNumber; 


                  return (
                    <motion.div
                      key={index}
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 100, duration: 1 }}
                      className="bg-[#D9D9D9] rounded-lg shadow-md"
                    >
                      <InventoryTable
                        data={isCartChest ? [<img src={CartChest} alt="Cart Chest" className="w-[28px] h-[28px]" />] : ['']}
                        className="bg-[#BBB] p-[2px] rounded shadow-md border border-[#8B8B8B]"
                        cellClassName="text-white font-pressStart text-sm w-[50px] h-[1.80rem]"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
};

export default Stack;
