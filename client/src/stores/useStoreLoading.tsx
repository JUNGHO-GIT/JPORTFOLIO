// useStoreLoading.tsx

import { create } from "@exportLibs";

// -------------------------------------------------------------------------------------------------
declare type LoadingState = {
  LOADING: boolean;
  setLOADING: (loading: boolean) => void;
}

// -------------------------------------------------------------------------------------------------
export const useStoreLoading = create<LoadingState>((set) => ({
  LOADING: false,
  setLOADING: (loading) => set({ LOADING: loading })
}));