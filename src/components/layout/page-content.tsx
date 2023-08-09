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
  isBtcDesignatedAtom,
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
import DuplicateOrigin from "../verification-flow/duplicate-origin";
import FundWallet from "../verification-flow/fund-wallet";
import { useAccountData } from "../../hooks/use-account-data";
import { useSignatureMsg } from "../../hooks/use-signature-msg";
import { useRegistrationResponse } from "../../hooks/use-registration-response";
import ClearData from "../auth/clear-data";
import DesignateBtc from "../verification-flow/designate-btc";

// determines current step in the process and renders content

function Content() {
  // Toggle for designating BTC address
  const isBtcDesignated = useAtomValue(isBtcDesignatedAtom);
  // STX address and active step
  const stxAddress = useAtomValue(stxAddressAtom);
  const activeStep = useAtomValue(activeStepAtom);
  // API status checks for account
  const isInsufficient = useAtomValue(isInsufficientAtom);
  const isDuplicate = useAtomValue(isDuplicateAtom);
  // atom setters for API data in localstorage
  const setIsBtcDesignated = useSetAtom(isBtcDesignatedAtom);
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
  const {
    isLoading: isSignatureMsgLoading,
    hasError: hasSignatureMsgError,
    data: signatureMsgData,
  } = useSignatureMsg();
  const {
    isLoading: isRegistrationLoading,
    hasError: hasRegistrationError,
    data: registrationData,
  } = useRegistrationResponse();
  // stepper orientation
  const stepperOrientation = useBreakpointValue({
    base: "vertical",
    sm: "horizontal",
  }) as "vertical" | "horizontal";

  useEffect(() => {
    // console.log("page-content: checking accountData", accountData);
    if (!isAccountLoading && !hasAccountError && accountData !== undefined) {
      setLocalAccountData(accountData);
      setIsBtcDesignated(true);
    }
  }, [accountData, hasAccountError, isAccountLoading, setLocalAccountData]);

  useEffect(() => {
    // console.log("page-content: checking signatureMsgData", signatureMsgData);
    if (!isSignatureMsgLoading && !hasSignatureMsgError && signatureMsgData) {
      setLocalSignatureMsg(signatureMsgData);
    }
  }, [
    signatureMsgData,
    setLocalSignatureMsg,
    isSignatureMsgLoading,
    hasSignatureMsgError,
  ]);

  useEffect(() => {
    // console.log("page-content: checking registrationData", registrationData);
    if (!isRegistrationLoading && !hasRegistrationError && registrationData) {
      setLocalRegistrationResponse(registrationData);
    }
  }, [
    hasRegistrationError,
    isRegistrationLoading,
    registrationData,
    setLocalRegistrationResponse,
  ]);

  // default state
  let contentHeading = "Verify you are a Fullcoiner to join the 1btc community";
  let contentBody = <ConnectWallet />;

  if (isAccountLoading && isBtcDesignated) {
    contentBody = (
      <Stack direction="row">
        <Spinner color="orange.500" emptyColor="orange.200" />
        <Text>Loading account data for {stxAddress}...</Text>
      </Stack>
    );
  } else if (hasAccountError) {
    console.error("Error loading account data", accountError);
    contentBody = (
      <Stack>
        <Text>Unable to load account data from the API for {stxAddress}.</Text>
        <Text>Please clear your data, log in, and try again.</Text>
        <ClearData />
      </Stack>
    );
  } else if (isDuplicate) {
    contentHeading = "This verified address has already been used.";
    contentBody = <DuplicateOrigin />;
  } else if (isInsufficient) {
    contentHeading = "The verified address does not have enough funds.";
    contentBody = <FundWallet />;
  } else {
    switch (activeStep) {
      case STEPS.CONNECT_WALLET:
        contentBody = <ConnectWallet />;
        break;
      case STEPS.DESIGNATE_BTC:
        contentBody = <DesignateBtc />;
        break;
      case STEPS.SIGN_MESSAGE:
        contentBody = <SignMessage />;
        break;
      case STEPS.SEND_DUST:
        contentBody = <SendDust />;
        break;
      case STEPS.SUCCESS:
        contentHeading = "Congratulations, you are a verified Fullcoiner!";
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
      <VerificationStepper
        activeStep={activeStep}
        orientation={stepperOrientation}
      />
      {contentBody}
    </Box>
  );
}

export default Content;
