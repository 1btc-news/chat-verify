import { Link, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import SignIn from "../auth/sign-in";
import LearnMore from "./learn-more";

// active step = 0
// user progresses by connecting the wallet

function ConnectWallet() {
  return (
    <Stack direction={["column-reverse", "column"]} gap={8}>
      <Stack
        direction={["column", "row"]}
        justifyContent={["center", "space-between"]}
      >
        <Stack>
          <Text fontWeight="bold">
            Connect your Hiro or Xverse wallet to authenticate into 1btc's
            Fullcoiner chat.
          </Text>
          <UnorderedList>
            <ListItem>
              This wallet will be used to verify the required Bitcoin balance
            </ListItem>
            <ListItem>
              This wallet will be used to access and interact with the chat
            </ListItem>
            <ListItem>
              We currently support both{" "}
              <Link
                isExternal
                color="orange.500"
                href="https://wallet.hiro.so/wallet/install-web"
              >
                Hiro
              </Link>{" "}
              and{" "}
              <Link
                isExternal
                color="orange.500"
                href="https://www.xverse.app/"
              >
                Xverse
              </Link>{" "}
              wallets for login
            </ListItem>
          </UnorderedList>
        </Stack>
        <LearnMore href="https://docs.1btc.chat/verification/connect-wallet" />
      </Stack>
      <SignIn />
    </Stack>
  );
}

export default ConnectWallet;
