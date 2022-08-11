function c(elem)
{return document.createElement(elem);}  // Crea nodos
function q(elem)
{return document.querySelector(elem);}  // Busca por selector
function qa(elem)
{return document.querySelectorAll(elem);}  // Busca todas las coincidencias por selector
function i(elem)
{return document.getElementById(elem)}  // Busca por id

const emojis = [ '😀','🙃','🤣','😉','😆'
                ,'😇','😊','🥰','😍','😘'
                ,'🥲','😋','😛','🤪','😜'
                ,'🤗','🤨','😶','😏','😒'
                ,'🤔','😔','😭','😲','😳']


let menu = i('menu');
let footer = q('footer');
let nav = q('nav');



function misEmojis(cantidad)
{
    let nuevo_arreglo = []
    let cant = cantidad/2
    
    for (let i = 0; i < cant; i++) {

        let cant_emojis = emojis.length
        let num = Math.floor(Math.random()*cant_emojis)


        nuevo_arreglo.push(emojis[num])

        if (num < cant_emojis-1)
        {
            emojis.splice(num,1);
        }
        else
        {
            emojis.pop();
        }
    }

    console.log('Emojis seleccionados: ',nuevo_arreglo)
    let arr = nuevo_arreglo.concat(nuevo_arreglo)
    return arr
}

function aleatorio(num_max)
{
    return Math.floor(Math.random()*num_max)
}

function chosen(elemento)
{
    elemento.style.background = "transparent";
    let algo = "#"+elemento.id+" p"
    //console.log(algo)
    document.querySelector(algo).style = "color:transparent";


    verify()
}

function verify()
{
    let cards_front = qa(".card-front");

    let cards_back = qa(".card");
    let contador = 0;
    //let posiciones = []
    let emojis_descubiertos = []
    for (let i = 0; i < cards_front.length; i++)
    {
        if (cards_front[i].style.background == "transparent")
        {
            contador++;
            //posiciones.push(i)

            let emo = cards_back[i].innerText;
            emojis_descubiertos.push(emo);
        }
    }

    // Si la cantidad de emojis visibles es par es tiempo de verificar!
    if (contador%2==0)
    {
        let json_emojis =  emojis_descubiertos.reduce((a,d) => (a[d] ? a[d]+=1 : a[d] = 1,a), {});
        console.log("Emojis descubiertos",json_emojis)
       

        let lista_valores_emojis = Object.values(json_emojis)

        // Test: Si la cant_emojis_llaves == cards_front.length/2 => Victoria!
        let cant_emojis_llaves = Object.keys(json_emojis)


        for (let i = 0; i < lista_valores_emojis.length; i++) 
        {
            if (lista_valores_emojis[i] == 1)
            {
                setTimeout(function(){
                    fail();
                }, 1000);

                //fail()
                console.log('Fallaste!')
                break;
            }     
            else
            {
                // >>> CONDICION DE VICTORIA

                if (cant_emojis_llaves.length == (cards_front.length/2))
                {
                    console.log('🥳🥳🥳')
                    modalActivated()
                    break;
                }
                // <<< CONDICION DE VICTORIA
            }

        }  // cierre for
    
    } // cierre if
}

function fail()
{
    let cards_front = qa(".card-front");
    let parrafos    = qa(".card-front p")
    
    for (let i = 0; i < cards_front.length; i++) {
        cards_front[i].style.background = "brown";
        parrafos[i].style = "color:black;"
    }
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function gameOn(valor)
{
    // >>>>>>>>>>>>>>>>>>>>> Menu!
    
    menu.style = "display:none";
    footer.style = "display:none";
    nav.style = "display:none";


    // >>>>>> Both
    let cantidad = valor;

    // >>>>>>>>>>>>>>>>>>>>> Front!
    let wall = i('front');
    wall.style = "display:grid";
    let letras = [  'A','B','C','D','E','F','G','H',
                    'I','J','K','L','M','N','O','P',
                    'Q','R','S','T','U','V','W','X',
                    'Y','Z','1','2','3','4','5','6',
                    '7','8','9','10','11','12','13','14',
                    '15','16','17','18','19','20','21','22',
                    '23','24','25','26','27','28','29','30']
    for (let i = 0; i < cantidad; i++) 
    {
        let div = c('div');
        let p   = c('p');
  
        div.setAttribute('class','card-front')
        div.setAttribute('id', `card${i+1}-front`)
        // Agregando funcion
        div.setAttribute('onclick','chosen(this)')

        div.style.background = "brown";

        p.setAttribute('class','emoji-front')
        p.innerHTML = letras[i];
     
        div.appendChild(p)
        wall.appendChild(div);     
    }

    // >>>>>>>>>>>>>>>>>>>>> Back!
    
    let board = i('game-container');
    board.style = "display:grid";
    
    let emojis_elegidos = misEmojis(cantidad)
    
    for (let i = 0; i < cantidad; i++) 
    {
        let div = c('div');
        let p   = c('p');
  
        div.setAttribute('class','card')
        div.setAttribute('id', `card${i+1}`)
        p.setAttribute('class','emoji')
        
        let num_aleatorio = aleatorio(emojis_elegidos.length)

        p.innerHTML = emojis_elegidos[num_aleatorio]
  
        if (num_aleatorio < emojis_elegidos.length-1)
        {
            emojis_elegidos.splice(num_aleatorio,1);
        }
        else
        {
            emojis_elegidos.pop();
        }

        div.appendChild(p)
        board.appendChild(div);       
    }


    /* >>>>>>>>>>>>>>>>>>> Solución - Debugging */
    let emojissss = document.querySelectorAll('.game-container .card p');
    let sol_emo = [];
    for (let i = 0; i < emojissss.length; i++) 
    {
        let a = emojissss[i].innerText
        sol_emo.push(a);       
    }

    let letrassss = document.querySelectorAll('.emoji-front');
    let sol_let = [];
    for (let i = 0; i < letrassss.length; i++) 
    {
        let b = letrassss[i].innerText
        sol_let.push(b);
        
    }

    let objecto_solucion = {}

    for (let i = 0; i < letrassss.length; i++) 
    {
        objecto_solucion[sol_let[i]] = sol_emo[i];
    }

    console.log(objecto_solucion)
    /*<<<<<<<<<<<<<<<<<<<< Solución - Debugging */

}


/* >>>>>>>>>>>>>>>>>>>> MODAL */

// const titulo_end = ' <span onclick="modalDeactivated()"></span>'

function modalActivated()
{
    //document.querySelector('.titulo-modal').innerHTML = escuelas[valor].Titulo + titulo_end;
    //document.querySelector('.parrafo-modal').innerHTML = escuelas[valor].Parrafo;

    document.getElementById('overlay').style = 'display:block';
    setTimeout(function(){
        document.getElementById('modal').classList.add('activado');
    }, 20);

}

function modalDeactivated()
{
    document.getElementById('overlay').style = 'display:none';
    document.getElementById('modal').classList.remove('activado');
    location.reload()
}


function playAgain()
{
    // Vacia el front y el game container
    // Oculta tanto el front como el game container
    // Cierra el modal
    // Abre el menú
    document.querySelector('.front').innerHTML = '';
    document.querySelector('.game-container').innerHTML = '';

    document.querySelector('.game-container').style = "display:none";
    document.querySelector('.front').style = "display:none";

    modalDeactivated()
    menu.style = "display:flex;";

    let marquitos = document.querySelector("marquee");
    marquitos.innerHTML = "Choose your destiny!";
    marquitos.behavior = "alternate"
}