// useStoreConfirm.tsx

import { create } from "src/exports/ExportLibs";

// -------------------------------------------------------------------------------------------------
declare type ConfirmState = {
  CONFIRM: {
    open: boolean;
    msg: string;
    callback?: (confirmed: boolean) => void;
  };
  setCONFIRM: (
    payload: Partial<ConfirmState['CONFIRM']>,
    callback?: (confirmed: boolean) => void
  ) => void;
}

// -------------------------------------------------------------------------------------------------
export const useStoreConfirm = create<ConfirmState>((set) => ({
  CONFIRM: {
    open: false,
    msg: '',
    callback: undefined,
  },
  setCONFIRM: (payload, callback) => {
    set((state) => ({
      CONFIRM: {
        ...state.CONFIRM,
        ...payload,
        callback: callback || state.CONFIRM.callback,
      },
    }));
  },
}));