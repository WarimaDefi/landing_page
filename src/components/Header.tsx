import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {
  return (
    <div className="header flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-foreground">Sepolia Stablecoin Vault</h1>
      <ConnectButton 
        showBalance={false}
        accountStatus="address"
        chainStatus="icon"
      />
    </div>
  );
}

export default Header;
