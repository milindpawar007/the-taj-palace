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


export  async function createCabin(newCabin){


const { data:cabin, error } = await supabase
  .from('cabins')
  .insert([newCabin])
  .select()


    if(error)
  {
      console.log(error);
      throw new Error ("cabins could not be deleted")
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