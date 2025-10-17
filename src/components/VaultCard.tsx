function VaultCard() {
  return (
    <div className="vault-card bg-secondary border border-border rounded-xl p-6 mb-6">
      <h2 className="vault-title text-2xl font-bold text-foreground mb-5">Warima Stablecoin Vault</h2>

      <div className="instructions bg-secondary-dark rounded-lg p-5 mb-6">
        <p className="text-foreground mb-3 font-semibold">Join a Stokvel group</p>
        <ol className="list-decimal list-inside space-y-2 text-foreground">
          <li>Get USDC (Ethereum Sepolia) from Vault</li>
          <li>Connect your vaults</li>
          <li>Select Ethereum Sepolia </li>
          <li>Enter USDC amount and click Deposit</li>
          <li>Withdraw your USDC</li>
        </ol>
      </div>
    </div>
  )
}

export default VaultCard;
