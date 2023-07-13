import {
  Box,
  Button,
  Stepper,
  Step,
  StepIndicator,
  StepTitle,
  StepDescription,
  StepStatus,
  StepIcon,
  StepNumber,
  StepSeparator,
  Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import {
  fetchAccountDataAtom,
  registrationSteps,
  storedStxAddressAtom,
  storedUserDataAtom,
} from "../../constants";
import SignMessage from "./sign-message";
import SendDust from "./send-dust";

function VerificationFlow() {
  const [storedStxAddress] = useAtom(storedStxAddressAtom);
  const [storedUserData, setStoredUserData] = useAtom(storedUserDataAtom);
  const [accountData] = useAtom(fetchAccountDataAtom);

  // verify stored user data exists
  if (!storedStxAddress || !storedUserData) {
    return null;
  }

  // store in user data if not already stored
  if (accountData && !storedUserData[storedStxAddress].accountData) {
    setStoredUserData({
      ...storedUserData,
      [storedStxAddress]: {
        ...storedUserData[storedStxAddress],
        accountData,
      },
    });
  }

  // check if user verified with insufficient balance
  if (accountData && accountData.status === "insufficient") {
    return (
      <>
        <Text>Insufficient balance to verify.</Text>
        <Text>
          You must send the dust amount from an account with more than 1 BTC.
        </Text>
      </>
    );
  }

  const activeStep = storedUserData[storedStxAddress].activeStep;

  // display stepper and instructions for each step
  return (
    <>
      <Stepper index={activeStep} size="lg" my={8} colorScheme="orange">
        {registrationSteps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box my={8}>
          <Text>
            First you must sign a message indicating this is your wallet, and
            that you want to use it for access to the 1BTC Chat.
          </Text>
          <SignMessage />
        </Box>
      )}
      {activeStep === 1 && (
        <Box my={8}>
          <Text>
            Second you must send a small amount of BTC to the address below,
            which identifies the BTC balance is greater than the threshold.
          </Text>
          <SendDust />
        </Box>
      )}
      {activeStep === 2 && (
        <Box my={8}>
          <Text>Third, you are all set to access the 1BTC console app!</Text>
          <Button variant="1btc-orange" size="xl">
            Access Console
          </Button>
        </Box>
      )}
    </>
  );
}

export default VerificationFlow;
