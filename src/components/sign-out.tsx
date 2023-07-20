import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";

function SignOut() {
  const { signOut } = useAuth();
  return (
    <Button
      variant="1btc-orange"
      onClick={() => {
        // sign out of the wallet
        try {
          signOut();
        } catch (error) {
          console.error("Error while signing out: ", error);
        }
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOut;
