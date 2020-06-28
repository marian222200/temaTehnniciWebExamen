
const sendHttpRequest=(method,url,data)=>{
    //console.log(data);
    return fetch(url,{
        method: method,
        body: JSON.stringify(data),
        headers:data?{'Content-Type':'application/json'}:{}
    }).then(response=>{
        //console.log(response);
        if(response.status>=400){
            //!response.ok
            return response.json().then(errResData=>{
                const error=new Error('Something went wrong!');
                error.data=errResData;
                error.status=response.status;
                throw error;
            });
        }
        return response.json();
    });
};

const container=document.getElementById("lista_pizza");
let pizzaAfisata=[];


function afiseazaPizza(pizza,container){
    //console.log(pizza);
    pizzaAfisata.push(pizza.id);
    const tempPizza=`
        <div class="item">
            <h3>Nume: ${pizza.add_name}</h3>
            <h3>Ingrediente: ${pizza.add_ingrediente}</h3>
            <h3>Pret: ${pizza.add_pret}lei</h3>
            <h3>Nota generala:${pizza.notaG.toPrecision(3)}</h3>
            <h3>Gust:${pizza.nota1.toPrecision(3)}</h3>
            <h3>Originalitate:${pizza.nota2.toPrecision(3)}</h3>
            <h3>Pret/Cantitate:${pizza.nota3.toPrecision(3)}</h3>
            <img src=${pizza.add_img} alt="imagine_pizza">
        <br />
            <div class="menu_cumparare">
                <span>Ramase in stoc:</span>
                    <stoc>${pizza.add_amount}</stoc>
                    <button class="buton_formular">Cumpara</button>
            </div>
            <div class="menu_notare">
                <span>Nota1:</span><input id="Nota1" type="number" min="1" max="5">
                <span>Nota2:</span><input id="Nota2" type="number" min="1" max="5">
                <span>Nota3:</span><input id="Nota3" type="number" min="1" max="5">
                <button class="buton_formular" id="buton_notare">Noteaza</button>
            </div>
        </div>
    `
    container.insertAdjacentHTML("beforeend",tempPizza);
}

function initNotareItems(){
    let butoane_notare=document.querySelectorAll("#buton_notare");
    let casete_nota1=document.querySelectorAll("#Nota1");
    let casete_nota2=document.querySelectorAll("#Nota2");
    let casete_nota3=document.querySelectorAll("#Nota3");
    //console.log(butoane_notare);
    //console.log(casete_nota1);
    lungime=butoane_notare.length;
    for(let i=0;i<lungime;i++)
        butoane_notare[i].addEventListener("click",function(){
            if(localStorage.getItem('esteLogat')!=-1){
                sendHttpRequest('POST','http://localhost:3000/notare',{
                    nota1:parseInt(casete_nota1[i].value),
                    nota2:parseInt(casete_nota2[i].value),
                    nota3:parseInt(casete_nota3[i].value),
                    idPizza:pizzaAfisata[i],
                    idUtilizator:localStorage.getItem('identitateUtilizator')
                })
                .then(responseData=>{
                    alert("Notare cu succes!");
                })
                .catch(err=>{
                    console.log(err.status);
                    if(err.status==400)alert("Nu poti nota de 2 ori!");
                    else alert("Notare esuata!");
                })
            }
            else alert("Doar utilizatorii inregistrati voteaza!");
        })
}

