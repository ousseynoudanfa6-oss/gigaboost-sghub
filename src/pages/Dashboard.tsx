import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProgress, AD_TIERS } from "@/contexts/UserProgressContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Confetti from "@/components/Confetti";
import { Play, CheckCircle, Clock, Trophy, Gift, History, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AD_LINKS = [
  "https://www.google.com",
  "https://www.youtube.com",
  "https://www.wikipedia.org",
  "https://www.github.com",
  "https://www.reddit.com",
];

const Dashboard = () => {
  const { user } = useAuth();
  const { progress, watchAd, currentGigs } = useUserProgress();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [showConfetti, setShowConfetti] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  useEffect(() => {
    if (progress.completed) navigate("/congratulations");
  }, [progress.completed]);

  const startAd = () => {
    const idx = progress.adsWatched;
    if (idx >= 5) return;
    window.open(AD_LINKS[idx % AD_LINKS.length], "_blank");
    setTimerActive(true);
    setSecondsLeft(30);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const validateAd = () => {
    setTimerActive(false);
    watchAd();
    const newCount = progress.adsWatched + 1;
    const tier = AD_TIERS.find((t) => t.ads === newCount);
    if (tier) {
      toast({ title: `🎉 ${tier.gigs} Go débloqués !`, description: `Vous avez regardé ${newCount} publicité(s).` });
    }
    if (newCount >= 5) {
      setShowConfetti(true);
    }
  };

  if (!user) return null;

  const progressPercent = (progress.adsWatched / 5) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Confetti show={showConfetti} />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue, {user.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3"><Play className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">{progress.adsWatched}/5</p>
                <p className="text-sm text-muted-foreground">Publicités vues</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3"><Gift className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">{currentGigs} Go</p>
                <p className="text-sm text-muted-foreground">Gagnés</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3"><Users className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">{progress.referrals}</p>
                <p className="text-sm text-muted-foreground">Filleuls</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /> Progression</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progressPercent} className="h-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AD_TIERS.map((tier) => (
                <div key={tier.ads} className={`rounded-lg border p-3 text-center transition-all ${progress.adsWatched >= tier.ads ? "border-primary bg-primary/5" : "opacity-60"}`}>
                  <p className="font-bold text-lg">{tier.gigs} Go</p>
                  <p className="text-xs text-muted-foreground">{tier.ads} pub{tier.ads > 1 ? "s" : ""}</p>
                  {progress.adsWatched >= tier.ads && <CheckCircle className="h-4 w-4 text-primary mx-auto mt-1" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Watch Ad */}
        {progress.adsWatched < 5 && (
          <Card className="animate-fade-in border-primary/30" style={{ animationDelay: "0.3s" }}>
            <CardHeader><CardTitle>🎬 Regarder une publicité</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {!timerActive ? (
                <Button onClick={startAd} className="w-full animate-pulse-glow" size="lg">
                  <Play className="mr-2 h-5 w-5" /> Lancer la publicité #{progress.adsWatched + 1}
                </Button>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-5 w-5 text-primary animate-spin-slow" />
                    <span className="text-2xl font-mono font-bold">{secondsLeft}s</span>
                  </div>
                  <Progress value={((30 - secondsLeft) / 30) * 100} className="h-3" />
                  <p className="text-sm text-muted-foreground">Veuillez patienter avant de valider...</p>
                  <Button onClick={validateAd} disabled={secondsLeft > 0} size="lg" className="w-full">
                    <CheckCircle className="mr-2 h-5 w-5" /> Valider la publicité
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {progress.adsWatched >= 5 && (
          <Card className="border-primary bg-primary/5 animate-fade-in">
            <CardContent className="p-6 text-center space-y-2">
              <Badge className="text-lg px-4 py-1">🏆 Champion GigaBoost</Badge>
              <p className="text-muted-foreground">Vous avez complété toutes les publicités !</p>
            </CardContent>
          </Card>
        )}

        {/* Referral */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Parrainage</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Partagez votre lien et gagnez des bonus :</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded bg-muted px-3 py-2 text-sm break-all">
                {window.location.origin}?ref={progress.referralCode}
              </code>
              <Button variant="outline" size="sm" onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}?ref=${progress.referralCode}`);
                toast({ title: "Lien copié !" });
              }}>Copier</Button>
            </div>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <CardHeader><CardTitle className="flex items-center gap-2"><History className="h-5 w-5 text-primary" /> Historique</CardTitle></CardHeader>
          <CardContent>
            {progress.history.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucune publicité visionnée pour le moment.</p>
            ) : (
              <div className="space-y-2">
                {progress.history.map((entry, i) => (
                  <div key={i} className="flex justify-between items-center rounded bg-muted/50 px-3 py-2 text-sm">
                    <span>Publicité #{entry.adIndex}</span>
                    <span className="text-muted-foreground">{new Date(entry.timestamp).toLocaleString("fr-FR")}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
