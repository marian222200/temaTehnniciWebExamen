const express=require('express');
const cors = require('cors');
const app=express();
const nodemon=require('nodemon');
const requestIp = require('request-ip');
const nodemailer=require('nodemailer');
var bodyParser=require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port=3000;

const uid=require('uid');

app.get('/',(req,res)=>res.send("Hello World!"));

let lista_pizza=[
    {
        id:uid(32),
        add_name:"Margherita",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella",
        add_pret:16,
        add_img:"images/margherita.jpg",
        add_amount:4,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Hawaii",
        add_ingrediente:"aluat, sos_de_rosii, ananas, sunca, mozzarella",
        add_pret:22,
        add_img:"https://www.marions-kochbuch.de/dru-pic/2330.jpg",
        add_amount:4,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Capriciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, ciuperci, masline",
        add_pret:18,
        add_img:"https://www.lapizzeria.ro/wp-content/uploads/2016/07/03-Pizza-capriciosa-large.jpg",
        add_amount:4,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Deliciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, salam, ardei",
        add_pret:19,
        add_img:"images/deliciosa.png",
        add_amount:10,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Deliciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, salam, ardei",
        add_pret:19,
        add_img:"images/deliciosa.png",
        add_amount:10,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Deliciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, salam, ardei",
        add_pret:19,
        add_img:"images/deliciosa.png",
        add_amount:10,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Deliciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, salam, ardei",
        add_pret:19,
        add_img:"images/deliciosa.png",
        add_amount:10,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Deliciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, salam, ardei",
        add_pret:19,
        add_img:"images/deliciosa.png",
        add_amount:10,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Deliciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, salam, ardei",
        add_pret:19,
        add_img:"images/deliciosa.png",
        add_amount:10,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Deliciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, salam, ardei",
        add_pret:19,
        add_img:"images/deliciosa.png",
        add_amount:10,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Deliciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, salam, ardei",
        add_pret:19,
        add_img:"images/deliciosa.png",
        add_amount:10,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Deliciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, salam, ardei",
        add_pret:19,
        add_img:"images/deliciosa.png",
        add_amount:10,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Deliciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, salam, ardei",
        add_pret:19,
        add_img:"images/deliciosa.png",
        add_amount:10,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    },
    {
        id:uid(32),
        add_name:"Deliciosa",
        add_ingrediente:"aluat, sos_de_rosii, mozzarella, sunca, salam, ardei",
        add_pret:19,
        add_img:"images/deliciosa.png",
        add_amount:10,
        notaG:0,
        nota1:0,
        nota2:0,
        nota3:0,
        note1:[],
        note2:[],
        note3:[],
        utilizatoriCareAuVotat:[]
    }
];

app.get('/lista-pizza',(req,res)=>{
    res.send(lista_pizza);
})

app.post('/add',(req,res)=>{
    //console.log(req.body);
    const pizzaData=req.body;
    pizzaData.id=uid(32);
    pizzaData.notaG=0;
    pizzaData.nota1=0;
    pizzaData.nota2=0;
    pizzaData.nota3=0;
    pizzaData.note1=[];
    pizzaData.note2=[];
    pizzaData.note3=[];
    pizzaData.utilizatoriCareAuVotat=[];
    lista_pizza.push(pizzaData);
    res.statusCode=201;
    res.send(lista_pizza);
})


let lista_users=[
    {
        id:uid(32),
        first_name:"Marian",
        last_name:"Dimofte",
        email:"marian222200@gmail.com",
        adress:"unknown",
        pass:"marian",
        ipUltimaLogare:-1,
        dataUltimaLogare:-1,
        numarLogari:0
    }
];
app.post('/register',(req,res)=>{
    //res.statusCode=201;
    //res.send();
    const userData=req.body;
    let ok=0;
    lista_users.forEach(function(user){
        if(userData.email===user.email){
            ok=1;
            res.statusCode=400;
            res.send({});
        }
    })
    if(ok===0){
        userData.id=uid(32);
        userData.ipUltimaLogare=-1;
        userData.dataUltimaLogare=-1;
        userData.numarLogari=0;
        lista_users.push(userData);
        res.statusCode=201;
        res.send({});
    }
    console.log(lista_users);
})

let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'mariandimoftetemaweb@gmail.com',
        pass:'restantaLaWeb'
    }
});

