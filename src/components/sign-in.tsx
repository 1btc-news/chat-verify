import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";
import { useAtom, useSetAtom } from "jotai";
import {
  activeStepAtom,
  signatureDataAtom,
  stxAddressAtom,
} from "../constants";

function SignIn() {
  const { openAuthRequest, isRequestPending } = useAuth();
  const [stxAddress, setStxAddress] = useAtom(stxAddressAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  const setSignatureData = useSetAtom(signatureDataAtom);

  return (
    <Button
      variant="1btc-orange"
      isLoading={isRequestPending}
      onClick={() =>
        void openAuthRequest({
          onFinish: (session) => {
            if (session.addresses.mainnet !== stxAddress) {
              setStxAddress(session.addresses.mainnet);
              setActiveStep(1);
              setSignatureData(null);
            }
          },
          onCancel: () => {
            console.log("User cancelled auth request");
          },
        })
      }
    >
      Connect Wallet
    </Button>
  );
}

export default SignIn;
