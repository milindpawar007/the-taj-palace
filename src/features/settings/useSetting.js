import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting(){
    const {isPending:isLoading,error,data:settings} = 
    useQuery({
        queryKey:['settings'],
        queryFn:getSettings,
        staleTime: 60_000,
    })

    return{ isLoading ,error ,settings}
}