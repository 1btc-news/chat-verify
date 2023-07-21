import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Box, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import {
  accountDataAtom,
  activeStepAtom,
  isValid,
  registrationResponseAtom,
  signatureMsgAtom,
  stxAddressAtom,
} from "../../constants";
import VerificationStepper from "../verification-flow/verification-stepper";
import ConnectWallet from "../verification-flow/connect-wallet";
import SignMessage from "../verification-flow/sign-message";
import SendDust from "../verification-flow/send-dust";
import SuccessfulVerification from "../verification-flow/successful-verification";
import InsufficientBalance from "../verification-flow/insufficient-balance";
import { useAccountData } from "../../hooks/use-account-data";
import { useSignatureMsg } from "../../hooks/use-signature-msg";
import { useRegistrationResponse } from "../../hooks/use-registration-response";

// determines current step in the process and renders content

function Content() {
  const stxAddress = useAtomValue(stxAddressAtom);
  const activeStep = useAtomValue(activeStepAtom);
  const validated = useAtomValue(isValid);
  const setAccountData = useSetAtom(accountDataAtom);
  const setSignatureMsg = useSetAtom(signatureMsgAtom);
  const setRegistrationResponse = useSetAtom(registrationResponseAtom);
  const { isLoading: isAccountLoading, data: accountData } = useAccountData();
  const { data: signatureMsgData } = useSignatureMsg();
  const { data: registrationData } = useRegistrationResponse();

  useEffect(() => {
    if (accountData) {
      setAccountData(accountData);
    }
  }, [accountData, setAccountData]);

  useEffect(() => {
    if (signatureMsgData) {
      setSignatureMsg(signatureMsgData);
    }
  }, [signatureMsgData, setSignatureMsg]);

  useEffect(() => {
    if (registrationData) {
      setRegistrationResponse(registrationData);
    }
  }, [registrationData, setRegistrationResponse]);

  console.log("isValid: ", validated);

  return (
    <Box width="100%" maxW="1200px">
      <Heading>
        {validated
          ? "Congratulations, you are verified!"
          : "Verify that you are a Fullcoiner to join the 1btc community"}
      </Heading>
      <VerificationStepper activeStep={activeStep} />
      {stxAddress ? (
        isAccountLoading ? (
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
