import { useQuery } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";


export default function useBookings (){
      const [searchParams] = useSearchParams();
      //1] filter
      const filterValue= searchParams.get('status');
      const filter= !filterValue || filterValue==="all"?null:{field:"status",value:filterValue}

      //2]sorting
      const sortByRaw= searchParams.get('sortBy')||"startDate-desc";
      const [field,direction]= sortByRaw.split('-')
      const sortBy= {field,direction}


      //PAginiation
        const page = !searchParams.get('page') ?
          1 : Number(searchParams.get('page'))
      

      const {   isLoading,
                data: { bookings = [], 
                count } = {},   
                error } = useQuery({
        queryKey: ['bookings',{filter,sortBy,page}],
        queryFn: ()=>getBookings({filter,sortBy,page})
      });

      return {isLoading,bookings,error,count}
    
}