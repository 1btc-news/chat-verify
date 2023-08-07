import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import {
  accountDataAtom,
  insufficientBalanceToggleAtom,
  sentDustToggleAtom,
  signatureDataAtom,
  signatureMsgAtom,
  stxAddressAtom,
} from "../constants";

export const useClearUserData = () => {
  const setStxAddress = useSetAtom(stxAddressAtom);
  const setAccountData = useSetAtom(accountDataAtom);
  const setSignatureMsg = useSetAtom(signatureMsgAtom);
  const setSignatureData = useSetAtom(signatureDataAtom);
  const setSentDustToggle = useSetAtom(sentDustToggleAtom);
  const setInsufficientBalanceToggle = useSetAtom(
    insufficientBalanceToggleAtom
  );

  const clearData = () => {
    // clear all locally stored data
    setStxAddress(RESET);
    setAccountData(RESET);
    setSignatureMsg(RESET);
    setSignatureData(RESET);
    setSentDustToggle(RESET);
    setInsufficientBalanceToggle(RESET);
  };

  return clearData;
};
