import { Box, Text, Spinner, Stack } from "@chakra-ui/react";
import { useAccount } from "@micro-stacks/react";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import {
  fetchAccountDataAtom,
  storedStxAddressAtom,
  storedUserDataAtom,
} from "../constants";
import ConnectWallet from "./connect-wallet";
import SignOut from "./sign-out";
import VerificationFlow from "./verification-flow";
import ClearData from "./clear-data";

function Content() {
  const { stxAddress } = useAccount();
  const [storedStxAddress] = useAtom(storedStxAddressAtom);
  const [storedUserData] = useAtom(storedUserDataAtom);
  const accountDataLoader = loadable(fetchAccountDataAtom);
  const [accountData] = useAtom(accountDataLoader);

  // if user is not logged in already
  if (!stxAddress || !storedStxAddress || !storedUserData) {
    return (
      <Box>
        <Text>A wallet connection is required to verify with 1BTC.</Text>
        <ConnectWallet />
      </Box>
    );
  }

  // if user is logged in, check if account data is loaded
  return (
    <Box>
      {accountData.state === "loading" && (
        <>
          <Spinner color="orange.500" emptyColor="gray.200" />
          <Text>Loading account data...</Text>
        </>
      )}
      {accountData.state === "hasError" && (
        <>
          <Text>There was an error, please sign out and try again.</Text>
          <Text>{String(accountData.error)}</Text>
        </>
      )}
      {accountData.state === "hasData" && <VerificationFlow />}
      <Stack direction="row">
        <ClearData />
        <SignOut />
      </Stack>
    </Box>
  );
}

export default Content;
