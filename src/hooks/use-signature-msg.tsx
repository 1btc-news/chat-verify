import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { fetchSignatureMsgAtom } from "../constants";

export const useSignatureMsg = (): {
  isLoading: boolean;
  hasError: boolean;
  hasData: boolean;
  error?: unknown;
  data?: string;
} => {
  const signatureMsgLoader = loadable(fetchSignatureMsgAtom);
  const [signatureMsg] = useAtom(signatureMsgLoader);

  const isLoading = signatureMsg.state === "loading";
  const hasError = signatureMsg.state === "hasError";
  const hasData = signatureMsg.state === "hasData";

  const error = hasError ? signatureMsg.error : undefined;
  const data = hasData ? signatureMsg.data : undefined;

  return { isLoading, hasError, hasData, error, data };
};
