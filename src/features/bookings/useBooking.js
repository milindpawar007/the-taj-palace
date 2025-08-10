import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export default function useBooking (){

   const { bookingId } = useParams();      // MUST match your route name
   const idNum = Number(bookingId);   

      const { isLoading, data: booking, error } = useQuery({
        queryKey: ['booking',idNum],
        queryFn:()=> getBooking(idNum),
         enabled: Number.isInteger(idNum),
        retry:false,
      });

      return {isLoading,booking,error}
    
}