// components/StokvelManagement.tsx
import React from 'react';
import { Stokvel } from '../../interfaces/interfaces';
import { shortenAddress } from "@/utils/formatting";

interface StokvelManagementProps {
  stokvels: Stokvel[];
  onSelectStokvel: (stokvel: Stokvel) => void;
  onNavigate: (view: string) => void;
  onCreateStokvel: () => void;
}

const StokvelManagement: React.FC<StokvelManagementProps> = ({
  stokvels,
  onSelectStokvel,
  onNavigate,
  onCreateStokvel
}) => {
  return (
    <div className="stokvel-management space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold tracking-tight">My Stokvels</h2>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
          onClick={onCreateStokvel}
        >
          + Create New Stokvel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stokvels.length > 0 ? (
          stokvels.map((stokvel) => (
            <StokvelCard
              key={stokvel.address}
              stokvel={stokvel}
              onSelectStokvel={onSelectStokvel}
              onNavigate={onNavigate}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-10 border rounded-lg">
            <p>No Stokvels found. Create your first stokvel to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface StokvelCardProps {
  stokvel: Stokvel;
  onSelectStokvel: (stokvel: Stokvel) => void;
  onNavigate: (view: string) => void;
}

const StokvelCard: React.FC<StokvelCardProps> = ({ stokvel, onSelectStokvel, onNavigate }) => (
  <div className="stokvel-card border rounded-lg p-5 bg-card shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-semibold">{stokvel.name}</h3>
      <span className="text-xs text-muted-forground">
        {shortenAddress(stokvel.address)}
      </span>
    </div>

    <div className="space-y-1 text-sm text-muted-foreground mb-4">
      <DetailItem label="Members:" value={stokvel.members.length.toString()} />
      <DetailItem
        label="Signatures:"
        value={`${stokvel.requiredSignatures}/${stokvel.members.length}`}
      />
      <DetailItem label="Treasury:" value={`${stokvel.balance} ETH`} />
      <DetailItem label="Cycle:" value={`${stokvel.cycleDuration} days`} />
    </div>

    <div className="flex flex-wrap gap-2">
      <button
        className="px-3 py-1.5 text-sm bg-muted rounded-md hover:bg-muted/80"
        onClick={() => {
          onSelectStokvel(stokvel);
          onNavigate("overview");
        }}
      >
        Overview
      </button>
      <button
        className="px-3 py-1.5 text-sm bg-muted rounded-md hover:bg-muted/80"
        onClick={() => {
          onSelectStokvel(stokvel);
          onNavigate("overview");
        }}
      >
        Governance
      </button>
      <button
        className="px-3 py-1.5 text-sm bg-muted rounded-md hover:bg-muted/80"
        onClick={() => {
          onSelectStokvel(stokvel);
          onNavigate("multi-sig");
        }}
      >
        Treasury
      </button>
    </div>
  </div>
);

interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span className="font-medium text-foreground">{value}</span>
  </div>
);

export default StokvelManagement;
