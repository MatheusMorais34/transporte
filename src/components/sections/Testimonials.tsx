import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const testimonials = [
  {
    name: "Ana Silva",
    title: "Mãe do Lucas, 8 anos",
    avatarId: "testimonial-avatar-1",
    quote: "A 'Leva & Traz' é fantástica! Sinto-me muito segura sabendo que meu filho está em boas mãos. A pontualidade e o cuidado com as crianças são impecáveis. O app de acompanhamento é um diferencial enorme!",
  },
  {
    name: "Carlos Pereira",
    title: "Coordenador de Eventos",
    avatarId: "testimonial-avatar-2",
    quote: "Contratamos a 'Leva & Traz' para um passeio corporativo e o serviço foi excelente. Vans novas, motorista profissional e um planejamento de rota perfeito. Com certeza faremos novos negócios.",
  },
  {
    name: "Juliana Costa",
    title: "Professora",
    avatarId: "testimonial-avatar-3",
    quote: "Organizamos uma excursão escolar e a 'Leva & Traz' cuidou de todo o transporte. Foi a melhor experiência que já tivemos. Segurança, conforto para os alunos e muita praticidade para a escola.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold sm:text-4xl">O que nossos clientes dizem</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Veja o que os pais e organizadores de eventos falam sobre nós.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatarId);
              return (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="shadow-none border-none bg-transparent">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-xl font-medium mb-6">"{testimonial.quote}"</p>
                        {avatar && (
                          <Avatar className="h-16 w-16 mb-2">
                            <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint} />
                            <AvatarFallback>{testimonial.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                        )}
                        <h4 className="font-headline font-semibold">{testimonial.name}</h4>
                        <span className="text-sm text-muted-foreground">{testimonial.title}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
