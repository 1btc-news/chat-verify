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
import { useAccountData } from "../../hooks/use-account-data";
import { useSignatureMsg } from "../../hooks/use-signature-msg";
import { useRegistrationResponse } from "../../hooks/use-registration-response";

// determines current step in the process and renders content

function Content() {
  const activeStep = useAtomValue(activeStepAtom);
  const stxAddress = useAtomValue(stxAddressAtom);
  const isInsufficient = useAtomValue(isInsufficientAtom);
  const isDuplicate = useAtomValue(isDuplicateAtom);
  const setAccountData = useSetAtom(accountDataAtom);
  const setSignatureMsg = useSetAtom(signatureMsgAtom);
  const setRegistrationResponse = useSetAtom(registrationResponseAtom);
  const { isLoading: isAccountLoading, data: accountData } = useAccountData();
  const { data: signatureMsgData } = useSignatureMsg();
  const { data: registrationData } = useRegistrationResponse();
  const stepperOrientation = useBreakpointValue({
    base: "vertical",
    sm: "horizontal",
  }) as "vertical" | "horizontal";

  useEffect(() => {
    // console.log("page-content: checking accountData", accountData);
    if (accountData) {
      setAccountData(accountData);
    }
  }, [accountData, setAccountData]);

  useEffect(() => {
    // console.log("page-content: checking signatureMsgData", signatureMsgData);
    if (signatureMsgData) {
      setSignatureMsg(signatureMsgData);
    }
  }, [signatureMsgData, setSignatureMsg]);

  useEffect(() => {
    // console.log("page-content: checking registrationData", registrationData);
    if (registrationData) {
      setRegistrationResponse(registrationData);
    }
  }, [registrationData, setRegistrationResponse]);

  // set defaults
  let contentHeading = "Verify you are a Fullcoiner to join the 1btc community";
  let contentBody = <ConnectWallet />;

  // work through state logic
  if (stxAddress) {
    //console.log("page-content: stxAddress: true");
    if (isAccountLoading) {
      //console.log("page-content: isAccountLoading: true");
      contentBody = (
        <Stack direction="row">
          <Spinner color="orange.500" emptyColor="orange.200" />
          <Text>Loading account data...</Text>
        </Stack>
      );
    } else if (isInsufficient) {
      // console.log("page-content: isInsufficient: true");
      contentHeading = "The origin address does not have enough funds.";
      contentBody = <InsufficientBalance />;
    } else if (isDuplicate) {
      // console.log("page-content: isDuplicate: true");
      contentHeading = "This origin address has already been used.";
      contentBody = <DuplicateOrigin />;
    } else {
      switch (activeStep) {
        case 1:
          // console.log("page-content: activeStep: 1");
          contentBody = <SignMessage />;
          break;
        case 2:
          // console.log("page-content: activeStep: 2");
          contentBody = <SendDust />;
          break;
        case 3:
          // console.log("page-content: activeStep: 3");
          contentHeading = "Congratulations, you are verified Fullcoiner!";
          contentBody = <SuccessfulVerification />;
          break;
        default:
          // console.log("page-content: activeStep: default", activeStep);
          contentBody = <ConnectWallet />;
      }
    }
  }

  // are they logged in?
  // no: connect wallet
  // yes: continue

  // is account data loaded?
  // no: display loading
  // yes: display next step

  // insufficient balance?
  // no: continue
  // yes: display insufficient balance
  //   - insufficient balance prompt
  //   - insufficient balance check
  //     sentFundsAtom toggle

  // duplicate origin?
  // no: continue
  // yes: display duplicate origin
  //   - duplicate origin prompt
  //   please use a diff account?

  // more detailed steps (reverse order?)
  // 4: successful verification (valid)
  // 3: send dust check (pending)
  // 2: send dust prompt (signedData && !registrationResponse)
  //    sentDustAtom toggle
  // 1: sign message (!signedData)

  //
  // <>
  // {activeStep === 1 && <SignMessage />}
  // {activeStep === 2 && <SendDust />}
  // {activeStep === 3 && <SuccessfulVerification />}
  // {activeStep === 4 && <InsufficientBalance />}
  // </>

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
