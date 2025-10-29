import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';

function TransactionSection() {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState<string>('');
  const [activePercentage, setActivePercentage] = useState<number | null>(null);

  //Mock USDC balance - in real life fetch from contract
  const { data: usdcBalance } = useBalance({
    address: address,
    token: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // Sepolia USDC address
    chainId: 11155111, // Sepolia chain ID
  });

  const mockTransactions = [
    {date: '2023-10-15', type: 'deposit', amount: '25%'},
    {date: '2023-10-10', type: 'deposit', amount: '50%'},
    {date: '2023-10-05', type: 'withdraw', amount: '10%'},
  ];

  const handlePercentageClick = (percentage: number): void => {
    setActivePercentage(percentage);
    if (usdcBalance) {
      const calculateAmount = (parseFloat(usdcBalance.formatted) * percentage / 100).toFixed(2);
      setAmount(calculateAmount);
    }
  };

  const handleDeposit = (): void => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    alert(`Depositing ${amount} USDC`);
    setAmount('');
    setActivePercentage(null);
  };

  const handleWithdraw = (): void => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    alert(`Withdrawing ${amount} USDC`);
    setAmount('');
    setActivePercentage(null);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setAmount(value);
    if (activePercentage !== null) {
      setActivePercentage(null);
    }
  };

  if (!isConnected) {
    return (
      <div className="deposit-section rounded-xl p-6 text-center">
        <h3 className="section-title text-xl font-semibold text-primary-foreground mb-5">0x73dc_3387</h3>
        <p className="text-primary-foreground/80">Please connect your wallet to interact with the vault</p>
      </div>
    );
  }

  return (
    <div className="deposit-section min-h-screen bg-gradient-to-b from-slate-950 to-slate-950 text-gray-100 px-6 py-10">
        <div className="deposit-section bg-gradient-to-b from-slate-950 to-slate-950 text-gray-100 px-6 py-10">
          <div className="">
            <div>
              <div className="input-label text-primary-foreground/80 text-sm">Your Wallet:</div>
              <div className="wallet-address font-mono text-primary-foreground/90 text-sm">
            {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
            </div>
              <div>
              <div className="input-label text-primary-foreground/8- text-sm">USDC Balance:</div>
              <div className="balance text-primary-foreground font-semibold">
            {usdcBalance ? `${parseFloat(usdcBalance.formatted).toFixed(2)} USDC` : 'Loading...'}
              </div>
            </div>
          </div>

      <div className="input-group mb-5">
        <label className="">Amount (USDC)</label>
        <input
          type="number"
          className=""
          placeholder="Enter Amount"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          step="0.01"
        />

        <div className="percentage-buttons flex gap-2 mt-3">
          {[25, 50, 75, 100].map((percentage) => (
            <button
              key={percentage}
              className={`percentage-btn flex-1 py-2 px-3 rounded border transition-colors ${
                activePercentage === percentage 
                  ? 'bg-primary-foreground text-primary border-primary-foreground' 
                  : 'bg-primary-dark border-primary-dark text-primary-foreground hover:bg-primary-dark/80'
              }`}
              onClick={() => handlePercentageClick(percentage)}
              type="button"
            >
              {percentage}%
            </button>
          ))}
        </div>

    </div>
      <div className="action-buttons flex gap-4 mt-6">
        <button
          className="btn deposit-btn flex-1 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
          onClick={handleDeposit}
        >
          Contribute
        </button>
        <button
          className="btn withdraw-btn flex-1 py-3 bg-transparent border border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
          onClick={handleWithdraw}
        >
          Withdraw
        </button>
      </div>

      <div className="history-section mt-8">
        <h4 className="history-title text-primary-foreground/80 text-lg mb-4">History</h4>
          {mockTransactions.map((transaction, index) => (
            <div key={index} className="history-item flex justify-between items-center py-3 border-b border-primary-dark">
              <span className="history-date text-primary-foreground">{transaction.date}</span>
              <span className="history-amount text-primary-foreground font-semibold">
                {transaction.type === 'deposit' ? 'Deposit' : 'Withdraw'}: {transaction.amount}
              </span>
            </div>
          ))}
      </div>
    </div>
      </div>
  );
}

export default TransactionSection;
