import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";
import { useSetAtom } from "jotai";
import { storedStxAddressAtom } from "../constants";

function SignOut() {
  const { signOut } = useAuth();
  const setStoredStxAddress = useSetAtom(storedStxAddressAtom);
  return (
    <Button
      variant="1btc-orange"
      onClick={() => {
        try {
          // sign out of the wallet
          signOut();
          // clear storedStxAddress
          setStoredStxAddress(null);
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
