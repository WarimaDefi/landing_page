// components/AssetsSection.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import livestockImage from "/assets/livestockfarming.jpg";
import landImage from "/assets/landImage.jpg";
import transportImage from "/assets/transport-investment.jpg";

const AssetsSection = () => {
  const assets = [
    {
      title: "Livestock Farming",
      description: "Invest in pig farming operations with automated profit distribution and IoT monitoring.",
      image: livestockImage,
      roi: "18–25%",
      minInvestment: "R1,500",
      features: [
        "IoT Health Monitoring",
        "Automated Feed Systems",
        "Market Integration",
        "Insurance Coverage",
      ],
    },
    {
      title: "Land Development",
      description: "Pool resources to acquire prime agricultural and urban development land across South Africa.",
      image: landImage,
      roi: "22–35%",
      minInvestment: "R5,000",
      features: [
        "Prime Locations",
        "Development Rights",
        "Rental Income",
        "Capital Appreciation",
      ],
    },
    {
      title: "Transport & Logistics",
      description: "Own shares in commercial vehicles and logistics operations serving growing African markets.",
      image: transportImage,
      roi: "15–28%",
      minInvestment: "R8,000",
      features: [
        "GPS Tracking",
        "Route Optimization",
        "Maintenance Included",
        "Driver Training",
      ],
    },
  ];

  return (
    <section
      id="assets"
      className="py-20 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 text-gray-100"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Real Assets, Real Returns
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Invest in tangible African assets that generate sustainable income while
            building generational wealth for our communities.
          </p>
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {assets.map((asset, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 shadow-md hover:shadow-accent/30 hover:scale-[1.02] transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={asset.image}
                  alt={`${asset.title} investment opportunity`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 right-4 bg-tertiary text-tertiary-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow">
                  {asset.roi} ROI
                </div>
              </div>

              {/* Card Header */}
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-primary-foreground">
                  {asset.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {asset.description}
                </CardDescription>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="pt-4 space-y-6">
                {/* Investment Details */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-muted-foreground">Minimum Contribution</span>
                    <span className="font-semibold text-primary">{asset.minInvestment}</span>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-foreground">Key Features</span>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {asset.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant="default"
                  className="w-full font-semibold transition-colors duration-200"
                  aria-label={`Join Warima ${asset.title}`}
                >
                  Join Warima
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssetsSection;
