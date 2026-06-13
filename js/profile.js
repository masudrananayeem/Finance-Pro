const profileName =
document.getElementById("profileName");

const saveProfile =
document.getElementById("saveProfile");

if(saveProfile){

saveProfile.addEventListener("click",()=>{

    const name = profileName.value;

    localStorage.setItem(
        "profileName",
        name
    );

    alert("Profile Updated");

});

}

if(profileName){

profileName.value =
localStorage.getItem("profileName")
|| "Masud Rana Nayeem";

}