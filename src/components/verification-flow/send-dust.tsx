import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import copy from "copy-to-clipboard";
import {
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaQuestion } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { getAccountData, stxAddressAtom } from "../../constants";
import { useRegistrationResponse } from "../../hooks/use-registration-response";

// active step = 2
// queries registration response from API
// monitors for pending transaction to dust account

// works on first pass through logic
// stuck waiting for btc address on second login
// need to avoid sending duplicate registration request
// does continue to query status of account either way
// rename send-dust.tsx to verify-account.tsx or register-account.tsx
//   if not registered, registers and displays BTC address (send-dust)
//   if already registered, displays BTC address (send-dust)
//   if pending tx, displays loading spinner (awaiting-dust-tx)
//   if account is valid, move on to next step
// localstorage data for loadable data? with useActiveStep hook!

function SendDust() {
  const [stxAddress] = useAtom(stxAddressAtom);
  // TODO: better way to handle this? use an atom?
  const [queriedStxAddress, setQueriedStxAddress] = useState<string | null>(
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

    const fetchAccountStatus = () => {
      console.log("fetching account status in send-dust.tsx");
      getAccountData(stxAddress).then((accountData) => {
        console.log("accountData: ", accountData);
        if (!accountData) return undefined;
        setQueriedStxAddress(null);
        return accountData;
      });
    };

    const intervalId = setInterval(fetchAccountStatus, 5000);

    return () => clearInterval(intervalId);
    // TODO: correct this dependency issue
  }, [stxAddress]);

  // TODO:
  //useEffect(() => {
  // same as fetchAccountStatus
  // need receive address from accountData
  // review state logic
  // })

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
          Demonstrate your BTC ownership by sending a small (dust) transaction
          to your unique address.
        </Text>
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <IconButton aria-label="Learn More" icon={<FaQuestion />} />
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
              verify this transaction and ensure that the input amount from the
              source wallet is greater than 1 BTC.
            </Text>
          </PopoverContent>
        </Popover>
      </Stack>
      {data && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={8}
          >
            <Text my={4}>
              Send a dust amount of BTC (0.00006 BTC or 6,000 satoshis) to{" "}
              {data.receiveAddress}
            </Text>
            <IconButton
              variant="1btc-orange"
              aria-label="Copy Bitcoin address"
              icon={<FiCopy />}
              onClick={() => copyText(data.receiveAddress)}
            />
          </Stack>
          <Image
            boxSize="250px"
            src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${data.receiveAddress}`}
          />
        </>
      )}
    </>
  );
}

export default SendDust;
