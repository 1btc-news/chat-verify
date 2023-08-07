import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { AccountData, fetchRegistrationResponseAtom } from "../constants";

export const useRegistrationResponse = (): {
  isLoading: boolean;
  hasError: boolean;
  hasData: boolean;
  error?: unknown;
  data?: AccountData;
} => {
  const registrationResponseLoader = loadable(fetchRegistrationResponseAtom);
  const [registrationResponse] = useAtom(registrationResponseLoader);

  const isLoading = registrationResponse.state === "loading";
  const hasError = registrationResponse.state === "hasError";
  const hasData = registrationResponse.state === "hasData";

  const error = hasError ? registrationResponse.error : undefined;
  const data = hasData ? registrationResponse.data : undefined;

  return { isLoading, hasError, hasData, error, data };
};
