import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { AccountData, fetchAccountDataAtom } from "../constants";

export const useAccountData = (): {
  isLoading: boolean;
  hasError: boolean;
  hasData: boolean;
  error?: unknown;
  data?: AccountData;
} => {
  const accountDataLoader = loadable(fetchAccountDataAtom);
  const [accountData] = useAtom(accountDataLoader);

  const isLoading = accountData.state === "loading";
  const hasError = accountData.state === "hasError";
  const hasData = accountData.state === "hasData";

  const error = hasError ? accountData.error : undefined;
  const data = hasData ? accountData.data : undefined;

  return { isLoading, hasError, hasData, error, data };
};
