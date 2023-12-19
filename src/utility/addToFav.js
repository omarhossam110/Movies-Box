import { patchData } from "../hooks/usePatch";
import { fetchData } from "../hooks/useFetch";

export async function addToFav(userToken, newFav,saveUserToken) {
  let userData = JSON.parse(userToken);
  // console.log(userData.id)

  let newUserFav

  await fetchData(`https://movies-app-backend-1fxl.onrender.com/users/${userData.id}`)

    .then((result) => {
      let resUserData = result.data.favorites;
      let userFav = [...resUserData];
      
      userFav.push(newFav);
      newUserFav = {
        "favorites": userFav,
      };
    })

   //  console.log("kkk",newUserFav)
   await  patchData(`https://movies-app-backend-1fxl.onrender.com/users/${userData.id}`, newUserFav).then(
      (res) => {
        console.log("response from patch",res.data);
        console.log("Added to Favorite!!");
        // to update the user token in the rest of the components
        localStorage.setItem("UserInfo", JSON.stringify(res.data));
        saveUserToken();
      }
    );

}
