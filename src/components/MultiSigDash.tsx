// components/MultiSigDash.tsx
import React, { useState } from 'react';
import { MultiSigTransaction, Stokvel } from '../interfaces/interfaces';
import { shortenAddress } from '@/utils/formatting';
import MultiSigTransactionModal from './MultiSigTransactionModal';

interface MultiSigDashboardProps {
  stokvel: Stokvel;
  currentUser: string;
}

const MultiSigDashboard: React.FC<MultiSigDashboardProps> = ({ stokvel, currentUser }) => {
  const [pendingTransactions, setPendingTransactions] = useState<MultiSigTransaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirmTransaction = async (transactionId: string): Promise<void> => {
    console.log('Confirming transaction:', transactionId);
  };

  const proposeTransaction = async (transactionData: Omit<MultiSigTransaction, 'id' | 'confirmation' | 'executed' | 'proposedAt'>): Promise<void> => {
    console.log('Proposing transaction:', transactionData);
  };

  return (
    <div className="multi-sig-dashboard min-h-screen bg-gradient-to-b from-slate-950 text-gray-100 px-6 py-10">
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Treasury</h2>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          + Propose Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pendingTransactions.length > 0 ? (
          pendingTransactions.map((tx) => (
            <div
              key={tx.id}
              className="transaction-card bg-slate-800/60 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:shadow-accent/30 hover:scale-[1.02] transition-transform"
            >
              <div className="mb-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">To:</span>
                  <span className="font-medium text-foreground">{shortenAddress(tx.recipient)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium text-foreground">{tx.amount} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Proposed by:</span>
                  <span className="font-medium text-foreground">{shortenAddress(tx.proposedBy)}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-muted-foreground mb-1">
                  {tx.confirmations.length}/{stokvel.requiredSignatures} Confirmations
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-accent h-2 transition-all"
                    style={{
                      width: `${(tx.confirmations.length / stokvel.requiredSignatures) * 100}%`,
                    }}
                  ></div>
                </div>

                {!tx.confirmations.includes(currentUser) && !tx.executed && (
                  <button
                    className="mt-4 w-full px-3 py-1.5 text-sm bg-accent text-black rounded-md hover:bg-accent-dark transition-smooth"
                    onClick={() => confirmTransaction(tx.id)}
                  >
                    Confirm
                  </button>
                )}
                {tx.confirmations.includes(currentUser) && (
                  <div className="mt-4 text-center text-xs text-accent">Confirmed</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-10 border border-border rounded-lg">
            <p>No pending transactions</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <MultiSigTransactionModal
          stokvel={stokvel}
          onClose={() => setIsModalOpen(false)}
          onSubmit={proposeTransaction}
        />
      )}
    </div>
  );
};

export default MultiSigDashboard;
