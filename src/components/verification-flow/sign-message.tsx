import {
  Button,
  IconButton,
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
import { FaQuestion } from "react-icons/fa";
import { useOpenSignMessage } from "@micro-stacks/react";
import { useAtom, useSetAtom } from "jotai";
import { signatureDataAtom, stxAddressAtom } from "../../constants";
import { useSignatureMsg } from "../../hooks/use-signature-msg";

// active step = 1
// queries signature message from API
//   once loaded, user can sign the message
// once user signs progresses to next step

function SignMessage() {
  const [stxAddress] = useAtom(stxAddressAtom);
  const setSignatureData = useSetAtom(signatureDataAtom);
  const { openSignMessage, isRequestPending } = useOpenSignMessage();
  const { isLoading, data } = useSignatureMsg();

  // verify STX address is known
  if (!stxAddress) {
    return null;
  }

  if (isLoading) {
    return (
      <Stack direction="row">
        <Spinner color="orange.500" emptyColor="orange.200" />
        <Text>Loading signature data...</Text>
      </Stack>
    );
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
            <IconButton aria-label="Learn More" icon={<FaQuestion />} />
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
        disabled={!data}
        isLoading={isRequestPending}
        onClick={() => {
          openSignMessage({ message: data! }).then((signatureData) => {
            if (signatureData) {
              setSignatureData(signatureData);
            }
          });
        }}
      >
        Sign Message
      </Button>
    </>
  );
}

export default SignMessage;
