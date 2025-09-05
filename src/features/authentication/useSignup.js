import { useMutation } from "@tanstack/react-query"
import { signup as singupApi} from "../../services/apiAuth"
import toast from "react-hot-toast";

function useSignup() {
  const {mutate:signup ,isloading}=  useMutation({
    mutationFn:singupApi ,
    onSuccess:(user)=>{
         console.log(user);
         toast.success('Account Sucessfully created ! Please Verify the new account from the users email address')
    }
  })

  return {signup ,isloading}
}

export default useSignup
