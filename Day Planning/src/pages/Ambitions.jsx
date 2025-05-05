import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Header from "./Header";

const Ambitions = () => {
  const slideRef = useRef([]);
  const captionRef = useRef(null);

  const images = [
    "https://media-hosting.imagekit.io/ad3330e0474b43c5/Screenshot%202025-03-21%20060410.png?Expires=1841069792&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=gOBIQhYEtNKufXaL6de8cOhvP1ySCzGkK7dqrFcpP4dHbILH7D37BtJroPy~bKRKyDx-XdFO-tMSQ38yxSK42bihWJslQDDVcLLiJv6JyOKITmNbK0P--MGlqu-RH8N6VC70pXGO6y8-YQeF38SI4jJ-CQxdUYaqX--69xTr~pGHWjf78E6d-MLfD~-CVpsZvcQonusmKw3meC~7RjZ7EnzK2fNeOSKVF9LZK7eqV18EwDupWtiU4Iy4YBrSh7QVahnn0RJYv7iU3DdsB1-UkVlwwZI7IF9Vep6G40oHtvyd7Y7yivx06pmIvEKHjzjRd0h6JDmF22pUVTA1tP0KSg__",
    "https://media-hosting.imagekit.io/e565247c172e4a0e/Screenshot%202025-03-19%20081729.png?Expires=1841069807&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=RqC8o0ZmE6qFKKpKu3CK1HeVDP3v9BhNmMFMmOlPSQmwGGhxRn2o~B4qTec~nlAkbymQJDSr~zoj2tAhrkdxpcM5H6ir2oDyNm0Sbmf6~3eOThtpqEyNlQ6o67aJ6x0kqUdwqqp1NNBAJDbBK1BjBhp5uB0xgVacilDkE-ZEKBjwMveM2lchnW6y1rUThzAvd0j26EUxYLRGr1Fy88YFgED3LWhPdjs3AoWVBzHoE6henuEHL452fDaHegl3FRii4qBlJzfJW6XUgibqHC5PbygCZVw3bIqkYJExs5LhEouMdiQJglrYJi7ESY6hzMwvxRe~f6Nk6H~NKolyVZWZJA__",
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut" },
    });

    tl.to(slideRef.current[0], { opacity: 1, duration: 1 })
      .to(captionRef.current, { opacity: 1, y: -10, duration: 1 }, "-=0.5")
      .to(slideRef.current[0], { opacity: 0, duration: 1, delay: 2 })
      .to(slideRef.current[1], { opacity: 1, duration: 1 })
      .to(captionRef.current, { opacity: 1, y: -10, duration: 1 }, "-=0.5")
      .to(slideRef.current[1], { opacity: 0, duration: 1, delay: 2 });
  }, []);

  return (
    <>
      <Header />
      <div className="relative w-full min-h-screen mx-auto overflow-hidden rounded-2xl shadow-xl bg-black">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            ref={(el) => (slideRef.current[index] = el)}
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-1000"
          />
        ))}
        <div
          ref={captionRef}
          className="absolute text-center bottom-5 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold bg-black/90 px-6 py-3 rounded-lg opacity-0"
        >
          I want to Become BEST MERN Stack developer in the world
        </div>
      </div>
    </>
  );
};

export default Ambitions;
