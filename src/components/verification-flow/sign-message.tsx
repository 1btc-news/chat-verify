import {
  Button,
  ListItem,
  Spinner,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useOpenSignMessage } from "@micro-stacks/react";
import { useAtom, useSetAtom } from "jotai";
import { signatureDataAtom, stxAddressAtom } from "../../constants";
import { useSignatureMsg } from "../../hooks/use-signature-msg";
import ClearData from "../auth/clear-data";
import LearnMore from "./learn-more";

// active step = 2
// uses queried signature message from API
// user progresses by signing the message

function SignMessage() {
  const [stxAddress] = useAtom(stxAddressAtom);
  const setSignatureData = useSetAtom(signatureDataAtom);
  const { openSignMessage, isRequestPending } = useOpenSignMessage();
  const { isLoading, data, hasError, error } = useSignatureMsg();

  // verify STX address is known
  if (!stxAddress) {
    return null;
  }

  // if signature message is loading
  if (isLoading) {
    return (
      <Stack direction="row">
        <Spinner color="orange.500" emptyColor="orange.200" />
        <Text>Loading signature message for {stxAddress}...</Text>
      </Stack>
    );
  }

  // if signature message POST error
  if (hasError) {
    console.error("Error requesting signature message", error);
    return (
      <Stack>
        <Text>
          Unable to load signature message from the API for {stxAddress}.
        </Text>
        <Text>Please clear your data, log in, and try again.</Text>
        <ClearData />
      </Stack>
    );
  }

  return (
    <Stack direction={["column-reverse", "column"]} gap={8}>
      <Stack
        direction={["column", "row"]}
        justifyContent={["center", "space-between"]}
      >
        <Stack>
          <Text fontWeight="bold">
            Sign a message from your wallet to verify your account.
          </Text>
          <UnorderedList>
            <ListItem>This signature creates a unique Bitcoin address</ListItem>
            <ListItem>The address is generated based on the signature</ListItem>
            <ListItem>Nobody has access to the generated address</ListItem>
          </UnorderedList>
        </Stack>
        <LearnMore href="https://docs.1btc.chat/verification/sign-message" />
      </Stack>
      {data && (
        <Button
          variant="1btc-orange"
          disabled={isLoading || !data}
          isLoading={isRequestPending}
          title="Sign Message"
          onClick={() => {
            if (data) {
              openSignMessage({ message: data }).then((signatureData) => {
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
    </Stack>
  );
}

export default SignMessage;
