// components/VaultCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Coins, Wallet, BarChart3, Unlock } from "lucide-react";

function VaultCard() {
  const steps = [
    {
      icon: <Users className="w-9 h-5 text-blue-400" />,
      title: "1) Create a Stokvel",
      text: "Start a digital stokvel for land, livestock, or haulage. Set your goal, duration, and members — smart contracts handle the rest.",
    },
    {
      icon: <Coins className="w-9 h-5 text-yellow-400" />,
      title: "3) Earn WZR Tokens",
      text: "Each contribution rewards you with WZR — your stake in Warima’s DAO for voting, rewards, and growth.",
    },
    {
      icon: <Wallet className="w-9 h-5 text-emerald-400" />,
      title: "2) Contribute Seamlessly",
      text: "Pay with crypto or local currency. Every transaction is transparent and secured on-chain.",
    },
    {
      icon: <BarChart3 className="w-9 h-5 text-purple-400" />,
      title: "4) Grow Your Value",
      text: "Your stokvel funds power Warima projects — farms, livestock, and logistics — generating shared income.",
    },
    {
      icon: <Unlock className="w-9 h-5 text-pink-400" />,
      title: "5) Withdraw or Reinvest",
      text: "At term end, withdraw in WZR, stablecoins, or cash — or reinvest to grow your impact.",
    },
  ];

  return (
    <Card className="vault-card bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-md hover:shadow-accent/30 transition-all duration-300">
      {/* Header */}
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl md:text-3xl font-bold text-primary-foreground">
          Warima Vault
        </CardTitle>
        <p className="text-slate-300 text-sm mt-2">
          Manage your Stokvel vaults, earn WZR rewards, and grow your decentralized savings.
        </p>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6">

        {/* DAO Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start bg-slate-900/60 p-4 rounded-xl border border-slate-700 hover:border-accent/50 transition duration-300"
            >
              <div className="mr-3 mt-1">{step.icon}</div>
              <div>
                <p className="text-primary-foreground font-semibold text-sm md:text-base">
                  {step.title}
                </p>
                <p className="text-slate-400 text-xs md:text-sm mt-1">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default VaultCard;
