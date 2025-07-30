import supabase, { supabaseUrl } from "./supabase";



export  async function getCabins()
{

    
const { data: cabins, error } = await supabase
  .from('cabins')
  .select('*');

  if(error)
  {
      console.log(error);
      throw new Error ("cabins could not be loaded")
  }


 
  return cabins

}


export  async function createCabin(newCabin){

   // "https://sedibfbnbjjwgloufiwn.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg"
  const imageName=`${Math.random()}-${newCabin.image.name}`.replaceAll('/',"");


    const imagePath =`${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`
  //create cabin
  const { data:cabin, error } = await supabase
    .from('cabins')
    .insert([{...newCabin,image:imagePath}])
    .select()


        if(error)
      {

          const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id',data.id)
            console.log(error);
            throw new Error ("cabins could not be created")
    }
  
  //upload image.

  const {error :storageError}= await supabase.storage
  .from("cabin-images")
  .upload(imageName,newCabin.image)

   if(storageError)
  {
      console.log(storageError);
      throw new Error ("cabins image could not be deleted")
  }
    return cabin

}




export  async function deleteCabins(id){

  const { error } = await supabase
  .from('cabins')
  .delete()
  .eq('id',id)

    if(error)
  {
      console.log(error);
      throw new Error ("cabins could not be deleted")
  }
 

}