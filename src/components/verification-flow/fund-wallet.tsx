import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import {
  Alert,
  IconButton,
  ListItem,
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
import LearnMore from "./learn-more";

// active step = 4
// account is registered but funds are insufficient
// uses queried account data from API
// user progresses when status changes from insufficient

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
    <Stack direction={["column-reverse", "column"]} gap={8}>
      <Stack
        direction={["column", "row"]}
        justifyContent={["center", "space-between"]}
      >
        <Stack>
          <Text fontWeight="bold">
            The linked wallet address must hold more than 1 BTC to access 1btc
            Chat.
          </Text>
          <UnorderedList>
            <ListItem>
              Your current balance does not meet the requirement
            </ListItem>
            <ListItem>This can be fixed by funding the linked address</ListItem>
            <ListItem>
              Verify the address in your wallet software and transaction history
            </ListItem>
          </UnorderedList>
          <Alert my={8} variant="1btc-orange" status="warning">
            <Stack>
              <Text>
                The address below is detected from the dust transaction used to
                verify.
              </Text>
              {accountData && (
                <Text
                  fontWeight="bold"
                  mt={4}
                  color="orange.500"
                  overflowWrap="anywhere"
                >
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
              )}
            </Stack>
          </Alert>
          <Text>Once refilled, this page will automatically update.</Text>
        </Stack>
        <LearnMore href="https://docs.1btc.chat" />
      </Stack>
    </Stack>
  );
}

export default FundWallet;
