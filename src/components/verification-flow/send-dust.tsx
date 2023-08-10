import { useEffect } from "react";
import { atom, useAtom, useSetAtom } from "jotai";
import {
  Alert,
  IconButton,
  ListItem,
  Spinner,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";
import {
  accountDataAtom,
  getAccountData,
  stxAddressAtom,
} from "../../constants";
import { useRegistrationResponse } from "../../hooks/use-registration-response";
import { useClipboardToast } from "../../hooks/use-clipboard-toast";
import ClearData from "../auth/clear-data";
import LearnMore from "./learn-more";

// active step = 3
// uses queried account data from API
// user progresses when status changes from pending

const queriedStxAddressAtom = atom<string | null>(null);

function SendDust() {
  const [stxAddress] = useAtom(stxAddressAtom);
  const setAccountData = useSetAtom(accountDataAtom);
  const [queriedStxAddress, setQueriedStxAddress] = useAtom(
    queriedStxAddressAtom
  );
  const { isLoading, data, hasError, error } = useRegistrationResponse();
  const copyText = useClipboardToast();

  // TODO: set timers or limits here to prevent a lone tab fetching forever?

  useEffect(() => {
    if (!stxAddress) {
      return;
    }
    // rather: check if query is in progress
    if (stxAddress === queriedStxAddress) {
      return;
    }
    setQueriedStxAddress(stxAddress);

    const fetchStxAccountStatus = () => {
      console.log("send-dust: fetching STX account", stxAddress);
      getAccountData(stxAddress).then((accountData) => {
        console.log("accountData: ", accountData);
        if (!accountData) return undefined;
        setQueriedStxAddress(null);
        if (accountData.status !== "pending") {
          setAccountData(accountData);
        }
      });
    };

    const intervalId = setInterval(fetchStxAccountStatus, 5000);

    return () => clearInterval(intervalId);
    // TODO: correct this dependency issue
  }, [stxAddress]);

  // verify STX address is known
  if (!stxAddress) {
    return null;
  }

  // if registration response is loading
  if (isLoading) {
    return (
      <Stack direction="row">
        <Spinner color="orange.500" emptyColor="orange.200" />
        <Text>Loading registration response for {stxAddress}...</Text>
      </Stack>
    );
  }

  // if registration response POST error
  if (hasError) {
    console.error("Error requesting registration response", error);
    return (
      <Stack>
        <Text>
          Unable to load registration response from the API for {stxAddress}.
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
            Send a tiny fraction of your Bitcoin to link the accounts
          </Text>
          <UnorderedList>
            <ListItem>
              This small amount is known as "dust", commonly 0.00006 BTC or
              6,000 satoshis
            </ListItem>
            <ListItem>
              This transfer comes from the wallet designated in Step 2
            </ListItem>
            <ListItem>
              This transaction is non-refundable, nobody has access to the
              unique address
            </ListItem>
          </UnorderedList>
          <Alert my={8} variant="1btc-orange" status="warning">
            <Stack>
              <Text>
                Send only the tiniest amount, you maintain full control over
                your Bitcoin
              </Text>
              {data && (
                <Text
                  fontWeight="bold"
                  color="orange.500"
                  overflowWrap="anywhere"
                  flexGrow="1"
                >
                  {data.receiveAddress}
                  <IconButton
                    variant="1btc-orange"
                    size="sm"
                    ml={4}
                    aria-label="Copy Bitcoin address"
                    title="Copy Bitcoin address"
                    icon={<FiCopy />}
                    onClick={() => copyText(data.receiveAddress)}
                  />
                </Text>
              )}
            </Stack>
          </Alert>
          <Text>
            Once detected, this page will automatically progress to the next
            step.
          </Text>
        </Stack>
        <LearnMore href="https://docs.1btc.chat" />
      </Stack>
    </Stack>
  );
}

export default SendDust;
