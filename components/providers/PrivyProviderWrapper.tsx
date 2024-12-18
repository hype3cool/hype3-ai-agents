"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors, useFundWallet } from "@privy-io/react-auth/solana";

const solanaConnectors = toSolanaWalletConnectors({
  shouldAutoConnect: true,
});

export default function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        embeddedWallets: {
          createOnLogin: "all-users", // 'off', 'users-without-wallets', and 'all-users'
          requireUserPasswordOnCreate: false,
        },
        appearance: {
          // Use 'solana-only' or 'ethereum-and-solana'
          walletChainType: "solana-only",
          logo: "/assets/images/hype3-full-logo.png",
          landingHeader: "Welcome to Hype3",
          accentColor: "#6A6FF5",
          theme: "#222224",
          showWalletLoginFirst: false,
          walletList: ["detected_solana_wallets"],
        },
        externalWallets: {
          solana: {
            connectors: solanaConnectors,
          },
        },
        loginMethods: ["email", "wallet", "google", "twitter"],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
        mfa: {
          noPromptOnMfaRequired: false,
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
