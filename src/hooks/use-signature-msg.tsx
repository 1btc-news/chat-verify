import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { fetchSignatureMsgAtom } from "../constants";

export const useSignatureMsg = () => {
  const signatureMsgLoader = loadable(fetchSignatureMsgAtom);
  const [signatureMsg] = useAtom(signatureMsgLoader);

  const isLoading = signatureMsg.state === "loading";
  const hasError = signatureMsg.state === "hasError" && "error" in signatureMsg;
  const hasData = signatureMsg.state === "hasData";

  // console.log("use-signature-msg: state", signatureMsg.state);
  // console.log(
  //   "use-signature-msg: data",
  //   hasData ? signatureMsg.data : "no hasData"
  // );

  const error = hasError ? signatureMsg.error : undefined;
  const data = hasData ? signatureMsg.data : undefined;

  return { isLoading, hasError, hasData, error, data };
};
