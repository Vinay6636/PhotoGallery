const btnEl = document.getElementById("btn");
const errorM = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");
async function loadImage(){
    const inputValue = document.getElementById("input").value;
    if(inputValue>10 || inputValue<1){
        errorM.style.display="block";
        errorM.innerHTML = "Number should be between 0 and 11";
        return;
    }
    imgs = "";
    try {
        btnEl.style.display = "none";
        const loading = `<img src="slinder.svg" />`;
        galleryEl.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=RZ0DElilOyMJBBMcu8iaGv3tjqBCNb46voYWvCfN4U4`).then((res)=>res.json().then((data)=>{
            if(data){
                data.forEach((pic) => {
                    imgs += `
                    <img src=${pic.urls.small} alt="image"/>
                    `;
                    galleryEl.style.display = "block";
                    galleryEl.innerHTML = imgs;
                    btnEl.style.display = "block";
                    errorM.style.display = "none";
                  });
            }
     
        }));
        
    } catch (error) {
        console.log(error);
        errorM.style.display = "block";
        errorM.innerHTML = "An error happened , try again later ";
        btnEl.style.display = "block";
        galleryEl.style.display = "none";
    }

  

}

btnEl.addEventListener("click",loadImage);