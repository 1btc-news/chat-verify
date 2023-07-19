import { useAtom } from "jotai";
import { storedStxAddressAtom, storedUserDataAtom } from "../constants";
import { useAccountData } from "./account-data";
import { useAccount } from "@micro-stacks/react";

export const useActiveStep = () => {
  const { stxAddress } = useAccount();
  const [storedStxAddress] = useAtom(storedStxAddressAtom);
  const [storedUserData] = useAtom(storedUserDataAtom); // include setStoredUserData here
  const { isLoading, hasError, hasData, data } = useAccountData();

  // check if user is logged in
  let activeStep = stxAddress ? 1 : 0;

  // if the user is known and not loading or error
  if (storedStxAddress && storedUserData && !isLoading && !hasError) {
    // adjust activeStep based on accountData status
    if (hasData && data && data.status === "insufficient") {
      activeStep = 4;
    } else if (hasData && data && data.status === "valid") {
      activeStep = 3;
    } else if (hasData && data && data.status === "pending") {
      activeStep = 2; // move to step 3 if not already there
    }
  }

  return activeStep;
};
