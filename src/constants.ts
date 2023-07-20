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
type UserData = {
  [key: string]: {
    accountData?: AccountData;
    signatureMsg?: string; // https://1btc-api.console.xyz/get-hiro-signature-message
    signatureData?: SignatureData;
  };
};

// signature message returned from the API
type SignatureMessage = {
  msg: string;
};

// registration data returned from the API
// https://1btc-api.console.xyz/register-hiro
type AccountData = {
  owner: string;
  receiveAddress: string;
  origin: string | null;
  status: "pending" | "valid" | "insufficient";
};

/////////////////////////
// LOCAL STORAGE ATOMS
// updated by components
/////////////////////////

export const storedUserDataAtom = atomWithStorage<UserData | null>(
  "userData",
  null
);

// new approach
//   individual atoms like they should be
//   updated by components
// user data derived automatically
//   fetch checks object first
//   returns value from API if not
//   naturally should update user data?
// double check flows
//   set data on login
//   clear data on logout
//   clear object on clear data

export const activeStxAddressAtom = atomWithStorage<string | null>(
  "stxAddress",
  null
);

export const activeStepAtom = atomWithStorage("activeStep", 0);

export const activeAccountDataAtom = atomWithStorage<AccountData | null>(
  "accountData",
  null
);

export const activeSignatureMsgAtom = atomWithStorage<string | null>(
  "signatureMsg",
  null
);

export const activeSignatureDataAtom = atomWithStorage<SignatureData | null>(
  "signatureData",
  null
);

/////////////////////////
// ACCOUNT DATA ATOM
/////////////////////////

// returns value if known, otherwise fetches it from API
export const fetchAccountDataAtom = atom(async (get) => {
  const stxAddress = get(activeStxAddressAtom);
  if (stxAddress === null) {
    throw new Error("STX Address is null");
  }
  const userData = get(storedUserDataAtom);
  console.log(
    "userData from fetchAccountDataAtom():",
    JSON.stringify(userData, null, 2)
  );
  if (userData && userData[stxAddress] && userData[stxAddress].accountData) {
    console.log(`accountData returned from object`);
    return userData[stxAddress].accountData;
  } else {
    console.log(`accountData fetched from API`);
    const accountData = await fetchAccountData(stxAddress);
    return accountData;
  }
});

// This derived atom will update storedUserDataAtom based on the status of accountData
export const updateAccountDataAtom = atom(
  (get) => {
    const userData = get(storedUserDataAtom);
    const accountData = get(activeAccountDataAtom);
    const activeStxAddress = get(activeStxAddressAtom);

    if (!userData || !accountData || !activeStxAddress) {
      return userData;
    }

    return {
      ...userData,
      [activeStxAddress]: {
        ...userData[activeStxAddress],
        accountData: accountData,
      },
    };
  },
  (get, set) => {
    // When this atom is set, it also updates storedUserDataAtom
    set(storedUserDataAtom, get(updateAccountDataAtom));
  }
);

/////////////////////////
// SIGNATURE MSG ATOM
/////////////////////////

// returns value if known, otherwise fetches it from API
export const fetchSignatureMsgAtom = atom(async (get) => {
  const stxAddress = get(activeStxAddressAtom);
  if (stxAddress === null) {
    throw new Error("STX Address is null");
  }
  const userData = get(storedUserDataAtom);
  if (userData && userData[stxAddress] && userData[stxAddress].signatureMsg) {
    console.log(`signatureMsg returned from object`);
    return userData[stxAddress].signatureMsg;
  } else {
    console.log(`signatureMsg fetched from API`);
    const signatureMsg = await fetchSignatureMsg(stxAddress);
    return signatureMsg?.msg;
  }
});

// This derived atom will update storedUserDataAtom based on the status of signatureMsg
export const updateSignatureMsgAtom = atom(
  (get) => {
    const userData = get(storedUserDataAtom);
    const signatureMsg = get(activeSignatureMsgAtom);
    const activeStxAddress = get(activeStxAddressAtom);

    if (!userData || !signatureMsg || !activeStxAddress) {
      return userData;
    }

    return {
      ...userData,
      [activeStxAddress]: {
        ...userData[activeStxAddress],
        signatureMsg: signatureMsg,
      },
    };
  },
  (get, set) => {
    // When this atom is set, it also updates storedUserDataAtom
    set(storedUserDataAtom, get(updateSignatureMsgAtom));
  }
);

/////////////////////////
// REGISTRATION ATOM
/////////////////////////

// returns value if known, otherwise fetches it from API
export const fetchRegistrationResponseAtom = atom(async (get) => {
  const stxAddress = get(activeStxAddressAtom);
  if (stxAddress === null) {
    throw new Error("STX Address is null");
  }
  const userData = get(storedUserDataAtom);
  if (userData && userData[stxAddress] && userData[stxAddress].accountData) {
    console.log(`registrationResponse returned from object`);
    return userData[stxAddress].accountData;
  } else {
    console.log(`registrationResponse fetched from API`);
    if (userData && userData[stxAddress]) {
      const accountData = await fetchRegistrationResponse(
        userData[stxAddress].signatureData!
      );
      return accountData;
    }
    throw new Error("User data or signature data is undefined");
  }
});

/////////////////////////
// HELPER FUNCTIONS
/////////////////////////

export async function fetchAccountData(
  stxAddress: string
): Promise<AccountData | undefined> {
  const accountQuery = await fetch(`${apiUrl}/account/${stxAddress}`);
  return accountQuery.status === 200 ? await accountQuery.json() : undefined;
}

async function fetchSignatureMsg(
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

async function fetchRegistrationResponse(
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
