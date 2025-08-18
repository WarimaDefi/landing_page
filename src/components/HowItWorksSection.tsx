import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Connect & Contribute",
      description:
        "Join the Warima Stokvel with your Web3 wallet or mobile app. Make monthly contributions like traditional stokvels, but powered by blockchain transparency.",
      icon: "🔗",
    },
    {
      step: "02",
      title: "Community Voting",
      description:
        "Vote on which real-world assets to acquire using WARIMA governance tokens. Every member has a voice in investment decisions.",
      icon: "🗳️",
    },
    {
      step: "03",
      title: "Asset Tokenization",
      description:
        "Real assets are digitized into blockchain tokens representing fractional ownership. You receive tokens proportional to your contribution.",
      icon: "🏷️",
    },
    {
      step: "04",
      title: "Automated Returns",
      description:
        "Profits from livestock sales, land rentals, and transportation operations are automatically distributed to your wallet based on token holdings.",
      icon: "💰",
    },
    {
      step: "05",
      title: "AI-Powered Growth",
      description:
        "AI algorithms optimize operations, predict market trends, and suggest strategic investments to maximize community returns.",
      icon: "🤖",
    },
    {
      step: "06",
      title: "Transparent Governance",
      description:
        "All transactions, votes, and distributions are recorded on-chain. Track ROI, proposals, and community decisions in real-time.",
      icon: "📊",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From Stokvel to
            <span className="block bg-gradient-secondary bg-clip-text text-transparent">
              Smart Wealth
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Traditional African collective investment meets cutting-edge blockchain technology
            for transparent, automated wealth building.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group border-l-4 border-l-primary"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{step.icon}</div>
                  <div className="text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                    {step.step}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-primary p-8 rounded-2xl text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Build Generational Wealth?
            </h3>
            <p className="text-xl mb-6 text-white/90">
              Join others already investing in real assets through the Warima DAO
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors">
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors">
                Download Whitepaper
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
