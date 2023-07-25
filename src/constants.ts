import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { SignatureData } from "micro-stacks/connect";

/////////////////////////
// CONSTANTS
/////////////////////////

export const registrationSteps = [
  { title: "Connect Wallet", description: "Step 1" },
  { title: "Sign Message", description: "Step 2" },
  { title: "Send Dust", description: "Step 3" },
];

// https://docs.1btc.chat/1btc-chat-api
export const apiUrl = "https://1btc-api.console.xyz";

/////////////////////////
// TYPES
/////////////////////////

// define locally stored data keyed by STX address
export type UserData = {
  [key: string]: {
    accountData?: AccountData;
    signatureMsg?: string; // https://1btc-api.console.xyz/get-hiro-signature-message
    signatureData?: SignatureData;
  };
};

// signature message returned from the API
export type SignatureMessage = {
  msg: string;
};

// registration data returned from the API
// https://1btc-api.console.xyz/register-hiro
export type AccountData = {
  owner: string;
  receiveAddress: string;
  origin: string | null;
  status: "pending" | "valid" | "insufficient";
};

/////////////////////////
// LOCAL STORAGE ATOMS
// updated by components
// used to persist on close/open
/////////////////////////

// stacks addres from wallet
export const stxAddressAtom = atomWithStorage<string | null>(
  "1btc-stxAddress",
  null
);

// account data from API
export const accountDataAtom = atomWithStorage<AccountData | null>(
  "1btc-accountData",
  null
);

// signature message from API
export const signatureMsgAtom = atomWithStorage<string | null>(
  "1btc-signatureMsg",
  null
);

// signature data from wallet
export const signatureDataAtom = atomWithStorage<SignatureData | null>(
  "1btc-signatureData",
  null
);

// registration response from API
// matches account object
export const registrationResponseAtom = atomWithStorage<AccountData | null>(
  "1btc-registrationResponse",
  null
);

/////////////////////////
// ATOMS
// updated by components
// used to trigger API calls
/////////////////////////

// verification status based on existing data
export const isValid = atom((get) => {
  const accountData = get(accountDataAtom);
  //console.log("isValid: accountData status:", accountData?.status);
  return accountData?.status === "valid";
});

// registration status based on existing data
export const isRegistered = atom((get) => {
  const accountData = get(accountDataAtom);
  return accountData ? true : false;
});

// active step based on existing data
export const activeStepAtom = atom((get) => {
  const stxAddress = get(stxAddressAtom);
  const accountData = get(accountDataAtom);
  const signatureData = get(signatureDataAtom);
  if (!stxAddress) {
    return 0;
  }
  if (signatureData) {
    return 2;
  }
  if (accountData) {
    if (accountData.status === "insufficient") {
      return 4;
    }
    if (accountData.status === "valid") {
      return 3;
    }
    if (accountData.status === "pending") {
      return 2;
    }
  } else {
    // no accountData
    return 1;
  }
  // default return
  return 0;
});

/////////////////////////
// LOADABLE ASYNC ATOMS
// updated by API calls
/////////////////////////

// fetch account data from API
export const fetchAccountDataAtom = atom(async (get) => {
  const stxAddress = get(stxAddressAtom);
  if (!stxAddress) {
    return undefined;
  }
  try {
    const accountData = await getAccountData(stxAddress);
    return accountData;
  } catch (error) {
    console.error(`Failed to fetch account data for ${stxAddress}:`, error);
    return undefined;
  }
});

// fetch signature message from API
export const fetchSignatureMsgAtom = atom(async (get) => {
  const stxAddress = get(stxAddressAtom);
  if (!stxAddress) {
    return undefined;
  }
  try {
    const signatureMsg = await postSignatureMsg(stxAddress);
    return signatureMsg?.msg;
  } catch (error) {
    console.error(
      `Failed to fetch signature message for ${stxAddress}:`,
      error
    );
    return undefined;
  }
});

// fetch registration response from API
export const fetchRegistrationResponseAtom = atom(async (get) => {
  const accountData = get(accountDataAtom);
  const signatureData = get(signatureDataAtom);
  if (accountData) {
    return accountData;
  }
  if (!signatureData) {
    return undefined;
  }
  try {
    //console.log("registrationResponseAtom: fetching registrationResponse");
    const registrationResponse = await postRegistrationResponse(signatureData);
    return registrationResponse;
  } catch (error) {
    console.error(
      `Failed to fetch registration response for ${signatureData}:`,
      error
    );
    return undefined;
  }
});

// fetch transaction details for BTC address
export const fetchBtcTxsAtom = atom(async (get) => {
  const accountData = get(accountDataAtom);
  if (!accountData) {
    return undefined;
  }
  try {
    const btcTxsResponse = await getBtcTxs(accountData.receiveAddress);
    return btcTxsResponse;
  } catch (error) {
    console.error(
      `Failed to fetch BTC transactions for ${accountData.receiveAddress}:`,
      error
    );
    return undefined;
  }
});

/////////////////////////
// HELPER FUNCTIONS
/////////////////////////

export async function getAccountData(
  stxAddress: string
): Promise<AccountData | undefined> {
  const accountQuery = await fetch(`${apiUrl}/account/${stxAddress}`);
  return accountQuery.status === 200 ? await accountQuery.json() : undefined;
}

export async function getBtcTxs(btcAddress: string) {
  const btcTxQuery = await fetch(
    `https://blockchain.info/rawaddr/${btcAddress}`
  );
  return btcTxQuery.status === 200 ? await btcTxQuery.json() : undefined;
}

async function postSignatureMsg(
  stxAddress: string
): Promise<SignatureMessage | undefined> {
  const signatureMsgQuery = await fetch(`${apiUrl}/get-hiro-signature-msg`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet: stxAddress }),
  });
  return signatureMsgQuery.status === 200
    ? await signatureMsgQuery.json()
    : undefined;
}

async function postRegistrationResponse(
  signatureData: SignatureData
): Promise<AccountData | undefined> {
  //console.log(`fetchRegistrationResponse`);
  const registrationResponseQuery = await fetch(`${apiUrl}/register-hiro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signatureData),
  });
  //console.log(
  //  `registrationResponseQuery`,
  //  JSON.stringify(registrationResponseQuery, null, 2)
  //);
  return registrationResponseQuery.status === 200
    ? await registrationResponseQuery.json()
    : undefined;
}
