"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, KeyRound } from "lucide-react";

export function Tracking() {
  const [accessCode, setAccessCode] = useState("");
  const [trackingResult, setTrackingResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode) return;

    setIsLoading(true);
    setTrackingResult("");
    
    // Simula uma busca de status
    setTimeout(() => {
      if(accessCode.toLowerCase() === "filho-seguro") {
        setTrackingResult(`A van com Lucas S. está a caminho da escola. Previsão de chegada: 07:25.`);
      } else {
        setTrackingResult(`Código de acesso inválido.`);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section id="tracking" className="py-16 sm:py-24 bg-background">
      <div className="container max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Área dos Pais</CardTitle>
            <CardDescription>Insira o código de acesso para acompanhar o trajeto.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="Insira o código de acesso"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="text-center sm:text-left"
                aria-label="Código de Acesso"
              />
              <Button type="submit" className="w-full sm:w-auto" disabled={isLoading || !accessCode}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <KeyRound className="mr-2 h-4 w-4" />
                )}
                Acessar
              </Button>
            </form>
            {trackingResult && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg flex items-center gap-4 border border-primary/20">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <p className="text-foreground">{trackingResult}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
