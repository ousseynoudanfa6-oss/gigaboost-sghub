import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Zap, Eye, Gift, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const STEPS = [
  { icon: Zap, title: "Créez votre compte", desc: "Inscrivez-vous gratuitement en quelques secondes." },
  { icon: Eye, title: "Regardez des publicités", desc: "Visionnez jusqu'à 5 publicités sponsorisées de 30 secondes." },
  { icon: Gift, title: "Cumulez vos Go", desc: "Chaque publicité débloque un palier de data gratuit." },
  { icon: CheckCircle, title: "Recevez vos Go", desc: "Vos gigas sont crédités sous 72h sur votre ligne." },
];

const FAQS = [
  { q: "Est-ce vraiment gratuit ?", a: "Oui ! Vous regardez des publicités sponsorisées et en échange, vous recevez des données mobiles gratuitement." },
  { q: "Combien de temps faut-il pour recevoir mes Go ?", a: "Le traitement prend en moyenne 72 heures après la validation de toutes les publicités." },
  { q: "GigaBoost est-il affilié à Orange ?", a: "Non, GigaBoost Sénégal est une plateforme promotionnelle totalement indépendante." },
  { q: "Puis-je parrainer des amis ?", a: "Oui ! Partagez votre lien de parrainage depuis votre dashboard et gagnez des bonus." },
];

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const target = 148750;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) { setCounter(target); clearInterval(interval); }
      else setCounter(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
              🚀 Plateforme promotionnelle indépendante
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Gagne jusqu'à <span className="text-primary">25 Go</span><br />de connexion gratuitement
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Regarde jusqu'à 5 publicités sponsorisées et cumule tes gigas valables 30 jours.
            </p>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow" onClick={() => navigate(user ? "/dashboard" : "/register")}>
                Commencer et gagner des Go <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
              ⚠️ Non affilié à Orange. Plateforme indépendante.
            </p>
          </div>
        </section>

        {/* Counter */}
        <section className="py-12 bg-card border-y">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">Go distribués à ce jour</p>
            <p className="text-5xl md:text-7xl font-extrabold text-primary animate-count-up">
              {counter.toLocaleString("fr-FR")}
            </p>
            <p className="text-sm text-muted-foreground mt-2">et ça continue...</p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {STEPS.map((step, i) => (
                <div key={i} className="text-center space-y-3 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-sm font-bold text-primary">Étape {i + 1}</div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-bold text-center mb-8">Questions fréquentes</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Sponsors */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold text-muted-foreground mb-8">Nos partenaires</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
              {["Sponsor A", "Sponsor B", "Sponsor C", "Sponsor D"].map((s) => (
                <div key={s} className="w-32 h-12 rounded bg-muted flex items-center justify-center text-sm font-medium">{s}</div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
