import {
  Box,
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
import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { FaQuestion } from "react-icons/fa";
import { FiCopy, FiSearch } from "react-icons/fi";
import { useClipboardToast } from "../../hooks/use-clipboard-toast";
import {
  accountDataAtom,
  getAccountData,
  insufficientBalanceToggleAtom,
  stxAddressAtom,
} from "../../constants";
import AccessInfoAlert from "./access-info-alert";

const queriedStxAddressAtom = atom<string | null>(null);

function InsufficientBalance() {
  const [stxAddress] = useAtom(stxAddressAtom);
  const [queriedStxAddress, setQueriedStxAddress] = useAtom(
    queriedStxAddressAtom
  );
  const [insufficientBalanceToggle, setInsufficientBalanceToggle] = useAtom(
    insufficientBalanceToggleAtom
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
        return accountData;
      });
    };

    const intervalId = setInterval(fetchStxAccountStatus, 10000);

    return () => clearInterval(intervalId);
    // TODO: correct this dependency issue
  }, [stxAddress]);

  if (insufficientBalanceToggle) {
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
            <Text>Verifying origin balance...</Text>
          </Stack>
        </Stack>
        <AccessInfoAlert />
        <Button
          variant="1btc-orange"
          title="Take me back!"
          onClick={() => setInsufficientBalanceToggle(false)}
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
        <Box my={4} fontWeight="bold">
          Ensure your wallet holds over 1 BTC to access 1btc's Fullcoiner chat.
          {accountData && (
            <>
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
                <IconButton
                  variant="1btc-orange"
                  ml={4}
                  aria-label="View on mempool.space"
                  title="View on mempool.space"
                  icon={<FiSearch />}
                  size="sm"
                  as="a"
                  href={`https://mempool.space/address/${accountData.origin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </Text>
            </>
          )}
        </Box>
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
      <Button
        variant="1btc-orange"
        title="I've sent it!"
        onClick={() => setInsufficientBalanceToggle(true)}
      >
        I've refilled it!
      </Button>
    </>
  );
}

export default InsufficientBalance;
