import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-[#0a0510] via-[#1a1025] to-[#050010] overflow-hidden flex items-center justify-center font-sans">
      
      {/* Connecting lines / ambient background effects */}
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-[2px] transform -translate-y-1/2"></div>
        <div className="absolute top-[55%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent transform -translate-y-1/2 rotate-[4deg]"></div>
        <div className="absolute top-[45%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent transform -translate-y-1/2 -rotate-[4deg]"></div>
        
        {/* Glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-purple-900/30 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
 
      {/* Left Character - Traditional Woman */}
      <div className="absolute left-0 bottom-0 h-[90vh] w-[70vw] z-10 animate-slide-left">
        <div className="relative w-full h-full">
          <Image
            src="/traditional_woman.png"
            alt="Traditional Indian Woman"
            fill
            className="object-contain object-left-bottom"
            priority
          />
        </div>
      </div>

      {/* Right Character - Robot Woman */}
      <div className="absolute right-0 bottom-0 h-[70vh] w-[70vw] z-10 animate-slide-right">
        <div className="relative w-full h-full">
          <Image
            src="/robot_woman.png"
            alt="Futuristic Robot Woman"
            fill
            className="object-contain object-right-bottom"
            priority
          />
        </div>
      </div>

      {/* Center Content - Title and Logo */}
      <div className="relative z-20 flex flex-col items-center animate-fade-in-up">
        {/* <div className="mb-8 relative w-56 h-56 animate-pulse-glow">
          <Image
            src="/prisma_logo.jpg"
            alt="Prisma Logo"
            fill
            className="object-contain blend-screen"
            priority
          />
        </div> */}
        
        <div className="text-center animate-floating">
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-white to-purple-200 drop-shadow-2xl mb-6">
            PRISMA <span className="font-light">3.0</span>
          </h1>
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-200/60"></div>
            <p className="text-xl md:text-2xl tracking-[0.4em] font-light text-purple-100 uppercase">
              CSE Annual Magazine
            </p>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-200/60"></div>
          </div>
        </div>
      </div>
    </main>
  );
}