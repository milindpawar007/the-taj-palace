import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../services/apiCabins";

export default function useEditCabin(){
    const queryClient = useQueryClient();
      const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success(' Cabin Edited successfully!');
    
    },
    onError: (err) => toast.error(`Failed to add the cabin: ${err.message}`)
  });

  return {editCabin,isEditing}
}