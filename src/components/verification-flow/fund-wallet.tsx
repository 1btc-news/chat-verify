import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import {
  Alert,
  AlertIcon,
  Box,
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
import { FiCopy } from "react-icons/fi";
import {
  accountDataAtom,
  getAccountData,
  stxAddressAtom,
} from "../../constants";
import { useClipboardToast } from "../../hooks/use-clipboard-toast";
import { FaQuestion } from "react-icons/fa";

// active step = 3
// account is registered but funds are insufficient
// queries account data from API
// once status changes from insufficient, progresses to next step

const queriedStxAddressAtom = atom<string | null>(null);

function FundWallet() {
  const [stxAddress] = useAtom(stxAddressAtom);
  const [queriedStxAddress, setQueriedStxAddress] = useAtom(
    queriedStxAddressAtom
  );
  const [accountData, setAccountData] = useAtom(accountDataAtom);
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
      console.log("insufficient-balance: fetching STX account", stxAddress);
      getAccountData(stxAddress).then((accountData) => {
        console.log("accountData: ", accountData);
        if (!accountData) return undefined;
        setQueriedStxAddress(null);
        if (accountData.status !== "insufficient") {
          setAccountData(accountData);
        }
      });
    };

    const intervalId = setInterval(fetchStxAccountStatus, 10000);

    return () => clearInterval(intervalId);
    // TODO: correct this dependency issue
  }, [stxAddress]);

  // verify STX address is known
  if (!stxAddress) {
    return null;
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
          Ensure your linked wallet address holds over 1 BTC to access 1btc's
          Fullcoiner chat.
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
              Insufficient Balance
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody p={4}>
              <UnorderedList>
                <ListItem>
                  To participate in 1btc chat a balance of more than 1 BTC must
                  be verified.
                </ListItem>
                <ListItem>
                  Your current balance does not meet this requirement.
                </ListItem>
                <ListItem>
                  To fix this, top up the wallet used for verification.
                </ListItem>
                <ListItem>
                  Remember, this ensures that all members of our exclusive chat
                  are Fullcoiners.
                </ListItem>
              </UnorderedList>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
      <Alert mb={8} variant="1btc-orange" status="warning">
        <AlertIcon boxSize="6" />
        <UnorderedList>
          <ListItem>
            The address below is detected from the dust transaction.
          </ListItem>
          <ListItem>
            Verify this address is yours using the transaction details in your
            wallet.
          </ListItem>
          <ListItem>
            Once sent, do not spend the Bitcoin used to verify in order to
            retain access.
          </ListItem>
        </UnorderedList>
      </Alert>
      {accountData && (
        <>
          <Stack
            direction={["column", "row"]}
            justifyContent="space-between"
            alignItems="center"
            mb={8}
          >
            <Box my={4} fontWeight="bold">
              Send Bitcoin to your address below so the balance is over 1 BTC.
              <Text mt={4} color="orange.500" overflowWrap="anywhere">
                {accountData.origin}{" "}
                <IconButton
                  variant="1btc-orange"
                  size="sm"
                  ml={4}
                  aria-label="Copy Bitcoin address"
                  title="Copy Bitcoin address"
                  icon={<FiCopy />}
                  onClick={() => copyText(accountData.origin)}
                />
              </Text>
            </Box>
            <Image
              m="auto"
              boxSize="200px"
              src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${accountData.origin}`}
            />
          </Stack>
          <Stack direction="row" mt={4}>
            <Spinner color="orange.500" emptyColor="orange.200" />
            <Text>Awaiting funds in verified account...</Text>
          </Stack>
        </>
      )}
    </>
  );
}

export default FundWallet;
