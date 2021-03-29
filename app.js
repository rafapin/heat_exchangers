let eta = document.getElementById("eta");
let T_o_cal = document.getElementById("T_o_cal");
let T_o_frio = document.getElementById("T_o_frio");

let T_i_cal = document.getElementById("T_i_cal");
let m_cal = document.getElementById("m_cal");
let tipo_cal = document.getElementById("tipo_cal");

let T_i_frio = document.getElementById("T_i_frio");
let m_frio = document.getElementById("m_frio");
let tipo_frio = document.getElementById("tipo_frio");

let U = document.getElementById("U");
let A = document.getElementById("A");
let tipo_int = document.getElementById("tipo_int");


function calc()
{
    var C_cal, C_frio, C_min, C_max, Cp_frio, Cp_cal, NTU, c ,e ,T_o_f, T_o_c, Qmax, Q;

    Cp_frio = Cp(tipo_frio.value);
    Cp_cal = Cp(tipo_cal.value);

    C_frio = m_frio.value * Cp_frio;
    C_cal = m_cal.value * Cp_cal;

    if(C_frio >= C_cal)
    {
        C_max = C_frio;
        C_min = C_cal;
    }
    else
    {
        C_max = C_cal;
        C_min = C_frio;
    }

    //Calculo NTU
    NTU = U.value * A.value / C_min;

    //Calculo c
    c = C_min/C_max;
    
    //Calculo de efectividad
    e = efectividad(NTU,c,tipo_int.value);

    //Calor
    Qmax = C_min*(T_i_cal.value - T_i_frio.value);
    Q = e * Qmax;
   
    //Cálculo temperaturas a la salida
    T_o_c = T_i_cal.value - (Q/C_cal); 
    T_o_f = parseFloat(T_i_frio.value) + (Q/C_frio); 
    console.log(T_o_f, T_i_frio.value, Q, C_frio);
    eta.innerHTML = e.toFixed(3);
    T_o_cal.innerHTML = T_o_c.toFixed(2) + " °C";
    T_o_frio.innerHTML = T_o_f.toFixed(2) + " °C";
    return false;
}

function Cp(fluido)
{
    
    var Cp;  // En J/Kg*K
    switch(fluido)
    {
        //Agua
        case '1':
            Cp=4180;
            break;
        //Aceite de Motor
        case '2':
            Cp=1881;
            break;
        //Glicerina
        case '3':
            Cp=2386;
            break;
        //Alcohol Etílico
        case '4':
            Cp=2840;
            break;
        //Amoniaco
        case '5':
            Cp=4430;
            break;
        default:
            Cp=0;
            break;            
    }
    return Cp;
}

function efectividad(NTU,c,tipo)
{
    var e;
    switch(tipo)
    {
        //Doble tubo paralelo
        case '1':
            e=( 1 - Math.exp( -NTU*(1+c) ) ) / ( 1 + c );
            break;
        case '2':
            e=( 1 - Math.exp( -NTU*(1 - c) ) ) / ( 1 - (c * Math.exp( -NTU * ( 1 - c ) ) ));
            break;
        case '3':
            e= 2 / ( 1 + c + Math.sqrt( 1 + Math.pow(c,2)) * ( 1 + Math.exp(-NTU*Math.sqrt( 1 + Math.pow(c,2))))/
                ( 1 - Math.exp(-NTU*Math.sqrt( 1 + Math.pow(c,2)))));
            break;
        case '4':
            e= 1  -  Math.exp( (Math.pow(NTU,0.22)/c)*(Math.exp(-c* Math.pow(NTU,0.78)) - 1 ));
            break;
        case '5':
            e= (1/c)*( 1 - Math.exp( 1 - c * (1 - Math.exp(-NTU))) );
            break;
        case '6':
            e= 1 - Math.exp((-1/c)*(1 - Math.exp(-c*NTU)) );
            break;
        case '7':
            e= 1 - Math.exp(-NTU);
            break;

        default:
            e=0;
            break;
    }
    return e;
}

const selectElement = document.querySelector('.form-control');

selectElement.addEventListener('change', (event) => {
    //eta.innerHTML ="";
    //Cp_cal = Cp(tipo_cal.value);
    //alert(Cp_cal);
   // console.log(T_i_frio.value,T_i_cal.value);
    
});