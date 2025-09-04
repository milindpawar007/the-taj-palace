
import supabase from "./supabase";

export default async function login({email,password}){

    
    let { data, error } = await supabase.auth.signInWithPassword({   email: String(email).trim(), password: String(password), })

    if(error){throw new Error(error.message)}

    console.log(data)
    return {data}
}


export async function getCurrentUser (){
    const { data: { session }, error: sessionError}= await supabase.auth.getSession();
     if (sessionError) throw sessionError;
   
    if (!session) return null;

    const {data,error} = await supabase.auth.getUser()
   
    if(error){throw new Error(error.message)}

    return data?.user ?? null;
}


export async function logout (){
     const {error}=await supabase.auth.signOut();
    if(error){throw new Error(error.message)}
}