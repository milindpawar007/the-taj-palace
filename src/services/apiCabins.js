import supabase from "./supabase";



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