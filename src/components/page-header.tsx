import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useAccount } from "@micro-stacks/react";
import OneBtcLogo from "./1btc-logo";
import SignIn from "./sign-in";
import SignOut from "./sign-out";

function Header() {
  const { stxAddress } = useAccount();
  return (
    <Flex align="center">
      <OneBtcLogo width="45px" height="45px" />
      <Flex flexGrow="1" ml={2} align="center">
        <Heading size="md">1btc</Heading>
      </Flex>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        {stxAddress === undefined ? (
          <SignIn />
        ) : (
          <>
            <Text>{`${stxAddress.slice(0, 5)}...${stxAddress.slice(-5)}`}</Text>
            <SignOut />
          </>
        )}
      </Stack>
    </Flex>
  );
}

export default Header;
