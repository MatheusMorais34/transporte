"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { optimizeRoute, type TourPlanningOutput } from "@/ai/flows/route-optimization";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Route, DollarSign, Clock, Search, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  destination: z.string().min(3, "Destino é obrigatório."),
  passengers: z.coerce.number().positive("Número de passageiros deve ser positivo."),
  interests: z.string().min(5, "Descreva seus interesses."),
});

export function RouteOptimizer() {
  const [result, setResult] = useState<TourPlanningOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      passengers: 4,
      interests: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      // O nome da função foi mantido como 'optimizeRoute', mas a lógica é de planejamento de passeio.
      const output = await optimizeRoute(data);
      setResult(output);
    } catch (error) {
      console.error("Falha no planejamento de passeio:", error);
      toast({
        variant: "destructive",
        title: "Falha no Planejamento",
        description: "Não foi possível gerar um roteiro. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="optimize" className="py-16 sm:py-24">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="font-headline text-3xl font-bold sm:text-4xl">Planeje seu Passeio com IA</h2>
          <p className="text-lg text-muted-foreground">
            Diga-nos seu destino, número de pessoas e interesses, e nossa IA criará um roteiro exclusivo para você, com estimativa de custo e duração.
          </p>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Crie seu Roteiro Ideal</CardTitle>
            <CardDescription>Preencha os detalhes abaixo.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destino</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Centro Histórico" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passengers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nº de Passageiros</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 4" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quais seus interesses?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Ex: Museus, parques, gastronomia local..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Planejando..." : <><Wand2 className="mr-2 h-4 w-4" /> Planejar Passeio</>}
                </Button>
              </CardFooter>
            </form>
          </Form>

          {result && (
            <div className="p-6 pt-0">
              <Card className="bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Sugestão de Roteiro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Route className="h-5 w-5 mt-1 text-primary shrink-0" />
                    <div>
                      <h4 className="font-semibold">Roteiro Sugerido</h4>
                      <p className="text-muted-foreground">{result.suggestedItinerary}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <DollarSign className="h-5 w-5 mt-1 text-primary shrink-0" />
                    <div>
                      <h4 className="font-semibold">Custo Estimado</h4>
                      <p className="text-muted-foreground">R$ {result.estimatedCost.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 mt-1 text-primary shrink-0" />
                    <div>
                      <h4 className="font-semibold">Duração do Passeio</h4>
                      <p className="text-muted-foreground">{result.tourDuration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
