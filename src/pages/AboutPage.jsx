import {useEffect} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../components/NavButtons';

const AboutPage = () => {
    const navigate = useNavigate();
  const teamMembers = [
    {
      name: "Jasmin Fedilo",
      role: "Loves everything blue <3",
      image: "/images/ivy.skin.png"
    },
    {
        name: "Kristine Villamarin",
        role: "Foodie, funny, explorer, and self-proclaimed oa",
        image: "/images/kristine.png"
    },
    {
      name: "Clarice David",
      role: "Maganda, kamukha ni Jennie, mabait",
      image: "/images/clarice.png"
    },
    {
      name: "Diana Jacobe",
      role: "Friendly, kind, and very considerate",
      image: "/images/jacobe.png"
    },
  ];

  
    useEffect(() => {
    const audio = new Audio('/audio/homepage-bg.mp3');
    audio.volume = 0.3
    audio.loop = true; 
    audio.play();

    return () => {
        audio.pause();
    };
    }, []);

  const mechanics = [
    {
      title: "Tic Tac Toe",
      description: "A classic two-player game where players take turns marking X or O in a 3x3 grid. The goal is to get three of your marks in a row - horizontally, vertically, or diagonally. Strategic thinking and planning ahead are key to winning!",
      image: "/images/tictactoe-about.png",
      imagePosition: "right"
    },
    {
      title: "Stack",
      description: "A Last-In-First-Out (LIFO) data structure visualization. Add elements to the top of the stack with PUSH operations and remove them with POP operations. Watch as elements stack up and get removed in reverse order!",
      image: "/images/stack-about.png",
      imagePosition: "left"
    },
    {
      title: "Queue",
      description: "Experience First-In-First-Out (FIFO) operations in action. Add elements to the back of the queue with ENQUEUE and remove them from the front with DEQUEUE. Perfect for understanding sequential processing!",
      image: "/images/queue-about.png",
      imagePosition: "right"
    },
    {
      title: "Binary Tree",
      description: "Explore hierarchical data structures with this binary tree visualization. Each node can have up to two children, creating a tree-like structure. Insert nodes and watch the tree grow while maintaining its binary properties!",
      image: "/images/binary-about.png",
      imagePosition: "left"
    },
    {
      title: "BST Traversal",
      description: "Learn different ways to traverse a Binary Search Tree: in-order, pre-order, and post-order. Watch as the algorithm visits each node in specific sequences, highlighting the current position in real-time.",
      image: "/images/bst-about.png",
      imagePosition: "right"
    },
    {
      title: "Towers of Hanoi",
      description: "Challenge yourself with this classic puzzle! Move a tower of disks from one rod to another, following simple rules: move one disk at a time, and never place a larger disk on top of a smaller one.",
      image: "/images/towers-about.png",
      imagePosition: "left"
    },
    {
      title: "Sorting",
      description: "Visualize popular sorting algorithms in action: Bubble Sort, Selection Sort, Insertion Sort, and more. Watch as the elements rearrange themselves step by step until they're in perfect order!",
      image: "/images/sorting-about.png",
      imagePosition: "right"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
    {/* back button */}
    <div className='absolute top-4 left-4'>
        {/* back button */}
        <button
            onClick={() => navigate(-1)}
            className="pixel-corners p-2 bg-minecraft-gray text-white  shadow-md hover:bg-primary-light transition"
        >
            <FiArrowLeft size={24} />
        </button>
    </div>
      
      {/* Meet the Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-minecraftBold text-center mb-12">Meet the Team</h1>
        <div className="flex justify-center gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
                <div className='w-full flex justify-center'>
                <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-40 h-40 rounded-full mb-4 pixel-corners border-2 border-white"
                />

                </div>
              <h3 className="font-minecraftBold text-xl">{member.name}</h3>
              <p className="font-minecraftRegular text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Mechanics Sections */}
        <div className="space-y-32">
          {mechanics.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
              style={{
                flexDirection: item.imagePosition === 'right' ? 'row' : 'row-reverse'
              }}
            >
              <div className="flex-1">
                <div className="max-w-xl">
                  <h2 className="text-3xl font-minecraftBold mb-6">{item.title}</h2>
                  <p className="font-minecraftRegular text-lg leading-relaxed text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
              
              <div className="flex-1">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full rounded-lg pixel-corners border-2 border-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
