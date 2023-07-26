import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import copy from "copy-to-clipboard";
import {
  Alert,
  AlertIcon,
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
  useToast,
} from "@chakra-ui/react";
import { FaQuestion } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import {
  accountDataAtom,
  getAccountData,
  getBtcTxs,
  stxAddressAtom,
} from "../../constants";
import { useRegistrationResponse } from "../../hooks/use-registration-response";

// active step = 2
// queries registration response from API
// monitors for pending transaction to dust account

function SendDust() {
  const [stxAddress] = useAtom(stxAddressAtom);
  const [accountData, setAccountData] = useAtom(accountDataAtom);
  // TODO: better way to handle this? use an atom?
  const [queriedStxAddress, setQueriedStxAddress] = useState<string | null>(
    null
  );
  const [queriedBtcAddress, setQueriedBtcAddress] = useState<string | null>(
    null
  );
  const { isLoading, data } = useRegistrationResponse();
  // const { data: btcTxStatus } = useBtcTxStatus();

  const toast = useToast();

  const copyText = (text: string) => {
    const copyStatus = copy(text);
    if (copyStatus) {
      toast({
        title: `Copied text to clipboard`,
        description: text,
        position: "top",
        status: "success",
        variant: "1btc-orange",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Unable to copy text to clipboard`,
        description: "Please refresh and try again, or copy manually",
        position: "top",
        status: "warning",
        variant: "1btc-orange",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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

  useEffect(() => {
    if (!accountData || !accountData.receiveAddress) {
      return;
    }
    // rather: check if query is in progress
    if (accountData.receiveAddress === queriedBtcAddress) {
      return;
    }

    setQueriedBtcAddress(accountData.receiveAddress);

    const fetchBtcAccountStatus = () => {
      //console.log("send-dust: fetching BTC account", queriedBtcAddress);
      getBtcTxs(queriedBtcAddress!).then((btcTxs) => {
        //console.log("btcTxs: ", btcTxs);
        if (!btcTxs) return undefined;
        setQueriedBtcAddress(null);
        return btcTxs;
      });
    };

    // every 5 min
    const intervalId = setInterval(fetchBtcAccountStatus, 300000);

    return () => clearInterval(intervalId);
    // TODO: correct this dependency issue
  }, [accountData, accountData?.receiveAddress]);

  // verify STX address is known
  if (!stxAddress) {
    return null;
  }

  if (isLoading) {
    return (
      <Stack direction="row">
        <Spinner color="orange.500" emptyColor="orange.200" />
        <Text>Loading registration response...</Text>
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
                  <Text as="b" color="orange.500">
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
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={8}
          >
            <Text my={4} as="b">
              Send a dust amount of BTC (0.00006 BTC or 6,000 satoshis) to:{" "}
              <Text color="orange.500" overflowWrap="anywhere">
                {data.receiveAddress}
              </Text>
            </Text>
            <IconButton
              variant="1btc-orange"
              aria-label="Copy Bitcoin address"
              title="Copy Bitcoin address"
              icon={<FiCopy />}
              onClick={() => copyText(data.receiveAddress)}
            />
          </Stack>
          <Image
            m="auto"
            boxSize="250px"
            src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${data.receiveAddress}`}
          />
        </>
      )}
    </>
  );
}

export default SendDust;
