import { create } from 'zustand';
import { Campaign, InstagramCredentials } from '../types';

interface Store {
  campaigns: Campaign[];
  credentials: InstagramCredentials | null;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  setCredentials: (credentials: InstagramCredentials) => void;
}

export const useStore = create<Store>((set) => ({
  campaigns: [],
  credentials: null,
  addCampaign: (campaign) =>
    set((state) => ({ campaigns: [...state.campaigns, campaign] })),
  updateCampaign: (id, updatedCampaign) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign
      ),
    })),
  deleteCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.filter((campaign) => campaign.id !== id),
    })),
  setCredentials: (credentials) => set({ credentials }),
}));
