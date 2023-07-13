import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";
import { useSetAtom } from "jotai";
import { storedStxAddressAtom } from "../constants";

function SignOut() {
  const { signOut } = useAuth();
  const setStxAddress = useSetAtom(storedStxAddressAtom);
  return (
    <Button
      variant="1btc-orange"
      onClick={async () => {
        try {
          await signOut();
          setStxAddress(null);
        } catch (error) {
          console.error("Error during signOut: ", error);
        }
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOut;
