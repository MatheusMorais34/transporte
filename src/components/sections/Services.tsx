import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, GraduationCap, Map } from "lucide-react";

const services = [
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: "Transporte Escolar",
    description: "Transporte seguro e pontual para estudantes. Nossos motoristas são qualificados e as vans equipadas para garantir o bem-estar do seu filho.",
  },
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: "Passeios Turísticos",
    description: "Explore novos lugares com nossos passeios customizáveis. Ideal para grupos, excursões escolares ou viagens em família com total conforto.",
  },
  {
    icon: <Bus className="h-10 w-10 text-primary" />,
    title: "Fretamento",
    description: "Alugue nossas vans para eventos, viagens corporativas ou qualquer outra necessidade. Oferecemos flexibilidade e um serviço de alta qualidade.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold sm:text-4xl">Nossos Serviços</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Soluções completas para transporte escolar e passeios.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  {service.icon}
                </div>
                <CardTitle className="font-headline pt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
