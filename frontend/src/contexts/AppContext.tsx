import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";

//const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";
//مهم اعادة فهم الشرح الخاس بالفكرة من دقيقة 32 بعد الساعتين  بالفيديو مهم جدا مثال عملي على الكونتكست

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);
const stripePromise = loadStripe(
  "pk_test_51P5UNZA3qwHQSd2TR0f4hplKGY4nqyYhP7QLyfy0HgqHcaQSxthNRwEMeFTpE8q1OGFYx5pF8cTJbBGK7IZcemN600f5hnchyz"
);
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        stripePromise,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => {
            setToast(undefined);
          }}
        ></Toast>
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
