import { useAtom } from "jotai";
import {
  accountDataAtom,
  signatureDataAtom,
  stxAddressAtom,
} from "../constants";

export const useActiveStep = () => {
  const [stxAddress] = useAtom(stxAddressAtom);
  const [accountData] = useAtom(accountDataAtom);
  const [signatureData] = useAtom(signatureDataAtom);

  if (!stxAddress) {
    return 0;
  }
  if (!accountData) {
    return 1;
  }
  switch (accountData.status) {
    case "pending":
      return 2; // send dust
    case "valid":
      return 3; // successful verification
    case "insufficient":
      return 4; // insufficient balance
    default:
      if (signatureData) {
        return 2; // send dust
      }
      return 1; // sign msg
  }
};
