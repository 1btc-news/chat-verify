import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { signatureMsgAtom } from "../constants";

export const useSignatureMsg = () => {
  const signatureMsgLoader = loadable(signatureMsgAtom);
  const [signatureMsg] = useAtom(signatureMsgLoader);

  const isLoading = signatureMsg.state === "loading";
  const hasError = signatureMsg.state === "hasError" && "error" in signatureMsg;
  const hasData = signatureMsg.state === "hasData";

  const error = hasError ? signatureMsg.error : undefined;
  const data = hasData ? signatureMsg.data : undefined;

  return { isLoading, hasError, hasData, error, data };
};