function afisareStoc(numar_buton){
    sendHttpRequest('GET','http://localhost:3000/lista-pizza')
    .then(responseData=>{
        container.innerHTML='';
        pizzaAfisata.splice(0,pizzaAfisata.length);
        let lungime=Object.keys(responseData).length;
        if(lungime>=numar_buton*6){
            if(lungime<numar_buton*6+6)
                for(let i=numar_buton*6;i<lungime;i++)
                    afiseazaPizza(responseData[i],container);
            else for(let i=numar_buton*6;i<numar_buton*6+6;i++)
                afiseazaPizza(responseData[i],container);
            initNotareItems();
            if(window.localStorage.getItem('tema')==0)document.querySelectorAll(".item").forEach(function(p){p.style.backgroundColor='yellow';});
            else document.querySelectorAll(".item").forEach(function(p){p.style.backgroundColor='#000066';});
        }
        else initNotareItems();
    })
}
window.onload=function(){
    const butoane=document.querySelectorAll("button");
    const buton_afisare_login=butoane[0];
    const buton_afisare_register=butoane[1];
    const buton_logout=butoane[2];
    const buton_afisare_order=butoane[3];
    const buton_afisare_add=butoane[4];
    const buton_afisare_info=butoane[5];
    const buton_tema=butoane[6];

    const buton_submit_login=butoane[7];
    const buton_submit_register=butoane[8];
    const buton_submit_order=butoane[9];
    const buton_submit_add=butoane[10];

    const formulare=document.querySelectorAll(".formular");

    const formular_login=formulare[0];
    const formular_register=formulare[1];
    const formular_order=formulare[2];
    const formular_add=formulare[3];
    const formular_info=formulare[4];
    function ascundeButoaneMeniuPrincipal(){
        if(localStorage.getItem('esteLogat')==-1){
            buton_logout.style.display="none";
            buton_afisare_order.style.display="none";
            buton_afisare_add.style.display="none";
            buton_afisare_info.style.display="none";
            buton_afisare_register.style.display="";
            buton_afisare_login.style.display="";
            
        }
        else{
            buton_afisare_register.style.display="none";
            buton_afisare_login.style.display="none";
            buton_logout.style.display="";
            buton_afisare_order.style.display="";
            buton_afisare_add.style.display="";
            buton_afisare_info.style.display="";
        }
    }

    ascundeButoaneMeniuPrincipal();

    function ascunde_formulare(){
        formulare.forEach(function(formular){
            formular.style.display="none";
        })
    }
    
    buton_afisare_login.addEventListener("click",function(){
        if(formular_login.style.display==="none"){
            ascunde_formulare();
            formular_login.style.display="";
        }
        else ascunde_formulare();
    })

    buton_afisare_register.addEventListener("click",function(){
        if(formular_register.style.display==="none"){
            ascunde_formulare();
            formular_register.style.display="";
        }
        else ascunde_formulare();
    })

    buton_afisare_order.addEventListener("click",function(){
        if(formular_order.style.display==="none"){
            ascunde_formulare();
            formular_order.style.display="";
        }
        else ascunde_formulare();
    })

    buton_afisare_add.addEventListener("click",function(){
        if(formular_add.style.display==="none"){
            ascunde_formulare();
            formular_add.style.display="";
        }
        else ascunde_formulare();
    })

    buton_afisare_info.addEventListener("click",function(){
        if(formular_info.style.display==="none"){
            ascunde_formulare();
            formular_info.style.display="";
        }
        else ascunde_formulare();
    })

    function schimbLight(){
        document.body.style.backgroundColor="white";
        document.body.style.color="black";
        //document.querySelectorAll("h1,h2,h3,h4,h5").forEach(function (h){h.style.textShadow="none"});
        document.querySelectorAll("button").forEach(function(b){b.style.color="black"});
        document.querySelectorAll(".item").forEach(function(p){p.style.backgroundColor='yellow';});
        document.querySelectorAll(".formular").forEach(function(p){p.style.backgroundColor='yellow';});
        buton_tema.innerHTML='Dark theme';
        window.localStorage.setItem('tema',0);
    }
    function schimbDark(){
        document.body.style.backgroundColor="rgb(25, 8, 77)";
        document.body.style.color="white";
        //document.querySelectorAll("h1,h2,h3,h4,h5").forEach(function (h){h.style.textShadow="2px 2px black"});
        document.querySelectorAll("button").forEach(function(b){b.style.color="white"});
        document.querySelectorAll(".item").forEach(function(p){p.style.backgroundColor='#000066';});
        document.querySelectorAll(".formular").forEach(function(p){p.style.backgroundColor='rgb(66, 1, 128)';});
        buton_tema.innerHTML='Light theme';
        window.localStorage.setItem('tema',1);
    }


    function schimbareTema(){
        if(window.localStorage.getItem('tema')==1)schimbLight();
        else if(window.localStorage.getItem('tema')==0)schimbDark();
    }

    if(window.localStorage.getItem('tema')==0)schimbLight();
    buton_tema.addEventListener("click",function(){schimbareTema()});

    
function logare(){
    const email=document.querySelector("#login_email");
    const pass=document.querySelector("#login_pass");
    const containerGresealaLogin=document.getElementById("greseala_login");
    const containerInfo=document.getElementById("formular_info_logari");
    sendHttpRequest('POST','http://localhost:3000/login',{
        "email":email.value,
        "pass":pass.value
    })
    .then(responseData=>{
        console.log(responseData);
        window.localStorage.setItem('esteLogat',1);
        window.localStorage.setItem('identitateUtilizator',responseData.idUtilizator);
        alert("Logare cu succes!");
        ascundeButoaneMeniuPrincipal();
        formular_login.style.display="none";
        containerGresealaLogin.style.display="none";
        if(responseData.numarLogari==0){
            containerInfo.innerHTML=`
                <h2>Informatii logari trecute</h2>
                <span class="label">Salut, te-ai logat azi pentru prima oara</span>
            `;
        }
        else {
            //console.log(responseData.nume);
            //console.log(responseData.ipUltimaLogare);
            //console.log(new Date(responseData.dataUltimaLogare).getDate());
            containerInfo.innerHTML=`
                <h2>Informatii logari trecute</h2>
                <span class="label">Salut, ${responseData.nume}, ultima oara ai intrat de pe ip-ul ${responseData.ipUltimaLogare} in ziua ${new Date(responseData.dataUltimaLogare).getDate()}.${new Date(responseData.dataUltimaLogare).getMonth()}.${new Date(responseData.dataUltimaLogare).getFullYear()} la ora ${new Date(responseData.dataUltimaLogare).getHours()}:${new Date(responseData.dataUltimaLogare).getMinutes()}:${new Date(responseData.dataUltimaLogare).getSeconds()}. Ai vizitat site-ul de ${responseData.numarLogari} ori</span>
            `;
        }
    })
    .catch(err=>{
        console.log(err.status);
        if(err.status==400){
            alert("User wrong!");
            containerGresealaLogin.style.display="none";
        }
        else if(err.status==401){
            alert("Pass wrong!");
            containerGresealaLogin.style.display="";
            containerGresealaLogin.innerHTML=`Email sau parola incorecte! Incercari ramase:${err.data.incercariRamase}`;
            if(err.data.incercariRamase==0){
                email.disabled="true";
                pass.disabled="true";
                setTimeout(()=>{
                    email.disabled="";
                    pass.disabled="";
                    containerGresealaLogin.innerHTML=`Email sau parola incorecte! Incercari ramase:5`;
                },5000)
            }
        }
    }); 

}

    buton_submit_login.addEventListener("click",logare);
    //console.log(buton_submit_login);
    document.querySelector("#login_email").addEventListener('keypress', function (e) {if (e.key === 'Enter')logare();});
    document.querySelector("#login_pass").addEventListener('keypress', function (e) {if (e.key === 'Enter')logare();});


    let date_corecte=false;

    const fname=document.querySelector("#register_fname");
    const lname=document.querySelector("#register_lname");
    const email=document.querySelector("#register_email");
    const pass=document.querySelector("#register_password");
    const adress=document.querySelector("#register_adress");

    function testare(){
        const test_email=/^[a-zA-Z0-9!#&_*?^{}~-]+(\.[a-zA-Z0-9!#&_*?^{}~-]+)*@([a-z0-9]+([a-z0-9-]*)\.)+[a-zA-Z]+$/;
        const test_pass=/(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!#&_*?^{}~-])[a-zA-Z0-9!#&_*?^{}~-]{8,}/;
        const alerta_email=document.querySelectorAll(".greseala")[1];
        const alerta_pass=document.querySelectorAll(".greseala")[2];
        
        if(test_email.test(email.value)===false){
            alerta_email.style.display="";
            date_corecte=false;
        }
        else {
            date_corecte=true;
            alerta_email.style.display="none";
        }
        console.log(test_pass.test(pass.value));
        if(test_pass.test(pass.value)===false){
            alerta_pass.style.display="";
            if(date_corecte===true)date_corecte=false;
        }
        else alerta_pass.style.display="none";
    }

    email.addEventListener("input",function(){
        testare();
    })
    pass.addEventListener("input",function(){
        testare();
    })

    buton_submit_register.addEventListener("click",function(){
        testare();
        if(date_corecte===true){
            sendHttpRequest('POST','http://localhost:3000/register',{
                first_name:fname.value,
                last_name:lname.value,
                email:email.value,
                pass:pass.value,
                adress:adress.value
            })
            .then(responseData=>{   
                //console.log(responseData);
                alert("Contul a fost creat!");
            })
            .catch(err=>{
                //console.log(err);
                alert("Contul deja exista!");
            }); 
        }
    })
    /*
    buton_submit_order.addEventListener("click",function(){
        
    })
    */
    buton_logout.addEventListener("click",function(){
        window.localStorage.removeItem('identitateUtilizator');
        window.localStorage.setItem('esteLogat',-1);
        alert("Te-ai delogat!");
        ascundeButoaneMeniuPrincipal();
    });

    buton_submit_add.addEventListener("click",function(){
        const p_name=document.getElementById("add_name").value;
        const p_ingrediente=document.getElementById("add_ingrediente").value;
        const p_pret=document.getElementById("add_pret").value;
        const p_img=document.getElementById("add_img").value;
        const p_amount=document.getElementById("add_amount").value;
        sendHttpRequest('POST','http://localhost:3000/add',{
            add_name:p_name,
            add_ingrediente:p_ingrediente,
            add_pret:p_pret,
            add_img:p_img,
            add_amount:p_amount
        })
        .then(responseData=>{
            //console.log(responseData);
            alert("Pizza adaugata!");
        })
        .catch(err=>{
            alert("Pizza nu a fost adaugata!");
        }); 
    })

    afisareStoc(0);
    let butoane_pagina=document.querySelectorAll(".buton_pagina");
    //console.log(butoane_pagina);
    butoane_pagina[0].addEventListener("click",function(){afisareStoc(0);});
    butoane_pagina[1].addEventListener("click",function(){afisareStoc(1);});
    butoane_pagina[2].addEventListener("click",function(){afisareStoc(2);});
    butoane_pagina[3].addEventListener("click",function(){afisareStoc(3);});
};