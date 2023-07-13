import { Button } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import { storedStxAddressAtom, storedUserDataAtom } from "../constants";

function ClearData() {
  const [storedStxAddress, setStoredStxAddress] = useAtom(storedStxAddressAtom);
  const setStoredUserData = useSetAtom(storedUserDataAtom);

  return (
    <Button
      variant="1btc-orange"
      size="xl"
      onClick={() => {
        if (!storedStxAddress) return;
        // clear userData for key stxAddress, leaving other contents
        setStoredUserData((prevUserData) => {
          if (!prevUserData) return null;
          const updatedUserData = { ...prevUserData };
          delete updatedUserData[storedStxAddress];
          return updatedUserData;
        });
        // clear the stxAddress
        setStoredStxAddress(null);
      }}
    >
      Clear Data
    </Button>
  );
}

export default ClearData;
