import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteCabinsApi } from "../../services/apiBookings";


export default function  useDeleteBooking(){
      const queryClient = useQueryClient();
        const { mutate:deleteBooking, isPending:isDeleting } = useMutation({
            mutationFn: (id) => deleteCabinsApi(id),
            onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['booking'] });
            toast.success('Booking Deleted successfully!');
            },
            onError: (err) => toast.error(`Failed to delete: ${err.message}`)
        });

        return {isDeleting ,deleteBooking}
}