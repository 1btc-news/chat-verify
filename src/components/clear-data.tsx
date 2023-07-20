import { useAuth } from "@micro-stacks/react";
import { useSetAtom } from "jotai";
import {
  activeStepAtom,
  signatureDataAtom,
  stxAddressAtom,
} from "../constants";
import { Button } from "@chakra-ui/react";

function ClearData() {
  const { signOut } = useAuth();
  const setActiveStxAddress = useSetAtom(stxAddressAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  const setSignatureData = useSetAtom(signatureDataAtom);
  return (
    <Button
      variant="1btc-orange"
      onClick={() => {
        // clear all locally stored data
        setActiveStxAddress(null);
        setActiveStep(0);
        setSignatureData(null);
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
