import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background-van');

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] max-h-[700px] flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container max-w-4xl px-4">
        <h1 className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl !leading-tight">
          Segurança e Diversão em Cada Trajeto
        </h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-200">
          Oferecemos transporte escolar confiável e passeios inesquecíveis com o máximo de conforto e pontualidade.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="#contact">Agende um Passeio</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#services">Nossos Serviços</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
