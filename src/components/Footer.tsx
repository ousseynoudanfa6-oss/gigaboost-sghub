import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card py-8 mt-12">
    <div className="container mx-auto px-4 text-center space-y-4">
      <div className="flex items-center justify-center gap-2 text-lg font-bold">
        <Zap className="h-5 w-5 text-primary" />
        <span className="text-primary">Giga</span><span>Boost</span>
      </div>
      <p className="text-xs text-muted-foreground max-w-md mx-auto">
        ⚠️ GigaBoost Sénégal est une plateforme promotionnelle indépendante. 
        Ce site n'est pas affilié à Orange, Orange Sénégal ou toute autre entité du groupe Orange.
      </p>
      <div className="flex justify-center gap-6 text-sm text-muted-foreground">
        <a href="#" className="hover:text-primary transition-colors">Conditions</a>
        <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
        <a href="#" className="hover:text-primary transition-colors">Contact</a>
      </div>
      <p className="text-xs text-muted-foreground">© 2026 GigaBoost Sénégal. Tous droits réservés.</p>
    </div>
  </footer>
);

export default Footer;
