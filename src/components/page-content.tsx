import { Box, Text, Spinner, Stack, Heading } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { activeStepAtom } from "../constants";
import { useAccountData } from "../hooks/account-data";
import VerificationStepper from "./stepper";
import ConnectWallet from "./verification-flow/connect-wallet";
import SignMessage from "./verification-flow/sign-message";
import SendDust from "./verification-flow/send-dust";
import SuccessfulVerification from "./verification-flow/successful-verification";
import InsufficientBalance from "./verification-flow/insufficient-balance";
import { useEffect } from "react";

function Content() {
  const { isLoading, data } = useAccountData();
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);

  useEffect(() => {
    if (!isLoading && data) {
      switch (data.status) {
        case "pending":
          setActiveStep(2);
          break;
        case "valid":
          setActiveStep(3);
          break;
        case "insufficient":
          setActiveStep(4);
          break;
        default:
          setActiveStep(1);
      }
    }
  }, [isLoading, data, setActiveStep]);

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
