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
      roi: "18-25%",
      minInvestment: "R1,500",
      features: ["IoT Health Monitoring", "Automated Feed Systems", "Market Integration", "Insurance Coverage"]
    },
    {
      title: "Land Development",
      description: "Pool resources to acquire prime agricultural and urban development land across South Africa.",
      image: landImage,
      roi: "22-35%",
      minInvestment: "R5,000",
      features: ["Prime Locations", "Development Rights", "Rental Income", "Capital Appreciation"]
    },
    {
      title: "Transport & Logistics",
      description: "Own shares in commercial vehicles and logistics operations serving growing African markets.",
      image: transportImage,
      roi: "15-28%",
      minInvestment: "R8,000",
      features: ["GPS Tracking", "Route Optimization", "Maintenance Included", "Driver Training"]
    }
  ];

  return (
    <section id="assets" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Real Assets, Real Returns
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Invest in tangible African assets that generate sustainable income while building
            generational wealth for our communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {assets.map((asset, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
               <div className="relative h-48 overflow-hidden">
                 <img
                   src={asset.image}
                   alt={asset.title}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                 />
                 <div className="absolute top-4 right-4 bg-tertiary text-tertiary-foreground px-3 py-1 rounded-full font-semibold">
                   {asset.roi} ROI
                 </div>
               </div>

                 <CardHeader>
                   <CardTitle className="text-2xl font-bold">{asset.title}</CardTitle>
                   <CardDescription className="text-base">{asset.description}</CardDescription>
                 </CardHeader>

                 <CardContent>
                   <div className="mb-6">
                     <div className="flex justify-between items-center mb-4">
                       <span className="text-sm text-muted-foreground">Minimum Contribution</span>
                       <span className="font-semibold text-primary">{asset.minInvestment}</span>
                     </div>

                     <div className="space-y-2">
                       <span className="text-sm font-medium">Key Features:</span>
                       <ul className="text-sm text-muted-foreground space-y-1">
                         {asset.features.map((feature, idx) => (
                           <li key={idx} className="flex items-center">
                             <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                             {feature}
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>

                   <Button variant="default" className="w-full">
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
