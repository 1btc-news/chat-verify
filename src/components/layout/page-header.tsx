import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useAccount } from "@micro-stacks/react";
import OneBtcLogo from "./1btc-logo";
import SignIn from "../auth/sign-in";
import SignOut from "../auth/sign-out";
import ClearData from "../auth/clear-data";
import { stxAddressAtom } from "../../constants";
import { useAtom } from "jotai";

function Header() {
  const { stxAddress } = useAccount();
  const [storedStxAddress] = useAtom(stxAddressAtom);

  return (
    <Flex align="center" direction={["column", "row"]}>
      <Flex flexGrow="1" align="center">
        <OneBtcLogo width="45px" height="45px" />
        <Heading size="md" ml={2}>
          1btc
        </Heading>
      </Flex>
      <Stack direction={["column", "row"]} alignItems="center">
        <Text fontWeight="semibold" fontSize="md">
          {stxAddress === undefined && storedStxAddress
            ? `${storedStxAddress.slice(0, 5)}...${storedStxAddress.slice(-5)}`
            : stxAddress
            ? `${stxAddress.slice(0, 5)}...${stxAddress.slice(-5)}`
            : ""}
        </Text>
        <ClearData variant="1btc-orange-outline" />
        {stxAddress === undefined ? (
          <SignIn variant="1btc-orange-outline" />
        ) : (
          <SignOut variant="1btc-orange-outline" />
        )}
      </Stack>
    </Flex>
  );
}

export default Header;
