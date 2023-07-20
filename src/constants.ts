import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { SignatureData } from "micro-stacks/connect";

/////////////////////////
// CONSTANTS
/////////////////////////

export const registrationSteps = [
  { title: "First", description: "Connect Wallet" },
  { title: "Second", description: "Sign Message" },
  { title: "Third", description: "Send Dust" },
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

/////////////////////////
// ATOMS
// updated by components
// used to trigger API calls
/////////////////////////

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
  console.log("activeStepAtom: get results:", {
    stxAddress,
    accountData,
    signatureData,
  });
  if (!stxAddress) {
    console.log("activeStepAtom: no stx address, returning 0");
    return 0;
  }
  if (signatureData) {
    console.log("activeStepAtom: signature data detected, returning 2");
    return 2;
  }
  if (!accountData) {
    console.log("activeStepAtom: no account data, returning 1");
    return 1;
  }
  if (accountData) {
    if (accountData.status === "insufficient") {
      console.log("activeStepAtom: insufficient balance, returning 4");
      return 4;
    }
    if (accountData.status === "valid") {
      console.log("activeStepAtom: account valid, returning 3");
      return 3;
    }
    if (accountData.status === "pending") {
      console.log("activeStepAtom: account pending, returning 2");
      return 2;
    }
  } else {
    console.log("activeStepAtom: no account data, returning 1");
    return 1;
  }
  console.log("activeStepAtom: default, returning 0");
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
  const signatureData = get(signatureDataAtom);
  if (!signatureData) {
    return undefined;
  }
  try {
    console.log("registrationResponseAtom: fetching registrationResponse");
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

/////////////////////////
// HELPER FUNCTIONS
/////////////////////////

export async function getAccountData(
  stxAddress: string
): Promise<AccountData | undefined> {
  const accountQuery = await fetch(`${apiUrl}/account/${stxAddress}`);
  return accountQuery.status === 200 ? await accountQuery.json() : undefined;
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
  console.log(`fetchRegistrationResponse`);
  const registrationResponseQuery = await fetch(`${apiUrl}/register-hiro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signatureData),
  });
  console.log(
    `registrationResponseQuery`,
    JSON.stringify(registrationResponseQuery, null, 2)
  );
  return registrationResponseQuery.status === 200
    ? await registrationResponseQuery.json()
    : undefined;
}
