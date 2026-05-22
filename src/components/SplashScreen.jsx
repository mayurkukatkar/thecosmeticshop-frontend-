import React from 'react';

const SplashScreen = ({ isFading }) => {
    return (
        <div 
            className={`fixed inset-0 z-[9999] bg-brand-green flex flex-col items-center justify-center select-none transition-all ${
                isFading ? 'animate-fade-out' : ''
            }`}
        >
            {/* Elegant Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full filter blur-3xl pointer-events-none"></div>

            <div className="flex flex-col items-center justify-center relative z-10 px-4">
                {/* Logo container with scale animation and gold border */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-brand-gold/60 bg-brand-cream/5 flex items-center justify-center p-3 shadow-[0_0_40px_rgba(212,175,55,0.15)] animate-scale-up">
                    <img 
                        src="/logo.jpg" 
                        alt="Chawke Fashion" 
                        className="w-full h-full object-contain rounded-full"
                    />
                </div>

                {/* Shimmering Gold Brand Name */}
                <h1 className="font-serif tracking-[0.2em] text-3xl md:text-4xl font-bold uppercase gold-shimmer-text mt-8 text-center">
                    Chawke Fashion
                </h1>

                {/* Tagline */}
                <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-brand-cream/70 mt-3 uppercase font-light">
                    Luxury Traditional Wear
                </p>

                {/* Minimalist Loader */}
                <div className="mt-8 flex items-center justify-center">
                    <div className="w-24 h-[1px] bg-brand-gold/25 relative overflow-hidden rounded-full">
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-brand-gold rounded-full animate-[shimmer_1.5s_infinite_linear]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
