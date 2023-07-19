import { Box, Text, Spinner, Stack, Heading } from "@chakra-ui/react";
import { useAccount } from "@micro-stacks/react";
import { useAccountData } from "../hooks/account-data";
import { useActiveStep } from "../hooks/active-step";
import VerificationStepper from "./stepper";
import ConnectWallet from "./verification-flow/connect-wallet";
import SignMessage from "./verification-flow/sign-message";
import SendDust from "./verification-flow/send-dust";
import SuccessfulVerification from "./verification-flow/successful-verification";
import InsufficientBalance from "./verification-flow/insufficient-balance";

function Content() {
  const { stxAddress } = useAccount();
  const { isLoading } = useAccountData();
  console.log("stxAddress", stxAddress);

  const activeStep = useActiveStep();

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
