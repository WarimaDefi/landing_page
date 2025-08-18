import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      title: "Stokvel-Native Design",
      description:
        "Built around African collective finance culture with familiar monthly contributions and community decision-making.",
      icon: "🤝",
      color: "primary",
    },
    {
      title: "Real Asset Backing",
      description:
        "Not just a digital token – every contribution represents actual livestock, land, or transport vehicles generating real income.",
      icon: "🏗️",
      color: "secondary",
    },
    {
      title: "Diaspora Inclusion",
      description:
        "Enable global African communities to invest back home through secure, transparent blockchain technology.",
      icon: "🌍",
      color: "tertiary",
    },
    {
      title: "AI-Powered Insights",
      description:
        "Smart algorithms analyze market trends, optimize operations, and provide investment recommendations.",
      icon: "🧠",
      color: "primary",
    },
    {
      title: "IoT Integration",
      description:
        "Real-time monitoring of livestock, crop production, vehicle performance, and construction progress through connected sensors.",
      icon: "📡",
      color: "secondary",
    },
    {
      title: "DeFi Integration",
      description:
        "Access staking, lending, and insurance products to maximize returns and protect contributions.",
      icon: "⚡",
      color: "tertiary",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Warima?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The first blockchain platform designed specifically for African communities,
            combining traditional wisdom with modern technology.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="text-center pb-4">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">Transparent Operations</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-secondary">24/7</div>
            <div className="text-sm text-muted-foreground">Asset Monitoring</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-tertiary">R0</div>
            <div className="text-sm text-muted-foreground">Hidden Fees</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">∞</div>
            <div className="text-sm text-muted-foreground">Growth Potential</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
