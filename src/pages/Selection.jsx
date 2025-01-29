import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FiArrowLeft } from 'react-icons/fi';

const Selection = () => {
  const navigate = useNavigate();
  const clickSound = new Audio('/audio/button-click.mp3');

  useEffect(() => {
    const audio = new Audio('/audio/homepage-bg.mp3');
    audio.volume = 0.7;
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  const cards = [
    {
      title: "Tic Tac Toe",
      description: "A classic game of strategy for two players",
      color: "bg-[#119B84]",
      path: "/case1"
    },
    {
      title: "Stack",
      description: "Explore the Last-In-First-Out data structure",
      color: "bg-[#C28340]",
      path: "/case2"
    },
    {
      title: "Queue",
      description: "Discover First-In-First-Out operations",
      color: "bg-[#723232]",
      path: "/case3"
    },
    {
      title: "Binary Tree",
      description: "Visualize hierarchical data structures",
      color: "bg-[#2C5530]",
      path: "/case4"
    },
    {
      title: "BST Traversal",
      description: "Learn different tree traversal methods",
      color: "bg-[#492F7E]",
      path: "/case5"
    },
    {
      title: "Towers of Hanoi",
      description: "Solve the classic disk movement puzzle",
      color: "bg-[#6B4423]",
      path: "/case6"
    },
    {
      title: "Sorting",
      description: "Visualize different sorting algorithms",
      color: "bg-[#8B1E3F]",
      path: "/case7"
    }
  ];

  const handleCardClick = (path) => {
    clickSound.currentTime = 0; // Reset playback in case clicked repeatedly
    clickSound.play().catch((err) => {
      console.log('Audio play failed:', err);
    });
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-[url('/images/selection-bg.png')] bg-cover md:bg-[length:150%] lg:bg-[length:150%] bg-center 
      animate-panBackground">
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='absolute top-4 left-4'>
            {/* back button */}
            <button
              onClick={() => navigate('/')}
              className="pixel-corners p-2 bg-minecraft-gray text-white  shadow-md hover:bg-primary-light transition"
            >
                <FiArrowLeft size={24} />
            </button>
        </div>
        <div className='w-[300px] sm:w-[400px]'>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Navigation, Pagination]}
            className="w-full"
            pagination={{
              dynamicBullets: true,
            }}
            navigation={true}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <div 
                  onClick={() => handleCardClick(card.path)}
                  className={`cursor-pointer w-full rounded border-2 border-black text-white 
                    font-minecraftRegular ${card.color} h-[450px] flex flex-col items-center p-10
                    transition-transform hover:scale-[1.02] relative overflow-hidden`}
                >
                  <div className='absolute top-0 left-0 w-full h-1 bg-white opacity-20'></div>
                  <div className='absolute top-0 right-0 w-1 h-full bg-white opacity-20'></div>
                  
                  <div className='text-2xl mb-4'>{card.title}</div>
                  
                  <div className='text-center'>{card.description}</div>
                  
                  <div className='mt-auto text-sm opacity-80 font-minecraftItalic'>
                    Click to start
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Add custom navigation styles */}
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            color: white;
            background: rgba(0, 0, 0, 0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 20px;
          }

          .swiper-pagination-bullet {
            background: white;
          }

          .swiper-pagination-bullet-active {
            background: white;
          }
        `}
      </style>
    </div>
  );
};

export default Selection;