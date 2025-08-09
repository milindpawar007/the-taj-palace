import { useQuery } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";

export default function useBookings (){
      const [searchParams] = useSearchParams();
      //1] filter
      const filterValue= searchParams.get('status');
      const filter= !filterValue || filterValue==="all"?null:{field:"status",value:filterValue}

      //2]sorting
      const sortByRaw= searchParams.get('sortBy')||"startDate-Desc";
      const [field,direction]= sortByRaw.split('-')
      const sortBy= {field,direction}

      const { isLoading, data: bookings, error } = useQuery({
        queryKey: ['bookings',{filter,sortBy}],
        queryFn: ()=>getBookings({filter,sortBy})
      });

      return {isLoading,bookings,error}
    
}