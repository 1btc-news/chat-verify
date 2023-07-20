import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";
import { useSetAtom } from "jotai";
import { activeStepAtom, stxAddressAtom } from "../constants";

function SignIn() {
  const { openAuthRequest, isRequestPending } = useAuth();
  const setStxAddress = useSetAtom(stxAddressAtom);
  const setActiveStep = useSetAtom(activeStepAtom);

  return (
    <Button
      variant="1btc-orange"
      isLoading={isRequestPending}
      onClick={() =>
        void openAuthRequest({
          onFinish: (session) => {
            setStxAddress(session.addresses.mainnet);
            setActiveStep(1);
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
