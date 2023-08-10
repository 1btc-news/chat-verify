import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import {
  accountDataAtom,
  isBtcDesignatedAtom,
  signatureDataAtom,
  signatureMsgAtom,
  stxAddressAtom,
} from "../constants";

export const useClearUserData = () => {
  const setStxAddress = useSetAtom(stxAddressAtom);
  const setIsBtcDesignated = useSetAtom(isBtcDesignatedAtom);
  const setAccountData = useSetAtom(accountDataAtom);
  const setSignatureMsg = useSetAtom(signatureMsgAtom);
  const setSignatureData = useSetAtom(signatureDataAtom);

  const clearData = () => {
    // clear all locally stored data
    setStxAddress(RESET);
    setIsBtcDesignated(false);
    setAccountData(RESET);
    setSignatureMsg(RESET);
    setSignatureData(RESET);
  };

  return clearData;
};
