import Link from "next/link";
import { Bus, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container py-9">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <Bus className="h-7 w-7 text-primary" />
              <span className="font-bold font-headline text-xl">Leva & Traz</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Sua solução confiável para transporte escolar e passeios turísticos com segurança e conforto.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin /></Link>
            </div>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="#services" className="text-muted-foreground hover:text-primary">Serviços</Link></li>
              <li><Link href="#testimonials" className="text-muted-foreground hover:text-primary">Depoimentos</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-primary">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Rua da Viagem, 123</li>
              <li>Sua Cidade, BR</li>
              <li className="pt-2">
                <a href="mailto:contato@levaetraz.com" className="hover:text-primary">contato@levaetraz.com</a>
              </li>
              <li>
                <a href="tel:+5511999998888" className="hover:text-primary">(11) 99999-8888</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Leva & Traz. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
