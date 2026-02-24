import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, Loader2 } from "lucide-react";

const Congratulations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hours, setHours] = useState(72);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) return s - 1;
        setMinutes((m) => {
          if (m > 0) return m - 1;
          setHours((h) => Math.max(0, h - 1));
          return 59;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg text-center animate-scale-in">
          <CardContent className="p-8 space-y-6">
            {/* Animated checkmark */}
            <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <svg viewBox="0 0 52 52" className="w-16 h-16">
                <circle cx="26" cy="26" r="24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2" opacity="0.3" />
                <path className="animate-checkmark" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l8 8 16-16" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold">🎉 Félicitations !</h1>
            <p className="text-lg text-muted-foreground">
              Votre demande de <span className="font-bold text-primary">25 Go</span> est en cours de traitement.
            </p>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin-slow text-primary" />
              <span>Traitement en cours...</span>
            </div>

            {/* Countdown */}
            <div className="rounded-xl bg-muted p-6">
              <p className="text-sm text-muted-foreground mb-3">Temps d'attente estimé</p>
              <div className="flex justify-center gap-4">
                {[
                  { val: hours, label: "Heures" },
                  { val: minutes, label: "Minutes" },
                  { val: seconds, label: "Secondes" },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-3xl font-mono font-bold text-primary animate-count-up">{String(val).padStart(2, "0")}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Veuillez patienter <strong>72 heures</strong>. Notre équipe vous recontactera pour confirmation.
            </p>

            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Retour au dashboard
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Congratulations;
