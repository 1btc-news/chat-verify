import { useAuth } from "@micro-stacks/react";
import { useSetAtom } from "jotai";
import {
  accountDataAtom,
  signatureDataAtom,
  signatureMsgAtom,
  stxAddressAtom,
} from "../../constants";
import { Button } from "@chakra-ui/react";
import { RESET } from "jotai/utils";

function ClearData() {
  const { signOut } = useAuth();
  const setStxAddress = useSetAtom(stxAddressAtom);
  const setAccountData = useSetAtom(accountDataAtom);
  const setSignatureMsg = useSetAtom(signatureMsgAtom);
  const setSignatureData = useSetAtom(signatureDataAtom);
  return (
    <Button
      variant="1btc-orange"
      onClick={() => {
        // clear all locally stored data
        setStxAddress(RESET);
        setAccountData(RESET);
        setSignatureMsg(RESET);
        setSignatureData(RESET);
        // sign out of the wallet
        try {
          signOut();
        } catch (error) {
          console.error("Error while signing out: ", error);
        }
      }}
    >
      Clear Data
    </Button>
  );
}

export default ClearData;