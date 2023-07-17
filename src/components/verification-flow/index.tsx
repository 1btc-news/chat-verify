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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
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
            Confirm ownership of your wallet by signing a message from your
            wallet.
          </Text>
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button mr={4}>Learn More</Button>
            </PopoverTrigger>
            <PopoverContent width="100%" maxW="800px">
              <PopoverHeader bg="orange.500" fontWeight="bold">
                Sign a Message
              </PopoverHeader>
              <PopoverArrow bg="orange.500" />
              <PopoverCloseButton />
              <Text p={2}>
                In this step, we request you to verify the ownership of your
                Bitcoin wallet. This is achieved by signing a unique message
                provided by us using your wallet. This process happens through a
                pop-up window triggered by your wallet software, ensuring that
                your private key never leaves your device. The data from your
                signature is then used by our system to create a unique,
                deterministic Bitcoin address associated with your account.
              </Text>
            </PopoverContent>
          </Popover>
          <SignMessage />
        </Box>
      )}
      {activeStep === 1 && (
        <Box my={8}>
          <Text>
            Demonstrate your BTC ownership by sending a small (dust) transaction
            to your unique address.
          </Text>
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button mr={4}>Learn More</Button>
            </PopoverTrigger>
            <PopoverContent width="100%" maxW="800px">
              <PopoverHeader bg="orange.500" fontWeight="bold">
                Send Dust Transaction
              </PopoverHeader>
              <PopoverArrow bg="orange.500" />
              <PopoverCloseButton />
              <Text p={2}>
                In order to prove that you hold wallet holds more than 1 BTC,
                you're required to send a small amount of BTC (commonly 0.00006
                BTC or 6,000 satoshis, referred to as "dust") to a unique,
                deterministic address generated for you in the previous step.
                Note, this dust transaction is non-refundable. The 1BTC API will
                verify this transaction and ensure that the input amount from
                the source wallet is greater than 1 BTC.
              </Text>
            </PopoverContent>
          </Popover>
          <SendDust />
        </Box>
      )}
      {activeStep === 2 && (
        <Box my={8}>
          <Text>
            You made it! Celebrate by joining our exclusive 1BTC chat - just a
            click away.
          </Text>
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button mr={4}>Learn More</Button>
              <Button
                as="a"
                variant="ghost"
                href="https://app.console.xyz/c/1btc/chat"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join 1BTC
              </Button>
            </PopoverTrigger>
            <PopoverContent width="100%" maxW="800px">
              <PopoverHeader bg="orange.500" fontWeight="bold">
                Join 1BTC Chat
              </PopoverHeader>
              <PopoverArrow bg="orange.500" />
              <PopoverCloseButton />
              <Text p={2}>
                Congratulations! You've successfully verified your ownership of
                more than 1 BTC. Now the fun begins - click on the link below to
                join our exclusive 1BTC console chat app. Get ready to mingle
                with other Bitcoin enthusiasts who have journeyed the same path
                as you. Welcome aboard!
              </Text>
            </PopoverContent>
          </Popover>
          <Button variant="1btc-orange">Access Console</Button>
        </Box>
      )}
    </>
  );
}

export default VerificationFlow;
