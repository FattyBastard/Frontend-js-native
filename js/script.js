"use strict";

window.addEventListener("DOMContentLoaded", ()=>{


const form = document.querySelector(".form");

form.addEventListener('submit', (event) => {
    
    event.preventDefault();
    
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
    fetch("http://localhost:3000/requests", {
   
       method: "POST",
       headers: {"Content-type":"application/json"},
       body: json
    })
       .then(data => console.log(data));
});

const buttonShow = document.querySelector(".button-show");
buttonShow.addEventListener('click', event => {

    event.preventDefault();

    const containerShow = document.querySelector(".container-show");
    const ul = document.createElement("ul");

    fetch("http://localhost:3000/requests")
        .then(data =>data.json())
        .then(data => {
            data.forEach(({name, phone, email, id}) => {
                containerShow.innerHTML += `<ul class="list-show">
                                                <li class="show-item">
                                                    Id: ${id}
                                                </li>
                                                <li class="show-item">
                                                    Name: ${name}
                                                </li>
                                                <li class="show-item">
                                                    Phone: ${phone}
                                                </li>
                                                <li class="show-item">
                                                    Email: ${email}
                                                </li>                                               
                                            </ul>`;
            });
        });
    });




DG.then(function() {
    var map = DG.map('map', {
        'center': [54.98, 82.89],
        'zoom': 13
    });
    DG.marker([54.98, 82.89]).addTo(map).bindPopup(`You've clicked on me!`);
});


var index = 1; 

    const button = document.querySelector(".button-header");
        
        button.addEventListener('click', (event) => {
            event.preventDefault();

            
            const display = document.querySelector(".display-hero");

            fetch(`https://jsonplaceholder.typicode.com/photos/${index}`)
            .then(response => response.json())
            .then(data => {
                
                const ul = document.createElement('ul');
                ul.classList.add("display-list");

                for (let value in data){    
                    if (value === "thumbnailUrl"){
                        const img = document.createElement('img');
                        img.src = data[value]; 
                        ul.appendChild(img);  
                    }
                    const li = document.createElement('li');
                    li.textContent = `Value is ${value}, data: ${(data[value])}\n`;
                    ul.appendChild(li);
                }
                display.appendChild(ul);
                index += 1;
            });
    
         
        });


        // slider

        const leftSlider = document.querySelector(".slider-left-link");
        const rightSlider = document.querySelector(".slider-right-link");
        const sliderField = document.querySelector(".slider-field");
        const sliderImg = document.querySelector(".slider-img");
        const slides = document.querySelectorAll(".slider-img");

        
        const width = window.getComputedStyle(sliderImg).width;
        sliderField.style.transition = "0.8s all";
        const total = slides.length;


        const totalField = document.querySelector(".total-slide");
        const currentField = document.querySelector(".current-slide");


        
        if (total < 10){
            totalField.textContent = `/0${total}`;
        }else{
            totalField.textContent = `/${total}`;
        }


        let sliderIndex = 1;
        let offset = 0;

        currentField.textContent = `0${sliderIndex}`;


        rightSlider.addEventListener('click', event => {

            event.preventDefault();

            if (offset == +(width.slice(0, width.length - 2)) * (slides.length - 1)){
                offset = 0;
                sliderIndex = 1;
            }else{
                offset += +width.slice(0, width.length - 2);
                sliderIndex += 1;
            }
             
            sliderField.style.transform = `translateX(${-offset}px)`;

            dots.forEach(dot => {
                dot.classList.remove("active-dot");
                if (dot.getAttribute("slide-index") == sliderIndex){
                    dot.classList.add("active-dot");
                }
            });

            if (sliderIndex < 10){
                currentField.textContent = `0${sliderIndex}`;
            }else{
                currentField.textContent = `${sliderIndex}`;
            }
        });

        leftSlider.addEventListener('click', event => {

            event.preventDefault();

            
            if (offset <= 0){
                offset = +(width.slice(0, width.length - 2)) * (slides.length - 1);
                sliderIndex = total;
            }else{
                offset -= +width.slice(0, width.length - 2);
                sliderIndex -= 1;
            }
            
            sliderField.style.transform = `translateX(${-offset}px)`;

            dots.forEach(dot => {
                dot.classList.remove("active-dot");
                if (dot.getAttribute("slide-index") == sliderIndex){
                    dot.classList.add("active-dot");
                }
            });

            if (sliderIndex < 10){
                currentField.textContent = `0${sliderIndex}`;
            }else{
                currentField.textContent = `${sliderIndex}`;
            }
        });

        // dots for slider

        function createDots(){

            const parentSelector = document.querySelector(".slider-wrapper");
            const corusel = document.createElement("ol");
            corusel.classList.add("corusel");


            for (let i = 1; i <= slides.length; i++){

                const dot = document.createElement("li");
                dot.classList.add("dot");
                dot.setAttribute("slide-index", i);
                corusel.appendChild(dot);

                if (i == 1){
                    dot.classList.add("active-dot");
                }
            }

            parentSelector.appendChild(corusel);
        }

        createDots();

        const dots = document.querySelectorAll(".dot");

        dots.forEach(dot => {
            dot.addEventListener("click", event => {
                
                dots.forEach(dot => {
                    dot.classList.remove("active-dot");
                });

                event.target.classList.add("active-dot");

                sliderIndex = +dot.getAttribute("slide-index");
                offset = +(+width.slice(0, (width.length - 2)) * (sliderIndex - 1));

                sliderField.style.transform = `translateX(${-offset}px)`;

                if (sliderIndex < 10){
                    currentField.textContent = `0${sliderIndex}`;
                }else{
                    currentField.textContent = `${sliderIndex}`;
                }
            });
        });

        // request to get photo from github

        async function requestUser(user){

            const response = await fetch(`https://api.github.com/users/${user}`);
            
            if (response.status == 200){
                return await response.json();
            }
            else{
                throw new Error(response.statusText);    
            }
                
        }

        async function requestUserRepo(user){

            const response =  await requestUser(user);

            console.log(response);

            const avatarGithub = document.createElement("img");
            const body = document.querySelector("body");

            avatarGithub.src = response.avatar_url;
            avatarGithub.style = "display: flex; height: 100px; width: 100px; margin-left: auto; margin-right: auto;";

            body.appendChild(avatarGithub);


        }


        // requestUserRepo("FattyBastard");
        // function to get data from mockapi and place on page

        async function getPage(url){

            const response = await fetch(url);

            if (response.status == 200){
                return await response.json();
            }
            else{
                throw new Error("No such page! Error");
            }
        }

        async function getCard(i){

            const response = await getPage(`https://62d3fc235112e98e48488072.mockapi.io/cards/${i}`);

            console.log(response);
            const cardList = document.querySelector(".card");

            cardList.innerHTML +=  `<li class="card-item">
                                        <div class="left-part">
                                            <img src="${response.avatar}" alt="" class="img-card">
                                            <p class="card-name">Name: ${response.name}</p>
                                            <p class="id">ID: ${response.id}</p>
                                            <div class="created-at">CreatedAt: ${response.createdAt}</div>
                                            <p class="product">Product: ${response.product}</p>
                                        </div>
                                    </li>`;
        }
       

        const btnDownload = document.querySelector(".button-place");

        let offsetP = 10;
        let page = 1;

        async function drawAllCards(currentP, page){
            for (currentP; currentP < page; currentP++){
                await getCard(currentP);
            
           }
        }

        btnDownload.addEventListener("click", async (event) => {

            event.preventDefault();

            let currentP = page;
            page += offsetP;

            await drawAllCards(currentP, page);
            
        });


            
        
        
    
});