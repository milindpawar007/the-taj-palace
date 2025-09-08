import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";


export default function useBookings (){
      const queryClient = useQueryClient()
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
      
      //query  
      const {   isLoading,
                data: { bookings = [], 
                count } = {},   
                error } = useQuery({
        queryKey: ['bookings',{filter,sortBy,page}],
        queryFn: ()=>getBookings({filter,sortBy,page})
      });
      
   

      //preFetching
     const pageCount= Math.ceil(count/PAGE_SIZE)
      if(page<pageCount)
      {
        queryClient.prefetchQuery({
          queryKey: ['bookings',{filter,sortBy,page:page+1}],
          queryFn: ()=>getBookings({filter,sortBy,page:page+1})
        })
    }
     if(page>1)
      {
        queryClient.prefetchQuery({
          queryKey: ['bookings',{filter,sortBy,page:page-1}],
          queryFn: ()=>getBookings({filter,sortBy,page:page-1})
        })
    }
      return {isLoading,bookings,error,count}
    
}