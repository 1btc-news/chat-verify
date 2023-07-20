import {
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useOpenSignMessage } from "@micro-stacks/react";
import { useAtom } from "jotai";
import {
  storedUserDataAtom,
  storedStxAddressAtom,
  fetchSignatureMsgAtom,
  activeStepAtom,
} from "../../constants";
import { loadable } from "jotai/utils";

function SignMessage() {
  const [storedStxAddress] = useAtom(storedStxAddressAtom);
  const [storedUserData, setStoredUserData] = useAtom(storedUserDataAtom);
  const signatureMsgLoader = loadable(fetchSignatureMsgAtom);
  const [signatureMsg] = useAtom(signatureMsgLoader);
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const { openSignMessage, isRequestPending } = useOpenSignMessage();

  // verify stored user data exists
  if (!storedStxAddress || !storedUserData) {
    return null;
  }

  if (signatureMsg.state === "loading") {
    return (
      <Stack direction="row">
        <Spinner color="orange.500" emptyColor="orange.200" />
        <Text>Loading signature data...</Text>
      </Stack>
    );
  }

  if (signatureMsg.state === "hasError") {
    return (
      <>
        <Text>There was an error, please sign out and try again.</Text>
        <Text>{String(signatureMsg.error)}</Text>
      </>
    );
  }

  if (signatureMsg.state === "hasData") {
    // store in user data if not already stored
    if (signatureMsg.data && !storedUserData[storedStxAddress].signatureMsg) {
      setStoredUserData({
        ...storedUserData,
        [storedStxAddress]: {
          ...storedUserData[storedStxAddress],
          signatureMsg: signatureMsg.data,
        },
      });
    }

    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={8}
        >
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
        </Stack>
        <Button
          variant="1btc-orange"
          disabled={!storedUserData[storedStxAddress].signatureMsg}
          isLoading={isRequestPending}
          onClick={() => {
            openSignMessage({ message: signatureMsg.data! }).then(
              (signatureData) => {
                if (signatureData) {
                  setStoredUserData({
                    ...storedUserData,
                    [storedStxAddress]: {
                      ...storedUserData[storedStxAddress],
                      signatureData,
                    },
                  });
                  setActiveStep(activeStep + 1);
                }
              }
            );
          }}
        >
          Sign Message
        </Button>
      </>
    );
  }

  // shouldn't get here, but just in case
  return null;
}

export default SignMessage;
