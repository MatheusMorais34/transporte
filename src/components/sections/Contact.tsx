"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const quoteSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório."),
  email: z.string().email("Email inválido."),
  service: z.enum(["transporte_escolar", "passeio_turistico", "fretamento"]),
  details: z.string().min(10, "Forneça mais detalhes sobre sua necessidade."),
});

const contactSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório."),
  email: z.string().email("Email inválido."),
  subject: z.string().min(2, "Assunto é obrigatório."),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
});

function QuoteForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { name: "", email: "", service: "passeio_turistico", details: "" },
  });

  const onSubmit: SubmitHandler<z.infer<typeof quoteSchema>> = async (data) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Solicitação de Orçamento:", data);
    toast({ title: "Orçamento Solicitado!", description: "Entraremos em contato em breve com sua cotação." });
    form.reset();
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="Maria Silva" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="voce@exemplo.com" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
        </div>
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Serviço</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="transporte_escolar">Transporte Escolar</SelectItem>
                  <SelectItem value="passeio_turistico">Passeio Turístico</SelectItem>
                  <SelectItem value="fretamento">Fretamento</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="details" render={({ field }) => (
            <FormItem><FormLabel>Detalhes</FormLabel><FormControl><Textarea placeholder="Ex: Rota escolar, número de crianças, destino do passeio, etc." {...field} /></FormControl><FormMessage /></FormItem>
        )}/>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Solicitar Orçamento
        </Button>
      </form>
    </Form>
  );
}

function ContactForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit: SubmitHandler<z.infer<typeof contactSchema>> = async (data) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Mensagem de Contato:", data);
    toast({ title: "Mensagem Enviada!", description: "Obrigado por nos contatar. Responderemos em breve." });
    form.reset();
    setIsLoading(false);
  };
  
  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="João da Silva" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="voce@exemplo.com" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
        </div>
        <FormField control={form.control} name="subject" render={({ field }) => (
          <FormItem><FormLabel>Assunto</FormLabel><FormControl><Input placeholder="Ex: Dúvida sobre passeios" {...field} /></FormControl><FormMessage /></FormItem>
        )}/>
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem><FormLabel>Mensagem</FormLabel><FormControl><Textarea placeholder="Sua mensagem aqui..." className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
        )}/>
        <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enviar Mensagem
        </Button>
      </form>
    </Form>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold sm:text-4xl">Entre em Contato</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Tem alguma dúvida ou quer um orçamento? Estamos aqui para ajudar.
          </p>
        </div>
        <Tabs defaultValue="quote" className="w-full" id="quote">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quote">Solicitar Orçamento</TabsTrigger>
            <TabsTrigger value="contact">Contato Geral</TabsTrigger>
          </TabsList>
          <TabsContent value="quote" className="p-6 border bg-card border-t-0 rounded-b-md">
            <QuoteForm />
          </TabsContent>
          <TabsContent value="contact" className="p-6 border bg-card border-t-0 rounded-b-md">
            <ContactForm />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
