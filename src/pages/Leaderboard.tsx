import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal } from "lucide-react";

const FAKE_USERS = [
  { name: "Mamadou D.", gigs: 25, ads: 5 },
  { name: "Fatou S.", gigs: 25, ads: 5 },
  { name: "Ousmane N.", gigs: 25, ads: 5 },
  { name: "Aissatou B.", gigs: 10, ads: 3 },
  { name: "Ibrahima K.", gigs: 10, ads: 3 },
  { name: "Mariama T.", gigs: 5, ads: 2 },
  { name: "Cheikh F.", gigs: 5, ads: 2 },
  { name: "Aminata G.", gigs: 2, ads: 1 },
  { name: "Moussa L.", gigs: 2, ads: 1 },
  { name: "Ndèye W.", gigs: 0, ads: 0 },
];

const medalColors = ["text-yellow-500", "text-gray-400", "text-amber-700"];

const Leaderboard = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1 container mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Trophy className="h-8 w-8 text-primary" /> Classement
        </h1>
        <p className="text-muted-foreground">Top utilisateurs GigaBoost</p>
      </div>
      <Card className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <CardContent className="p-0">
          {FAKE_USERS.map((u, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3 ${i < FAKE_USERS.length - 1 ? "border-b" : ""} ${i < 3 ? "bg-primary/5" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-bold text-lg">
                  {i < 3 ? <Medal className={`h-5 w-5 inline ${medalColors[i]}`} /> : i + 1}
                </span>
                <span className="font-medium">{u.name}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-primary">{u.gigs} Go</span>
                <span className="text-xs text-muted-foreground ml-2">({u.ads} pubs)</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
);

export default Leaderboard;
