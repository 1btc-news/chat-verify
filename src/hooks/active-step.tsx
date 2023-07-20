import { useAtom } from "jotai";
import {
  activeStepAtom,
  storedStxAddressAtom,
  storedUserDataAtom,
} from "../constants";
import { useAccountData } from "./account-data";
import { useAccount } from "@micro-stacks/react";

export const useActiveStep = () => {
  const { stxAddress } = useAccount();
  const [storedStxAddress] = useAtom(storedStxAddressAtom);
  const [storedUserData] = useAtom(storedUserDataAtom);
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const { isLoading, hasError, hasData, data } = useAccountData();

  // check if user is logged in
  if (stxAddress) {
    setActiveStep(1);
  } else {
    setActiveStep(0);
  }

  // if the user is known and not loading or error
  if (storedStxAddress && storedUserData && !isLoading && !hasError) {
    // adjust activeStep based on accountData status
    if (hasData && data && data.status === "insufficient") {
      setActiveStep(4);
    } else if (hasData && data && data.status === "valid") {
      setActiveStep(3);
    } else if (hasData && data && data.status === "pending") {
      setActiveStep(2);
    }
  }

  return activeStep;
};
