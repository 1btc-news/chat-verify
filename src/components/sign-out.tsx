import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";
import { useSetAtom } from "jotai";
import { activeStepAtom, activeStxAddressAtom } from "../constants";

function SignOut() {
  const { signOut } = useAuth();
  const setActiveStxAddress = useSetAtom(activeStxAddressAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  return (
    <Button
      variant="1btc-orange"
      onClick={() => {
        try {
          // sign out of the wallet
          signOut();
          // clear activeStxAddress
          setActiveStxAddress(null);
          setActiveStep(0);
        } catch (error) {
          console.error("Error while signing out: ", error);
        }
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOut;
