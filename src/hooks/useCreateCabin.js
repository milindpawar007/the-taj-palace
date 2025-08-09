import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../services/apiCabins";

export default function useCreateCabin ()
{


  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('New Cabin added successfully!');
     // reset();
    },
    onError: (err) => toast.error(`Failed to add the cabin: ${err.message}`)
  });

  return {createCabin,isCreating}

}