import { Button, Spinner, Text } from "@chakra-ui/react";
import { useOpenSignMessage } from "@micro-stacks/react";
import { useAtom } from "jotai";
import {
  storedUserDataAtom,
  storedStxAddressAtom,
  fetchSignatureMsgAtom,
} from "../../constants";
import { loadable } from "jotai/utils";

function SignMessage() {
  const [storedStxAddress] = useAtom(storedStxAddressAtom);
  const [storedUserData, setStoredUserData] = useAtom(storedUserDataAtom);
  const signatureMsgLoader = loadable(fetchSignatureMsgAtom);
  const [signatureMsg] = useAtom(signatureMsgLoader);
  const { openSignMessage, isRequestPending } = useOpenSignMessage();

  // verify stored user data exists
  if (!storedStxAddress || !storedUserData) {
    return null;
  }

  if (signatureMsg.state === "loading") {
    return (
      <>
        <Spinner color="orange.500" emptyColor="gray.200" />
        <Text>Loading signature data...</Text>
      </>
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
      <Button
        variant="1btc-orange"
        size="xl"
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
                    activeStep: storedUserData[storedStxAddress].activeStep + 1,
                    signatureData,
                  },
                });
              }
            }
          );
        }}
      >
        Sign Message
      </Button>
    );
  }

  // shouldn't get here, but just in case
  return null;
}

export default SignMessage;
