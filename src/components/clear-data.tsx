import { Button } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import {
  activeStepAtom,
  activeStxAddressAtom,
  storedUserDataAtom,
} from "../constants";
import { useAuth } from "@micro-stacks/react";

function ClearData() {
  const { signOut } = useAuth();

  const [activeStxAddress, setActiveStxAddress] = useAtom(activeStxAddressAtom);
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
            if (!activeStxAddress || !prevUserData) return null;
            const updatedUserData = { ...prevUserData };
            delete updatedUserData[activeStxAddress];
            return updatedUserData;
          });
          // clear activeStxAddress
          setActiveStxAddress(null);
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
