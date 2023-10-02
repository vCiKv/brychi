import axios from "axios"

export const getSqlData = async ()=>{
  const dataInventory = await getApiData("inventory")
  const dataSales = await getApiData("sell")
  const dataOrders = await getApiData("buy")

  return {
    inventory:dataInventory,
    sales:dataSales,
    orders:dataOrders
  }

}
// export const getApiData = async(type:"buy"|"sell"|"inventory")=>{
//   await axios.get(`/api/${type}`).then(res=>{
//     let data = []
//     if(res.status === 200){
//       data = res.data
//     }else{
//       console.error(res.data?.message??"an error occurred")
//     }
//     return data;
//   })
// }
export const getApiData = async(type:"buy"|"sell"|"inventory")=>{
  const res = await fetch(`/api/${type}`)
  let data:any = []
  if(!res.ok){
    return []
  }else{
    data = await res.json()
  }
  // await axios.get(`/api/${type}`).then(res=>{
  //   if(res.status === 200){
  //     data = res.data
  //   }else{
  //     console.error(res.data?.message??"an error occurred")
  //   }
  // })
  return data;

}