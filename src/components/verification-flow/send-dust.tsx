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
import { useAtom, useSetAtom } from "jotai";
import copy from "copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import {
  activeStepAtom,
  fetchAccountData,
  activeStxAddressAtom,
  storedUserDataAtom,
} from "../../constants";
import { useEffect, useState } from "react";
import { useRegistrationResponse } from "../../hooks/registration-response";

// active step = 2
// queries registration response from API
// needs more review

function SendDust() {
  const [activeStxAddress] = useAtom(activeStxAddressAtom);
  const [queriedStxAddress, setQueriedStxAddress] = useState<string | null>(
    null
  );
  const { isLoading, hasData, data } = useRegistrationResponse();
  const setActiveStep = useSetAtom(activeStepAtom);

  const toast = useToast();

  const copyText = (text: string) => {
    const copyStatus = copy(text);
    if (copyStatus) {
      toast({
        title: `Copied text to clipboard`,
        description: text,
        position: "top",
        status: "success",
        variant: "left-accent",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Unable to copy text to clipboard`,
        description: "Please refresh and try again, or copy manually",
        position: "top",
        status: "error",
        variant: "left-accent",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!activeStxAddress) {
      return;
    }

    if (activeStxAddress === queriedStxAddress) {
      return;
    }

    setQueriedStxAddress(activeStxAddress);

    const fetchAccountStatus = () => {
      console.log("fetching account status");
      fetchAccountData(activeStxAddress).then((accountData) => {
        if (!accountData) return undefined;
        if (accountData.status === "insufficient") {
          setActiveStep(4);
        }
        if (accountData.status === "valid") {
          setActiveStep(3);
        }
        setQueriedStxAddress(null);
        return accountData;
      });
    };

    const intervalId = setInterval(fetchAccountStatus, 5000);

    return () => clearInterval(intervalId);
  }, [setActiveStep, activeStxAddress]);

  // verify stored user data exists
  if (!activeStxAddress) {
    return null;
  }

  if (isLoading) {
    return (
      <Stack direction="row">
        <Spinner color="orange.500" emptyColor="orange.200" />{" "}
        <Text>Loading registration response...</Text>
      </Stack>
    );
  }

  if (hasData) {
    console.log(`hasData: ${data}`);
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
      {hasData && data ? (
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
      ) : (
        <Stack direction="row">
          <Spinner color="orange.500" emptyColor="orange.200" />{" "}
          <Text>Loading BTC address for dust...</Text>
        </Stack>
      )}
    </>
  );
}

export default SendDust;
