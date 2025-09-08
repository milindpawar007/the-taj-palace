
import supabase, { supabaseUrl } from "./supabase";

export default async function login({email,password}){

    
    let { data, error } = await supabase.auth.signInWithPassword({   email: String(email).trim(), password: String(password), })

    if(error){throw new Error(error.message)}


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

export async function signup({ fullName, email, password }) {


  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, avatar: "" } },
  });
  if (error) throw error;

  const { error: updErr } = await supabase.auth.updateUser({
    data: { full_name: fullName, avatar: "" },
  });
  if (updErr) throw updErr;

  await supabase.auth.refreshSession(); // pull new claims
  return data;
}

export async function updateCurrentUser({ password,fullName,avatar }) {
    let updateData;
    if(password) updateData={password}
    if(fullName) updateData={data: { full_name: fullName }}
    //1. udapte the password or fullName
    const {data,error}= await supabase.auth.updateUser(updateData)
     if(error){throw new Error(error.message)}

     if(!avatar) return data
    //2. update the avatar image
    const fileName=`avatar-${data.user.id}-${Math.random()}`;
    const {error:storageError}= await supabase.storage.from('avatars').update(fileName,avatar)
    if(storageError){throw new Error(storageError.message)}
    //3. Update  avatart in user 
    const {data:updateduser,error:updateduserError}= await supabase.auth.updateUser({
        data:{
            avatar:`${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        }
    });
     if(updateduserError){throw new Error(error.message)}
     return updateduser;
}
