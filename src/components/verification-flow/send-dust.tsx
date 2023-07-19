import {
  Button,
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
import { useAtom } from "jotai";
import copy from "copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import {
  fetchAccountData,
  fetchRegistrationResponseAtom,
  storedStxAddressAtom,
  storedUserDataAtom,
} from "../../constants";
import { loadable } from "jotai/utils";
import { useEffect, useState } from "react";

function SendDust() {
  const [storedStxAddress] = useAtom(storedStxAddressAtom);
  const [queriedStxAddress, setQueriedStxAddress] = useState<string | null>(
    null
  );
  const [storedUserData, setStoredUserData] = useAtom(storedUserDataAtom);
  const registrationResponseLoader = loadable(fetchRegistrationResponseAtom);
  const [registrationResponse] = useAtom(registrationResponseLoader);

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
    if (
      !storedStxAddress ||
      !storedUserData ||
      storedStxAddress === queriedStxAddress
    )
      return;
    setQueriedStxAddress(storedStxAddress);
    const fetchAccountStatus = () => {
      console.log("fetching account status");
      fetchAccountData(storedStxAddress).then((accountData) => {
        if (!accountData) return undefined;
        if (accountData.status === "valid") {
          setStoredUserData({
            ...storedUserData,
            [storedStxAddress]: {
              ...storedUserData[storedStxAddress],
              activeStep: storedUserData[storedStxAddress].activeStep + 1,
              accountData,
            },
          });
        }
        return accountData;
      });
    };
    fetchAccountStatus();
    const int = setInterval(() => fetchAccountStatus(), 5000);
    return () => clearInterval(int);
  }, [queriedStxAddress, setStoredUserData, storedStxAddress, storedUserData]);

  // verify stored user data exists
  if (!storedStxAddress || !storedUserData) {
    return null;
  }

  if (registrationResponse.state === "loading") {
    return (
      <Stack direction="row">
        <Spinner color="orange.500" emptyColor="orange.200" />{" "}
        <Text>Loading registration response...</Text>
      </Stack>
    );
  }

  if (registrationResponse.state === "hasError") {
    return (
      <>
        <Text>There was an error, please sign out and try again.</Text>
        <Text>{String(registrationResponse.error)}</Text>
      </>
    );
  }

  if (registrationResponse.state === "hasData") {
    // store in user data if not already stored
    if (
      registrationResponse.data &&
      !storedUserData[storedStxAddress].accountData
    ) {
      setStoredUserData({
        ...storedUserData,
        [storedStxAddress]: {
          ...storedUserData[storedStxAddress],
          accountData: registrationResponse.data,
        },
      });
    }

    const accountData = registrationResponse.data;

    if (!accountData) {
      return null;
    }

    return (
      <>
        <Stack direction="row">
          <Text mb={4}>
            Demonstrate your BTC ownership by sending a small (dust) transaction
            to your unique address.
          </Text>
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button mr={4}>Learn More</Button>
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
                verify this transaction and ensure that the input amount from
                the source wallet is greater than 1 BTC.
              </Text>
            </PopoverContent>
          </Popover>
        </Stack>
        <Stack direction="row">
          <Text my={4}>
            Send a dust amount of BTC to {accountData.receiveAddress}
          </Text>
          <IconButton
            variant="1btc-orange"
            aria-label="Copy Bitcoin address"
            icon={<FiCopy />}
            onClick={() => copyText(accountData.receiveAddress)}
          />
        </Stack>
        <Image
          boxSize="250px"
          src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${accountData.receiveAddress}`}
        />
      </>
    );
  }

  return <Text>SendDust</Text>;
}

export default SendDust;
