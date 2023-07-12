import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";

function ConnectWallet() {
  const { openAuthRequest, isRequestPending } = useAuth();
  return (
    <Button
      variant="1btc-orange"
      size="xl"
      disabled={isRequestPending}
      onClick={() => void openAuthRequest()}
    >
      Connect Wallet
    </Button>
  );
}

export default ConnectWallet;
