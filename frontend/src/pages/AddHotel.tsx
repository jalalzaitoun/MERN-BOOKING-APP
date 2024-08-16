import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: async () => {
      showToast({ message: "Hotel saved!", type: "SUCCESS" });
      //السطر القادم من اجل عملية اعادة التحقق بعد التسجيل وفي متلها مشان تحقق من بعد الخروج من  التطبيق حتى تتغير الواجهة
      // await queryClient.invalidateQueries("validateToken");
      // navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
