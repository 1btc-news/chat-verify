import { Button } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import {
  activeStepAtom,
  storedStxAddressAtom,
  storedUserDataAtom,
} from "../constants";
import { useAuth } from "@micro-stacks/react";

function ClearData() {
  const { signOut } = useAuth();

  const [storedStxAddress, setStoredStxAddress] = useAtom(storedStxAddressAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  const setStoredUserData = useSetAtom(storedUserDataAtom);

  return (
    <Button
      variant="1btc-orange"
      onClick={() => {
        try {
          // sign out of the wallet
          signOut();
          // clear userData for key stxAddress, leaving other contents
          setStoredUserData((prevUserData) => {
            if (!storedStxAddress || !prevUserData) return null;
            const updatedUserData = { ...prevUserData };
            delete updatedUserData[storedStxAddress];
            return updatedUserData;
          });
          // clear storedStxAddress
          setStoredStxAddress(null);
          setActiveStep(0);
        } catch (error) {
          console.error("Error while clearing data: ", error);
        }
      }}
    >
      Clear Data
    </Button>
  );
}

export default ClearData;
