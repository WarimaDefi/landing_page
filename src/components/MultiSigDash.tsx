// components/MultiSigDashboard.tsx
import React, { useState } from 'react';
import { MultiSigTransaction, Stokvel } from '../interfaces/interfaces';

interface MultiSigDashboardProps {
  stokvel: Stokvel;
  currentUser: string;
}

const MultiSigDashboard: React.FC<MultiSigDashboardProps> = ({ stokvel, currentUser }) => {
  const [pendingTransactions, setPendingTransactions] = useState<MultiSigTransaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirmTransaction = async (transactionId: string): Promise<void> => {
    //Implement confirmation logic
    console.log('Confirming transaction:', transactionId);
  };

  const proposeTransaction = async (transactionData: Omit<MultiSigTransaction, 'id' | 'confirmation' | 'executed' | 'proposedAt'>): Promise<void> => {
    // Implement proposal logic
    console.log('Proposal transaction:', tranasctionData);
  };

  return (
    <div className="multi-sig-dashboard">
      <div className="wallet-header">
        <h2>Stokvel Trasury</h2>
        <div className="wallet-info">
          <div className="balance">
            <span className="label">Treasury Balance:</span>
            <span className="value">{stokvel.balance} ETH</span>
          </div>
          <div className="threshold">
            <span className="label">Signature Required:</span>
            <span className="value">{stokvel.requiredSignatures}/{stokvel.members.length}</span>
          </div>
        </div>
      </div>

      <div className="transaction-section">
        <div className="section-header">
          <h3>Pending Transactions</h3>
          <button
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Propose Transaction
          </button>
        </div>

        <div className="transactions-list">
          {pendingTransactions.map((tx: MultiSigTransaction) =>(
            <TransactionCard
              key={tx.id}
              transaction={tx}
              currentUser={currentUser}
              onConfirm={confirmTransaction}
            />
          ))}
          {pendingTransactions.length === 0 && (
            <div className="empty-state">
              <p>No pending transactions</p>
            </div>
          )}
        </div>
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

interface TransactionCardProps {
  transaction: MultiSigTransaction;
  currentUser: string;
  onConfirm: (transactionId: string) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, currentUser, onConfirm }) => {
  const hasConfirmed = transaction.confirmation.include(currentUser);
  const confirmationProgress = (transaction.confirmations.length / transaction.requiredSignatures) * 100;

  return (
    <div className="transaction-card">
      <div className="tx-info">
        <div className="tx-description">{transaction.description}</div>
        <div className="tx-amount">{transaction.amount} ETH</div>
        <div className="tx-recipient">To: {shortAddress(transaction.recipient)}</div>
        <div className="tx-proposer">Proposed by: {shortAddress(transaction.proposedBy)}</div>
      </div>
      <div className="tx-actions">
        <div className="signature-progress">
          <span>
            {transaction.confirmations.length}/{transaction.requiredSignatures} Confirmations
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${confirmationProgress}%` }}
            ></div>
          </div>
        </div>
        {!hasConfirmed && !transaction.executed && (
          <button
            className="btn-confirm"
            onClick={() => onConfirm(transaction.id)}
          >
            Confirm
          </button>
        )}
        {hasConfirmed && (
          <span className="confirmed-badge">Confirmed</span>
        )}
      </div>
    </div>
  );
};

export default MultiSigDashboard;
