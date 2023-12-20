import { patchData } from "../hooks/usePatch";
import { fetchData } from "../hooks/useFetch";

export async function removeFav(userToken, deletedFav,saveUserToken) {
  let userData = JSON.parse(userToken);
  // console.log(userData.id)

  let newUserFav

  await fetchData(`https://movies-app-backend-1fxl.onrender.com/users/${userData.id}`)
  .then((result) => {
      let resUserData = result.data.favorites;
      //  console.log('from first fetch',resUserData)
 
        let userFav = [...resUserData];

        userFav = userFav.filter((fav)=> fav.id !== deletedFav.id);

        // console.log('after deleting:',userFav);
        
        newUserFav = {
          "favorites": userFav,
        };
 
    })

   
   await  patchData(`https://movies-app-backend-1fxl.onrender.com/users/${userData.id}`, newUserFav).then(
      (res) => {
        // console.log("response from patch",res.data);
        console.log("Removed from Favorite!!");
        // to update the user token in the rest of the components
        localStorage.setItem("UserInfo", JSON.stringify(res.data));
        saveUserToken();
      }
    );

}
