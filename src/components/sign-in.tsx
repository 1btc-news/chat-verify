import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";
import { useAtom, useSetAtom } from "jotai";
import {
  activeStepAtom,
  activeStxAddressAtom,
  storedUserDataAtom,
} from "../constants";

function SignIn() {
  const { openAuthRequest, isRequestPending } = useAuth();
  const setStxAddress = useSetAtom(activeStxAddressAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  const setStoredUserData = useSetAtom(storedUserDataAtom);

  return (
    <Button
      variant="1btc-orange"
      isLoading={isRequestPending}
      onClick={() =>
        void openAuthRequest({
          onFinish: (session) => {
            setStxAddress(session.addresses.mainnet);
            setActiveStep(1);
            setStoredUserData((userData) => {
              if (!userData) {
                // if no object yet, create first entry
                return {
                  [session.addresses.mainnet]: {},
                };
              } else if (!userData[session.addresses.mainnet]) {
                // else if object exists but no entry for this address, create entry
                return {
                  ...userData,
                  [session.addresses.mainnet]: {},
                };
              }
              // if an entry exists for this address, return it
              return userData;
            });
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
