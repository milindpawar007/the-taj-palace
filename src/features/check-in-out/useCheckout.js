import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";


export default function useCheckout(){

    const queryClient = useQueryClient();

    const {mutate:checkOut,isLoading:isCheckingOut}= useMutation (
        {   mutationFn:(bookingId)=> updateBooking(bookingId, {status:'checked-out'}),
            onSuccess : (data)=>
            {
                toast.success(`Booking #${data.id} sucessfully Checked Out`);
                queryClient.invalidateQueries({active:true});
               
            },
            onError :()=>{
                toast.error(`error while checked Out`);
            }
       }
    );

    return {checkOut,isCheckingOut}

}