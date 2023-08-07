import { useEffect } from "react";
import { atom, useAtom, useSetAtom } from "jotai";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  IconButton,
  Image,
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
import { FiCopy } from "react-icons/fi";
import {
  accountDataAtom,
  getAccountData,
  sentDustToggleAtom,
  stxAddressAtom,
} from "../../constants";
import { useRegistrationResponse } from "../../hooks/use-registration-response";
import { useClipboardToast } from "../../hooks/use-clipboard-toast";
import AccessInfoAlert from "./access-info-alert";

// active step = 2
// queries account data from API
// once status changes from pending, progresses to next step

const queriedStxAddressAtom = atom<string | null>(null);

function SendDust() {
  const [stxAddress] = useAtom(stxAddressAtom);
  const setAccountData = useSetAtom(accountDataAtom);
  const [queriedStxAddress, setQueriedStxAddress] = useAtom(
    queriedStxAddressAtom
  );
  const [sentDustToggle, setSentDustToggle] = useAtom(sentDustToggleAtom);
  const { isLoading, data } = useRegistrationResponse();
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
        return accountData;
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

  if (isLoading) {
    return (
      <Stack direction="row">
        <Spinner color="orange.500" emptyColor="orange.200" />
        <Text>Loading registration response for {stxAddress}...</Text>
      </Stack>
    );
  }

  if (sentDustToggle) {
    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={8}
        >
          <Stack direction="row" mt={4}>
            <Spinner color="orange.500" emptyColor="orange.200" />
            <Text>Verifying dust transaction...</Text>
          </Stack>
        </Stack>
        <AccessInfoAlert />
        <Button
          variant="1btc-orange"
          title="Take me back!"
          onClick={() => setSentDustToggle(false)}
        >
          Take me back
        </Button>
      </>
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
          To demonstrate ownership of more than 1 BTC, send a tiny fraction of
          your Bitcoin (known as "dust") to your unique address. This verifies
          that the source address holds more than 1 BTC.
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
              Send Dust Transaction
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody p={4}>
              <UnorderedList>
                <ListItem>
                  To prove that you own a wallet that holds more than 1 BTC, you
                  are required to send a small amount of BTC from that wallet.
                </ListItem>
                <ListItem>
                  This small amount is known as "dust", commonly 0.00006 BTC or
                  6,000 satoshis.
                </ListItem>
                <ListItem>
                  The 1btc API will read the transaction and verify the input
                  contains more than 1 BTC.
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold" color="orange.500">
                    Please note: nobody has access to the generated address, and
                    the dust transaction is non-refundable.
                  </Text>
                </ListItem>
              </UnorderedList>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
      <Alert mb={8} variant="1btc-orange" status="warning">
        <AlertIcon boxSize="6" />
        Send only the tiniest amount. You maintain full control over your
        Bitcoin. Nobody has access to this unique address, and the dust
        transaction is non-refundable. It is only used to verify ownership of
        more than 1 BTC.
      </Alert>
      {data && (
        <>
          <Stack
            direction={["column", "row"]}
            justifyContent="space-between"
            alignItems="center"
            mb={8}
          >
            <Box my={4} fontWeight="bold">
              Send a dust amount of BTC (0.00006 BTC or 6,000 satoshis) to:{" "}
              <Text color="orange.500" overflowWrap="anywhere">
                {data.receiveAddress}{" "}
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
            </Box>

            <Image
              m="auto"
              boxSize="250px"
              src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${data.receiveAddress}`}
            />
          </Stack>

          <Button
            variant="1btc-orange"
            title="I've sent it!"
            onClick={() => setSentDustToggle(true)}
          >
            I've sent it!
          </Button>
        </>
      )}
    </>
  );
}

export default SendDust;
