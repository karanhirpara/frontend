import heroConcert from '@/assets/hero-concert.jpg';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroConcert})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container h-full flex flex-col justify-center">
        <div className="max-w-xl animate-fade-in">
          <p className="mb-4">
            <span className="highlight-pink text-foreground font-semibold text-lg">
              GET INTO IT
            </span>
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="highlight-pink text-foreground">FROM POP BALLADS</span>
            <br />
            <span className="highlight-blue text-foreground">TO EMO ENCORES</span>
          </h1>

          <Button 
            size="lg" 
            variant="secondary"
            className="font-semibold text-foreground bg-background hover:bg-background/90 shadow-lg"
          >
            Get Into Live Music
          </Button>
        </div>
      </div>
    </section>
  );
}
