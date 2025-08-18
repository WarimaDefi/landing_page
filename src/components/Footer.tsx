const Footer = () => {
  return (
    <footer className="bg-earth text-earth-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
              <span className="text-3xl font-bold text-white">
                Warima
              </span>
            </div>
            <p className="text-earth-foreground/80 max-w-md mb-6 leading-relaxed">
              Empowering African communities to build generational wealth through
              blockchain-powered collective investment in real-world assets.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-earth-foreground/60 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span> 🐦
              </a>
              <a href="#" className="text-earth-foreground/60 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span> 💼
              </a>
              <a href="#" className="text-earth-foreground/60 hover:text-white transition-colors">
                <span className="sr-only">WhatsApp</span> 📱
              </a>
              <a href="#" className="text-earth-foreground/60 hover:text-white transition-colors">
                <span className="sr-only">Discord</span> 💬
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-earth-foreground/80 hover:text-white transition-colors">About</a></li>
              <li><a href="#assets" className="text-earth-foreground/80 hover:text-white transition-colors">Assets</a></li>
              <li><a href="#how-it-works" className="text-earth-foreground/80 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#governance" className="text-earth-foreground/80 hover:text-white transition-colors">Governance</a></li>
              <li><a href="#whitepaper" className="text-earth-foreground/80 hover:text-white transition-colors">Whitepaper</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-earth-foreground/80 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-earth-foreground/80 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-earth-foreground/80 hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="text-earth-foreground/80 hover:text-white transition-colors">Legal</a></li>
              <li><a href="#" className="text-earth-foreground/80 hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-earth-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-earth-foreground/60 text-sm mb-4 md:mb-0">
            © 2025 Warima. All rights reserved. Building the future of African wealth.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-earth-foreground/60 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-earth-foreground/60 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-earth-foreground/60 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
