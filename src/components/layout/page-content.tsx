import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Box, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import {
  accountDataAtom,
  activeStepAtom,
  stxAddressAtom,
} from "../../constants";
import VerificationStepper from "../verification-flow/verification-stepper";
import ConnectWallet from "../verification-flow/connect-wallet";
import SignMessage from "../verification-flow/sign-message";
import SendDust from "../verification-flow/send-dust";
import SuccessfulVerification from "../verification-flow/successful-verification";
import InsufficientBalance from "../verification-flow/insufficient-balance";
import { useAccountData } from "../../hooks/use-account-data";

// determines current step in the process and renders content

function Content() {
  const stxAddress = useAtomValue(stxAddressAtom);
  const activeStep = useAtomValue(activeStepAtom);
  const setAccountData = useSetAtom(accountDataAtom);
  const { isLoading, data } = useAccountData();

  useEffect(() => {
    if (data) {
      setAccountData(data);
    }
  }, [data, setAccountData]);

  return (
    <Box width="100%" maxW="1200px">
      <Heading>
        Verify that you are a Fullcoiner to join the 1btc community
      </Heading>
      <VerificationStepper activeStep={activeStep} />
      {stxAddress ? (
        isLoading ? (
          <Stack direction="row">
            <Spinner color="orange.500" emptyColor="orange.200" />
            <Text>Loading account data...</Text>
          </Stack>
        ) : (
          <>
            {activeStep === 1 && <SignMessage />}
            {activeStep === 2 && <SendDust />}
            {activeStep === 3 && <SuccessfulVerification />}
            {activeStep === 4 && <InsufficientBalance />}
          </>
        )
      ) : (
        <ConnectWallet />
      )}
    </Box>
  );
}

export default Content;
