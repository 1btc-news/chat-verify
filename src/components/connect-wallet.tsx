import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";
import { useAtom, useSetAtom } from "jotai";
import { storedStxAddressAtom, storedUserDataAtom } from "../constants";

function ConnectWallet() {
  const { openAuthRequest, isRequestPending } = useAuth();
  const setStxAddress = useSetAtom(storedStxAddressAtom);
  const [userData, setUserData] = useAtom(storedUserDataAtom);
  return (
    <Button
      variant="1btc-orange"
      isLoading={isRequestPending}
      onClick={() =>
        void openAuthRequest({
          onFinish: (session) => {
            // set STX address in localstorage
            setStxAddress(session.addresses.mainnet);
            if (!userData) {
              // initialize userData if not already set
              setUserData({
                [session.addresses.mainnet]: {
                  activeStep: 0,
                },
              });
            } else if (!userData[session.addresses.mainnet]) {
              // else add current address if not found
              setUserData({
                ...userData,
                [session.addresses.mainnet]: {
                  activeStep: 0,
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

export default ConnectWallet;
