import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
const SingOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      //السطر القادم من اجل عملية اعادة التحقق بعد التسجيل وفي متلها مشان تحقق من بعد الخروج من  التطبيق حتى تتغير الواجهة

      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white"
    >
      Sign out
    </button>
  );
};

export default SingOutButton;
