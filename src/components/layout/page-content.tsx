import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  Box,
  Heading,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  STEPS,
  accountDataAtom,
  activeStepAtom,
  isDuplicateAtom,
  isInsufficientAtom,
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
import DuplicateOrigin from "../verification-flow/duplicate-origin";
import FundWallet from "../verification-flow/fund-wallet";
import { useAccountData } from "../../hooks/use-account-data";
import { useSignatureMsg } from "../../hooks/use-signature-msg";
import { useRegistrationResponse } from "../../hooks/use-registration-response";

// determines current step in the process and renders content

function Content() {
  // STX address and active step
  const stxAddress = useAtomValue(stxAddressAtom);
  const activeStep = useAtomValue(activeStepAtom);
  // API status checks for account
  const isInsufficient = useAtomValue(isInsufficientAtom);
  const isDuplicate = useAtomValue(isDuplicateAtom);
  // atom setters for API data in localstorage
  const setLocalAccountData = useSetAtom(accountDataAtom);
  const setLocalSignatureMsg = useSetAtom(signatureMsgAtom);
  const setLocalRegistrationResponse = useSetAtom(registrationResponseAtom);
  // hooks for loading API data
  const {
    isLoading: isAccountLoading,
    hasError: hasAccountError,
    data: accountData,
    error: accountError,
  } = useAccountData();
  const { data: signatureMsgData } = useSignatureMsg();
  const { data: registrationData } = useRegistrationResponse();
  // stepper orientation
  const stepperOrientation = useBreakpointValue({
    base: "vertical",
    sm: "horizontal",
  }) as "vertical" | "horizontal";

  useEffect(() => {
    // console.log("page-content: checking accountData", accountData);
    if (!isAccountLoading && !hasAccountError && accountData !== undefined) {
      setLocalAccountData(accountData);
    }
  }, [accountData, hasAccountError, isAccountLoading, setLocalAccountData]);

  useEffect(() => {
    // console.log("page-content: checking signatureMsgData", signatureMsgData);
    if (signatureMsgData) {
      setLocalSignatureMsg(signatureMsgData);
    }
  }, [signatureMsgData, setLocalSignatureMsg]);

  useEffect(() => {
    // console.log("page-content: checking registrationData", registrationData);
    if (registrationData) {
      setLocalRegistrationResponse(registrationData);
    }
  }, [registrationData, setLocalRegistrationResponse]);

  // set defaults
  let contentHeading = "Verify you are a Fullcoiner to join the 1btc community";
  let contentBody = <ConnectWallet />;

  if (isAccountLoading) {
    contentBody = (
      <Stack direction="row">
        <Spinner color="orange.500" emptyColor="orange.200" />
        <Text>Loading account data for {stxAddress}...</Text>
      </Stack>
    );
  } else if (hasAccountError) {
    contentBody = (
      <Stack direction="row">
        <Text>
          There was an error loading account data. Please clear data and log in
          again.
        </Text>
        <Text>Error: {String(accountError)}</Text>
      </Stack>
    );
  } else if (isInsufficient) {
    contentHeading = "The verified address does not have enough funds.";
    contentBody = <InsufficientBalance />;
  } else if (isDuplicate) {
    contentHeading = "This verified address has already been used.";
    contentBody = <DuplicateOrigin />;
  } else {
    switch (activeStep) {
      case STEPS.CONNECT_WALLET:
        contentBody = <ConnectWallet />;
        break;
      case STEPS.SIGN_MESSAGE:
        contentBody = <SignMessage />;
        break;
      case STEPS.SEND_DUST:
        contentBody = <SendDust />;
        break;
      case STEPS.FUND_WALLET:
        contentHeading = "The verified address does not have enough funds.";
        contentBody = <FundWallet />;
        break;
      case STEPS.SUCCESS:
        contentHeading = "Congratulations, you are verified Fullcoiner!";
        contentBody = <SuccessfulVerification />;
        break;
      default:
        // reset to default state
        contentHeading =
          "Verify you are a Fullcoiner to join the 1btc community";
        contentBody = <ConnectWallet />;
    }
  }

  return (
    <Box width="100%" maxW="1200px">
      <Heading>{contentHeading}</Heading>
      {activeStep !== undefined && (
        <VerificationStepper
          activeStep={activeStep}
          orientation={stepperOrientation}
        />
      )}
      {contentBody}
    </Box>
  );
}

export default Content;