let istoricLogariEsuate=[{web:'restanta'}];
function clearIstoric(){
    let lungime=istoricLogariEsuate.length;
    for(let i=0;i<lungime;i++){
        if(Date.now()-istoricLogariEsuate[i].time>180000){
            istoricLogariEsuate.splice(i,1);
            i--;
            if(lungime!=0)lungime--;
        }
    }
}

function verificareIstoric(email,userIp){
    let ct=0;
    istoricLogariEsuate.forEach(function(entry){
        if(entry.email==email){if(entry.userIp=userIp)ct++;}
    })
    return ct;
}
function stergereIncercariEsuate(email,userIp){
    let lungime=istoricLogariEsuate.length;
    for(let i=0;i<lungime;i++){
        if(istoricLogariEsuate[i].email==email)if(istoricLogariEsuate[i].userIp==userIp){
            istoricLogariEsuate.splice(i,1);
            //console.log(i);
            i--;
            if(lungime!=0)lungime--;
        }
    }
}
app.post('/login',(req,res)=>{
    console.log(istoricLogariEsuate);
    const loginData=req.body;
    let userIp=requestIp.getClientIp(req);
    console.log(req.ip);
    let ok=0;

    clearIstoric();
    let incercariPanaAcum=verificareIstoric(loginData.email,userIp);
    if(incercariPanaAcum>4){
        res.statusCode=406;
        res.send({});
        ok=1;
    }

    lista_users.forEach(function(user){
        if(user.email===loginData.email){
            if(user.pass===loginData.pass){
                if(ok==0){
                    res.statusCode=202;
                    res.send({
                        idUtilizator:user.id,
                        numarLogari:user.numarLogari,
                        dataUltimaLogare:user.dataUltimaLogare,
                        ipUltimaLogare:user.ipUltimaLogare,
                        nume:user.first_name
                    });
                    user.numarLogari++;
                    user.dataUltimaLogare=Date.now();
                    user.ipUltimaLogare=userIp;
                    ok=1;
                }
            }
            else {
                istoricLogariEsuate.push({
                    email:loginData.email,
                    userIp:userIp,
                    time:Date.now()
                })
                if(incercariPanaAcum===4){
                    stergereIncercariEsuate(loginData.email,userIp);
                    transporter.sendMail({
                        from:'mariandimoftetemaweb@gmail.com',
                        subject:'Logare suspicioasa!',
                        to:loginData.email,
                        text:'Doar glumeam, ai doar restanta!'
                    },function(err,data){
                        if(err){
                            console.log('Error: ',err);
                        }
                        else{
                            console.log('Email sent!');
                        }
                    })
                }
                if(ok==0){
                    res.statusCode=401;
                    res.send({incercariRamase:4-incercariPanaAcum});
                    ok=1;
                }
            }
        }
    });
    if(ok==0){
        res.statusCode=400;
        res.send({});
    }
})
/*
app.post('/cumpara',(req,res)=>{
    const cumparaData=req.body;
    if(lista_pizza.some(pizza=>pizza.id===cumparaData.id)){
        if(pizza.amount===1){
            lista_pizza.filter(p=>p.id!==pizza.id)
        }
        else pizza.amount-=1;
        res.send(lista_pizza);
    }
})
*/
function sum(total,num){
    return total+num;
}
app.post('/notare',(req,res)=>{
    const notareData=req.body;
    let ok=0;
    lista_pizza.forEach(function(pizza){
        if(pizza.id==notareData.idPizza){
            if(pizza.utilizatoriCareAuVotat.indexOf(notareData.idUtilizator)==-1){
                pizza.utilizatoriCareAuVotat.push(notareData.idUtilizator);
                pizza.note1.push(notareData.nota1);
                pizza.note2.push(notareData.nota2);
                pizza.note3.push(notareData.nota3);
                //console.log((pizza.note1.reduce(sum,0)));
                //console.log(pizza.note1.length);
                pizza.nota1=(pizza.note1.reduce(sum,0))/pizza.note1.length;
                pizza.nota2=(pizza.note2.reduce(sum,0))/pizza.note2.length;
                pizza.nota3=(pizza.note3.reduce(sum,0))/pizza.note3.length;
                pizza.notaG=(pizza.nota1+pizza.nota2+pizza.nota3)/3;
                //console.log(pizza);
                if(ok==0){
                    res.statusCode=200;
                    res.send({});
                    ok=1;
                }
            }
            else {
                if(ok==0){
                    res.statusCode=400;
                    res.send({});
                    ok=1;
                }
            }
        }
    })

})
app.get('*', function(req, res){
    res.status(404);
    res.redirect('http://localhost:5500/page404.html');
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))