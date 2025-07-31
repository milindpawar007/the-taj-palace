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


export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query=supabase.from('cabins');

  // Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]).select().single();
  }
  // Edit
  else {
    query = supabase.from('cabins').update({ ...newCabin, image: imagePath }).eq('id', id).select().single();
  }

  const { data, error } = await query;

  if (error) {
    // If creating, try deleting partial data
    if (!id && data?.id) {
      await supabase.from('cabins').delete().eq('id', data.id);
    }

    console.error(error);
    throw new Error("Cabin could not be created/edited");
  }

  // Upload image (only if not already uploaded)
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.log(storageError);
      throw new Error("Cabin image could not be uploaded");
    }
  }

  return data; // ✅ FIXED: return correct variable
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