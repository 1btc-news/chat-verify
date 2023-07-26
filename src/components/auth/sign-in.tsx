import { Button } from "@chakra-ui/react";
import { useAuth } from "@micro-stacks/react";
import { useAtom, useSetAtom } from "jotai";
import {
  accountDataAtom,
  signatureDataAtom,
  signatureMsgAtom,
  stxAddressAtom,
} from "../../constants";

function SignIn(props: { variant?: string }) {
  const { openAuthRequest, isRequestPending } = useAuth();
  const [stxAddress, setStxAddress] = useAtom(stxAddressAtom);
  const setAccountData = useSetAtom(accountDataAtom);
  const setSignatureMsg = useSetAtom(signatureMsgAtom);
  const setSignatureData = useSetAtom(signatureDataAtom);

  return (
    <Button
      variant={props.variant || "1btc-orange"}
      title="Connect Wallet"
      isLoading={isRequestPending}
      onClick={() =>
        void openAuthRequest({
          onFinish: (session) => {
            if (session.addresses.mainnet !== stxAddress) {
              setStxAddress(session.addresses.mainnet);
              setAccountData(null);
              setSignatureMsg(null);
              setSignatureData(null);
            }
          },
          onCancel: () => {
            // console.log("sign-in: ser cancelled auth request");
          },
        })
      }
    >
      Connect Wallet
    </Button>
  );
}

export default SignIn;
