import { Box, Text } from "@chakra-ui/react";
import { useAccount } from "@micro-stacks/react";
import ConnectWallet from "./connect-wallet";
import SignOut from "./sign-out";

function Content() {
  const { stxAddress } = useAccount();

  if (!stxAddress) {
    return (
      <Box>
        <Text>Connect your wallet to verify.</Text>
        <ConnectWallet />
      </Box>
    );
  }

  return (
    <Box>
      <Text fontSize="xl">{stxAddress}</Text>
      <SignOut />
    </Box>
  );
}

export default Content;
