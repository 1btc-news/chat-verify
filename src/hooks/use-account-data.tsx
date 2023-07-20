import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { fetchAccountDataAtom } from "../constants";

export const useAccountData = () => {
  const accountDataLoader = loadable(fetchAccountDataAtom);
  const [accountData] = useAtom(accountDataLoader);

  const isLoading = accountData.state === "loading";
  const hasError = accountData.state === "hasError" && "error" in accountData;
  const hasData = accountData.state === "hasData";

  const error = hasError ? accountData.error : undefined;
  const data = hasData ? accountData.data : undefined;

  return { isLoading, hasError, hasData, error, data };
};
