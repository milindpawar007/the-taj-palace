import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export default function useUpdateUser(){
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({user}) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast.success(' User acoount successfully Updated!');
    
    },
    onError: (err) => toast.error(`Failed to edit the Setting: ${err.message}`)
  });

  return {updateUser,isUpdating}
}




