import {
  Button,
  IconButton,
  ListItem,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  UnorderedList,
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

  // console.log("sign-message: isLoading", isLoading);

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
          Sign a message to verify ownership of your wallet and generate a
          unique BTC address.
        </Text>
        <Popover placement="bottom-end" variant="1btc-orange">
          <PopoverTrigger>
            <IconButton
              aria-label="Learn More"
              title="Learn More"
              icon={<FaQuestion />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader pl={4} pt={4}>
              Sign a Message
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody p={4}>
              <UnorderedList>
                <ListItem>
                  Verify ownership of your Bitcoin wallet by signing a unique
                  message provided by the software.
                </ListItem>
                <ListItem>
                  The signature is made by the wallet in a pop-up window,
                  ensuring that your private key never leaves your device.
                </ListItem>
                <ListItem>
                  The data from your signature is used by our system to create a
                  unique, deterministic Bitcoin address associated with your
                  account.
                </ListItem>
              </UnorderedList>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
      {data && (
        <Button
          variant="1btc-orange"
          disabled={isLoading || !data}
          isLoading={isRequestPending}
          title="Sign Message"
          onClick={() => {
            if (data) {
              openSignMessage({ message: data! }).then((signatureData) => {
                if (signatureData) {
                  setSignatureData(signatureData);
                }
              });
            }
          }}
        >
          Sign Message
        </Button>
      )}
    </>
  );
}

export default SignMessage;
