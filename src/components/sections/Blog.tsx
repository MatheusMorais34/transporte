import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "5 Dicas de Segurança no Transporte Escolar",
    imageId: "blog-post-1",
    excerpt: "A segurança dos pequenos é prioridade. Confira dicas essenciais que todo pai e mãe devem saber sobre o transporte escolar.",
    date: "15 de Junho, 2024",
  },
  {
    title: "Melhores Destinos para Passeios de Um Dia",
    imageId: "blog-post-2",
    excerpt: "Procurando um destino para uma viagem rápida? Veja nossa lista de lugares incríveis para um bate e volta saindo da sua cidade.",
    date: "10 de Junho, 2024",
  },
  {
    title: "A Importância da Atividade Extracurricular",
    imageId: "blog-post-3",
    excerpt: "Saiba como os passeios e excursões escolares contribuem para o desenvolvimento social e cultural das crianças e adolescentes.",
    date: "5 de Junho, 2024",
  },
];

export function Blog() {
  return (
    <section id="blog" className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold sm:text-4xl">Nosso Blog</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Dicas, notícias e informações sobre transporte e passeios.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const image = PlaceHolderImages.find(p => p.id === post.imageId);
            return (
              <Card key={post.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out hover:-translate-y-2">
                {image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline leading-snug">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">{post.date}</span>
                   <Button variant="link" asChild className="p-0 h-auto text-primary">
                     <Link href="#">
                       Ler Mais <ArrowRight className="ml-1 h-4 w-4" />
                     </Link>
                   </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
