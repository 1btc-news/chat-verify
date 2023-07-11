import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";

function SignOut() {
  const { signOut } = useAuth();
  return <Button onClick={() => void signOut()}>Sign Out</Button>;
}

export default SignOut;
