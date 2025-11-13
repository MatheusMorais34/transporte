"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#services', label: 'Serviços' },
  { href: '#testimonials', label: 'Depoimentos' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Bus className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">Leva & Traz</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir Menu</span>
            </Button>
          </SheetTrigger>
          <div className="flex-1 md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <Bus className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">Leva & Traz</span>
            </Link>
          </div>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Bus className="h-6 w-6 mr-2 text-primary" />
              <span className="font-bold font-headline text-lg">Leva & Traz</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end">
          <Button asChild>
            <Link href="#contact">Solicite um Orçamento</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
