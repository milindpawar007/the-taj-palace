import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { duplicateCabin as duplicateCabinAPI } from "../services/apiCabins";

// ✅ FIXED useDuplicateCabin.js
export default function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const { mutate: duplicateCabin ,isPending:isCreating } = useMutation({
    mutationFn: ({ id }) => duplicateCabinAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success("Cabin duplicated successfully!");
    },
    onError: (err) => toast.error(`Failed to duplicate cabin: ${err.message}`),
  });

  return { duplicateCabin ,isCreating };
}
