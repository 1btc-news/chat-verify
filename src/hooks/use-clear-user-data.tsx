import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import {
  accountDataAtom,
  signatureDataAtom,
  signatureMsgAtom,
  stxAddressAtom,
} from "../constants";

export const useClearUserData = () => {
  const setStxAddress = useSetAtom(stxAddressAtom);
  const setAccountData = useSetAtom(accountDataAtom);
  const setSignatureMsg = useSetAtom(signatureMsgAtom);
  const setSignatureData = useSetAtom(signatureDataAtom);

  const clearData = () => {
    // clear all locally stored data
    setStxAddress(RESET);
    setAccountData(RESET);
    setSignatureMsg(RESET);
    setSignatureData(RESET);
  };

  return clearData;
};
