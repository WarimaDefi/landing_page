// components/VaultCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function VaultCard() {
  return (
    <Card className="vault-card bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-md hover:shadow-accent/30 transition-all duration-300">
      {/* Header */}
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl md:text-3xl font-bold text-primary-foreground">
          Warima Stablecoin Vault
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6">
        <div className="instructions bg-slate-900/70 backdrop-blur-sm rounded-xl p-5">
          <p className="text-primary-foreground font-semibold mb-3 text-lg">
            Join a Stokvel group
          </p>
          <ol className="list-decimal list-inside space-y-2 text-primary-foreground text-base md:text-lg">
            <li>Get USDC (Ethereum Sepolia) from Vault</li>
            <li>Connect your vaults</li>
            <li>Select Ethereum Sepolia</li>
            <li>Enter USDC amount and click Deposit</li>
            <li>Withdraw your USDC</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}

export default VaultCard;
