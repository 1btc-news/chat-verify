import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";
import { useAtom, useSetAtom } from "jotai";
import {
  activeStepAtom,
  storedStxAddressAtom,
  storedUserDataAtom,
} from "../constants";

function SignIn() {
  const { openAuthRequest, isRequestPending } = useAuth();
  const setStxAddress = useSetAtom(storedStxAddressAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  const [userData, setUserData] = useAtom(storedUserDataAtom);
  return (
    <Button
      variant="1btc-orange"
      isLoading={isRequestPending}
      onClick={() =>
        void openAuthRequest({
          onFinish: (session) => {
            setStxAddress(session.addresses.mainnet);
            setActiveStep(1);
            if (!userData) {
              // initialize userData if not already set
              setUserData({
                [session.addresses.mainnet]: {
                  accountData: undefined,
                },
              });
            } else if (!userData[session.addresses.mainnet]) {
              // else add current address if not found
              setUserData({
                ...userData,
                [session.addresses.mainnet]: {
                  accountData: undefined,
                },
              });
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
