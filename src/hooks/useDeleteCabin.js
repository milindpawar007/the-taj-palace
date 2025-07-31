import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabins as deleteCabinsApi } from "../services/apiCabins";


export function  useDeleteCabins({id}){
      const queryClient = useQueryClient();
        const { mutate:deleteCabin, isPending:isDeleting } = useMutation({
            mutationFn: (id) => deleteCabinsApi(id),
            onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
            toast.success('Cabin deleted successfully!');
            },
            onError: (err) => toast.error(`Failed to delete: ${err.message}`)
        });

        return {isDeleting ,deleteCabin}
}