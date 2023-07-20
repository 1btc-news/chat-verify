import { useEffect } from "react";
import { useAtom } from "jotai";
import { Box, Text, Spinner, Stack, Heading } from "@chakra-ui/react";
import {
  activeStepAtom,
  signatureDataAtom,
  stxAddressAtom,
} from "../constants";
import { useAccountData } from "../hooks/use-account-data";
import VerificationStepper from "./verification-stepper";
import ConnectWallet from "./verification-flow/connect-wallet";
import SignMessage from "./verification-flow/sign-message";
import SendDust from "./verification-flow/send-dust";
import SuccessfulVerification from "./verification-flow/successful-verification";
import InsufficientBalance from "./verification-flow/insufficient-balance";

// loads the account data from API for a STX address
// determines current step in the process and renders content

function Content() {
  const { isLoading, hasData, data } = useAccountData();
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [stxAddress] = useAtom(stxAddressAtom);
  const [signatureData] = useAtom(signatureDataAtom);

  useEffect(() => {
    if (hasData && data) {
      // set active step based on latest response from API
      switch (data.status) {
        case "pending":
          setActiveStep(2); // send dust
          break;
        case "valid":
          setActiveStep(3); // successful verification
          break;
        case "insufficient":
          setActiveStep(4); // insufficient balance
          break;
        default:
          if (signatureData) {
            setActiveStep(2); // send dust
          } else {
            setActiveStep(1); // sign msg
          }
      }
    }
  }, [isLoading, data, stxAddress, setActiveStep, signatureData]);

  return (
    <Box width="100%" maxW="1200px">
      <Heading>
        Verify that you are a Fullcoiner to join the 1btc community
      </Heading>
      {isLoading ? (
        <Stack direction="row">
          <Spinner color="orange.500" emptyColor="orange.200" />
          <Text>Loading account data...</Text>
        </Stack>
      ) : (
        <>
          <VerificationStepper activeStep={activeStep} />
          {activeStep === 0 && <ConnectWallet />}
          {activeStep === 1 && <SignMessage />}
          {activeStep === 2 && <SendDust />}
          {activeStep === 3 && <SuccessfulVerification />}
          {activeStep === 4 && <InsufficientBalance />}
        </>
      )}
    </Box>
  );
}

export default Content;
