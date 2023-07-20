import { useAtom } from "jotai";
import { fetchBtcTxsAtom } from "../constants";
import { loadable } from "jotai/utils";

export const useBtcTxsResponse = () => {
  const btcTxsResponseLoader = loadable(fetchBtcTxsAtom);
  const [btcTxsResponse] = useAtom(btcTxsResponseLoader);

  const isLoading = btcTxsResponse.state === "loading";
  const hasError =
    btcTxsResponse.state === "hasError" && "error" in btcTxsResponse;
  const hasData = btcTxsResponse.state === "hasData";

  const error = hasError ? btcTxsResponse.error : undefined;
  const data = hasData ? btcTxsResponse.data : undefined;

  return { isLoading, hasError, hasData, error, data };
};
