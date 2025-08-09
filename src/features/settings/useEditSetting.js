import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export default function useEditSetting(){
    const queryClient = useQueryClient();
    const { mutate: editSetting, isPending: isEditing } = useMutation({
    mutationFn: ( newData ) => updateSetting(newData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success(' Settings Edited successfully!');
    
    },
    onError: (err) => toast.error(`Failed to edit the Setting: ${err.message}`)
  });

  return {editSetting,isEditing}
}