import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [currentAlgorithm, setCurrentAlgorithm] = useState('');
  const [comparing, setComparing] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [arrayLength, setArrayLength] = useState(8);
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [currentMin, setCurrentMin] = useState(null);

  // Generate random array
  const generateArray = (length = arrayLength) => {
    const newArray = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
  };

  // Handle array length change
  const handleArrayLengthChange = (e) => {
    const newLength = parseInt(e.target.value);
    setArrayLength(newLength);
    generateArray(newLength);
  };

  // Handle animation speed change
  const handleAnimationSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value);
    setAnimationSpeed(newSpeed);
  };

  // Shared delay function
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Bubble Sort
  const bubbleSort = async () => {
    setSorting(true);
    setCurrentAlgorithm('Bubble Sort');
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await delay(animationSpeed);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
      }
    }
    setComparing([]);
    setSorting(false);
  };

  // Selection Sort with Educational Visualization
  const selectionSort = async () => {
    setSorting(true);
    setCurrentAlgorithm('Selection Sort');
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      setCurrentMin(minIndex);

      // Find the minimum element in unsorted part
      for (let j = i + 1; j < n; j++) {
        setComparing([minIndex, j]);
        await delay(animationSpeed);

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      // If a smaller element is found, swap
      if (minIndex !== i) {
        // Visualize swap with a temporary state
        const tempArr = [...arr];
        tempArr[i] = arr[minIndex];
        tempArr[minIndex] = arr[i];
        setArray(tempArr);
        await delay(animationSpeed);

        // Actual swap
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
      }

      // Reset current min after each iteration
      setCurrentMin(null);
    }

    setComparing([]);
    setSorting(false);
  };

  // Insertion Sort
  const insertionSort = async () => {
    setSorting(true);
    setCurrentAlgorithm('Insertion Sort');
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        setComparing([j, j + 1]);
        await delay(animationSpeed);

        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
      }
      arr[j + 1] = key;
    }
    setComparing([]);
    setSorting(false);
  };

  // Merge Sort
  const mergeSort = async () => {
    setSorting(true);
    setCurrentAlgorithm('Merge Sort');

    const merge = async (left, right) => {
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        setComparing([leftIndex, rightIndex]);
        await delay(animationSpeed);

        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
        setArray([...result, ...left.slice(leftIndex), ...right.slice(rightIndex)]);
      }

      return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
    };

    const mergeSortRecursive = async (arr) => {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);

      return await merge(
        await mergeSortRecursive(left),
        await mergeSortRecursive(right)
      );
    };

    const arr = [...array];
    const sortedArr = await mergeSortRecursive(arr);
    setArray(sortedArr);
    setComparing([]);
    setSorting(false);
  };

  // Quick Sort
  const quickSort = async () => {
    setSorting(true);
    setCurrentAlgorithm('Quick Sort');
    const arr = [...array];

    const partition = async (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        setComparing([i + 1, j]);
        await delay(animationSpeed);

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
        }
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      return i + 1;
    };

    const quickSortRecursive = async (arr, low, high) => {
      if (low < high) {
        let pivotIndex = await partition(arr, low, high);
        await quickSortRecursive(arr, low, pivotIndex - 1);
        await quickSortRecursive(arr, pivotIndex + 1, high);
      }
      return arr;
    };

    await quickSortRecursive(arr, 0, arr.length - 1);
    setComparing([]);
    setSorting(false);
  };

  // Heap Sort
  const heapSort = async () => {
    setSorting(true);
    setCurrentAlgorithm('Heap Sort');
    const arr = [...array];

    const heapify = async (arr, n, i) => {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      if (left < n) {
        setComparing([largest, left]);
        await delay(animationSpeed);
        if (arr[left] > arr[largest]) {
          largest = left;
        }
      }

      if (right < n) {
        setComparing([largest, right]);
        await delay(animationSpeed);
        if (arr[right] > arr[largest]) {
          largest = right;
        }
      }

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setArray([...arr]);
        await heapify(arr, n, largest);
      }
    };

    const heapSortAlgorithm = async () => {
      let n = arr.length;

      // Build max heap
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
      }

      // Extract elements from heap one by one
      for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        setArray([...arr]);
        await heapify(arr, i, 0);
      }
    };

    await heapSortAlgorithm();
    setComparing([]);
    setSorting(false);
  };

  // Shell Sort
  const shellSort = async () => {
    setSorting(true);
    setCurrentAlgorithm('Shell Sort');
    const arr = [...array];
    const n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = arr[i];
        let j;

        for (j = i; j >= gap; j -= gap) {
          setComparing([j - gap, j]);
          await delay(animationSpeed);

          if (arr[j - gap] > temp) {
            arr[j] = arr[j - gap];
            setArray([...arr]);
          } else {
            break;
          }
        }
        arr[j] = temp;
      }
    }
    setComparing([]);
    setSorting(false);
  };

  // Initialize array on component mount
  useEffect(() => {
    generateArray();
  }, []);

  // Render sorting algorithms buttons
  const sortingAlgorithms = [
    { name: 'Bubble Sort', algorithm: bubbleSort },
    { name: 'Selection Sort', algorithm: selectionSort },
    { name: 'Insertion Sort', algorithm: insertionSort },
    { name: 'Merge Sort', algorithm: mergeSort },
    { name: 'Quick Sort', algorithm: quickSort },
    { name: 'Heap Sort', algorithm: heapSort },
    { name: 'Shell Sort', algorithm: shellSort }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sorting Visualizer</h1>
      
      <div className="flex flex-wrap items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="arrayLength" className="mr-2">Array Length:</label>
          <input 
            type="number" 
            id="arrayLength"
            min="5" 
            max="20" 
            value={arrayLength} 
            onChange={handleArrayLengthChange}
            disabled={sorting}
            className="w-20 p-1 border rounded"
          />
          <input 
            type="range" 
            min="5" 
            max="20" 
            value={arrayLength} 
            onChange={handleArrayLengthChange}
            disabled={sorting}
            className="w-40"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="animationSpeed" className="mr-2">Animation Speed (ms):</label>
          <input 
            type="number" 
            id="animationSpeed"
            min="50" 
            max="1000" 
            value={animationSpeed} 
            onChange={handleAnimationSpeedChange}
            disabled={sorting}
            className="w-20 p-1 border rounded"
          />
          <input 
            type="range" 
            min="50" 
            max="1000" 
            value={animationSpeed} 
            onChange={handleAnimationSpeedChange}
            disabled={sorting}
            className="w-40"
          />
        </div>
        
        <button 
          onClick={() => generateArray(arrayLength)} 
          disabled={sorting}
          className="bg-blue-500 text-white hover:bg-blue-600 p-2 rounded"
        >
          Generate New Array
        </button>
      </div>

      <div className="flex space-x-2 mb-4 flex-wrap">
        {sortingAlgorithms.map(({ name, algorithm }) => (
          <button
            key={name}
            onClick={algorithm}
            disabled={sorting}
            className="bg-green-500 p-3 text-white hover:bg-green-600 m-1 rounded"
          >
            {name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center relative h-64">
        <AnimatePresence>
          {array.map((value, index) => (
            <motion.div
              key={value}
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                backgroundColor: 
                  comparing.includes(index) ? '#EF4444' : 
                  (currentMin === index ? '#10B981' : '#3B82F6')
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 70,
                damping: 10
              }}
              className={`
                w-12 h-12 flex items-center justify-center 
                text-white font-bold rounded-lg absolute
              `}
              style={{
                left: `${index * 60}px`,
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            >
              {value}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {currentAlgorithm && (
        <div className="mt-4 text-center">
          <p className="text-lg">Current Algorithm: {currentAlgorithm}</p>
        </div>
      )}
    </div>
  );
};

export default SortingVisualizer;