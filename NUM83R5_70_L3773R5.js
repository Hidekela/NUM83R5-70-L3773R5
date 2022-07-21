//elements: input, chiffre et lettre
var input = document.getElementById('input'), chiffre = document.getElementById('chiffre'), lettre = document.getElementById('lettre');

//Copie
//      - element: élément à copier

function autoCopie(element) 
{
    // Cible de l'élément qui doit être copié
    var fromElement = element;
    if(!fromElement) alert('Element null');

    // Sélection des caractères concernés
    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNode(fromElement);
    selection.removeAllRanges();
    selection.addRange(range);
    
    document.execCommand('copy');

    // Fin de l'opération
    selection = window.getSelection();
    if (typeof selection.removeRange === 'function') {
        selection.removeRange(range);
    } else if (typeof selection.removeAllRanges === 'function') {
        selection.removeAllRanges();
    }
}

//Efface les espaces et les points d'une chaine de caractères

function delSpaceDot(string)
{
    if(window.navigator.userAgent.indexOf('Trident/') > 0) // if IE 11
    {
        while(string.indexOf(' ') > 0 || string.indexOf('.') > 0)
        {
            string = string.replace(' ','');
            string = string.replace('.','');
        }
    }
    else
    {
        string = string.replaceAll(' ','');
        string = string.replaceAll('.','');
    }
    return string;
}

//Translation du nombre en lettre

function num2Letters(number) 
{
    if (isNaN(number) || number < 0 || 999999999999 < number)
    {
        return null;
    }
                
    var units2Letters = ['', 'UN', 'DEUX', 'TROIS', 'QUATRE', 'CINQ', 'SIX', 'SEPT', 'HUIT', 'NEUF', 'DIX', 'ONZE', 'DOUZE', 'TREIZE', 'QUATORZE', 'QUINZE', 'SEIZE', 'DIX-SEPT', 'DIX-HUIT', 'DIX-NEUF'],
    tens2Letters = ['', 'DIX', 'VINGT', 'TRENTE', 'QUARANTE', 'CINQUANTE', 'SOIXANTE', 'SOIXANTE', 'QUATRE-VINGT', 'QUATRE-VINGT'];
    
    var units = number % 10,
    tens = (number % 100 - units) / 10,
    hundreds = (number % 1000 - number % 100) / 100,
    Umills = (number % 10000 - number % 1000) / 1000,
    Tmills = (number % 100000 - number % 10000) / 10000,
    Hmills = (number % 1000000 - number % 100000) / 100000,
    Umillions = (number % 10000000 - number % 1000000) / 1000000,
    Tmillions = (number % 100000000 - number % 10000000) / 10000000,
    Hmillions = (number % 1000000000 - number % 100000000) / 100000000,
    Ubillions = (number % 10000000000 - number % 1000000000) / 1000000000,
    Tbillions = (number % 100000000000 - number % 10000000000) / 10000000000,
    Hbillions = (number % 1000000000000 - number % 100000000000) / 100000000000;
    
    var unitsOut, tensOut, hundredsOut, UmillsOut, TmillsOut, HmillsOut, UmillionsOut, TmillionsOut, HmillionsOut, UbillionsOut, TbillionsOut, HbillionsOut;
    
    if (number === 0) 
    {
        return 'ZERO';
    } 
    else 
    {
        // Traitement des unités
        unitsOut = (units === 1 && tens > 0 && tens !== 8 ? 'ET ' : '') + units2Letters[units];
    
        // Traitement des dizaines
        if (tens === 1 && units > 0) 
        {
            tensOut = units2Letters[10 + units];
            unitsOut = '';
        } 
        else if (tens === 7 || tens === 9) 
        {
            tensOut = tens2Letters[tens] +' '+ (tens === 7 && units === 1 ? 'ET ' : '') + units2Letters[10 + units];
            unitsOut = '';
        } 
        else 
        {
            tensOut = tens2Letters[tens];
        }
        
        tensOut += (units === 0 && tens === 8 ? 'S' : '');
        
        // Traitement des centaines
        hundredsOut = (hundreds > 1 ? units2Letters[hundreds] + ' ' : '') + (hundreds > 0 ? 'CENT' : '') + (hundreds > 1 && tens == 0 && units == 0 ? 'S' : '');
        
        // Traitement des unités des milles
        UmillsOut = !Hmills && !Tmills && Umills === 1 ? '' : (Umills === 1 && Tmills > 0 && Tmills !== 8 ? 'ET ' : '') + units2Letters[Umills];
        
        // Traitement des dizaines des milles
        if (Tmills === 1 && Umills > 0) 
        {
            TmillsOut = units2Letters[10 + Umills];
            UmillsOut = '';
        } 
        else if (Tmills === 7 || Tmills === 9) 
        {
            TmillsOut = tens2Letters[Tmills] +' '+ (Tmills === 7 && Umills === 1 ? 'ET ' : '') + units2Letters[10 + Umills];
            UmillsOut = '';
        } 
        else 
        {
            TmillsOut = tens2Letters[Tmills];
        }
        
        TmillsOut += (Umills === 0 && Tmills === 8 ? 'S' : '');
        
        // Traitement des centaines des milles
        HmillsOut = (Hmills > 1 ? units2Letters[Hmills] + ' ' : '') + (Hmills > 0 ? 'CENT' : '');
        
        // Traitement des unités des millions
        UmillionsOut = (Umillions === 1 && Tmillions > 0 && Tmillions !== 8 ? 'ET ' : '') + units2Letters[Umillions];
        
        // Traitement des dizaines des millions
        if (Tmillions === 1 && Umillions > 0) 
        {
            TmillionsOut = units2Letters[10 + Umillions];
            UmillionsOut = '';
        } 
        else if (Tmillions === 7 || Tmillions === 9) 
        {
            TmillionsOut = tens2Letters[Tmillions] +' '+ (Tmillions === 7 && Umillions === 1 ? 'ET ' : '') + units2Letters[10 + Umillions];
            UmillionsOut = '';
        } 
        else 
        {
            TmillionsOut = tens2Letters[Tmillions];
        }
        
        TmillionsOut += (Umillions === 0 && Tmillions === 8 ? 'S' : '');
        
        // Traitement des centaines des millions
        HmillionsOut = (Hmillions > 1 ? units2Letters[Hmillions] + ' ' : '') + (Hmillions > 0 ? 'CENT' : '');
        
        // Traitement des unités des milliards
        UbillionsOut = (Ubillions === 1 && Tbillions > 0 && Tbillions !== 8 ? 'ET ' : '') + units2Letters[Ubillions];
        
        // Traitement des dizaines des milliards
        if (Tmillions === 1 && Ubillions > 0) 
        {
            TbillionsOut = units2Letters[10 + Ubillions];
            UbillionsOut = '';
        } 
        else if (Tbillions === 7 || Tbillions === 9) 
        {
            TbillionsOut = tens2Letters[Tbillions] +' '+ (Tbillions === 7 && Ubillions === 1 ? 'ET ' : '') + units2Letters[10 + Ubillions];
            UbillionsOut = '';
        } 
        else 
        {
            TbillionsOut = tens2Letters[Tbillions];
        }
        
        TbillionsOut += (Ubillions === 0 && Tbillions === 8 ? 'S' : '');
        
        // Traitement des centaines des milliards
        HbillionsOut = (Hbillions > 1 ? units2Letters[Hbillions] + ' ' : '') + (Hbillions > 0 ? 'CENT' : '');
        
        // Retour du total
        return HbillionsOut + (HbillionsOut && TbillionsOut ? ' ': '') + TbillionsOut + (HbillionsOut && UbillionsOut || TbillionsOut && UbillionsOut ? ' ': '') + UbillionsOut + (HbillionsOut || TbillionsOut || UbillionsOut ? ' MILLIARD' : '') + (Hbillions || Tbillions || Ubillions > 1 ? 'S' : '') + (HmillionsOut || TmillionsOut || UmillionsOut ? ' ' : '') + HmillionsOut + (HmillionsOut && TmillionsOut ? ' ': '') + TmillionsOut + (HmillionsOut && UmillionsOut || TmillionsOut && UmillionsOut ? ' ': '') + UmillionsOut + (HmillionsOut || TmillionsOut || UmillionsOut ? ' MILLION' : '') + (Hmillions || Tmillions || Umillions > 1 ? 'S' : '') + (HmillsOut || TmillsOut || UmillsOut ? ' ' : '') + HmillsOut + (HmillsOut && TmillsOut ? ' ': '') + TmillsOut + (HmillsOut && UmillsOut || TmillsOut && UmillsOut ? ' ': '') + UmillsOut + (HmillsOut || TmillsOut || UmillsOut ? ' MILLES' : (Umills === 1 ? 'MILLE' : '')) + (hundredsOut || tensOut || unitsOut ? ' ' : '') + hundredsOut + (hundredsOut && tensOut ? ' ': '') + tensOut + (hundredsOut && unitsOut || tensOut && unitsOut ? ' ': '') + unitsOut;
        
    }
}

//Evènement pour la déclenchement du copie coller auto    

document.addEventListener('keydown', function(e){
    //Focus on input
    if(e.keyCode == 86) // V
    {
        input.focus();
    }
}, false);

document.addEventListener('keyup', function(e){
    if(e.keyCode == 86) // V
    {
        //Numbre -> letter
        if(!isNaN(parseInt(input.value, 10))) chiffre.innerHTML = input.value;
        lettre.innerHTML = num2Letters(parseInt(delSpaceDot(chiffre.innerHTML), 10));
        input.value = '';
        
        //Take out the focus on input (to run selection in autoCopie)
        input.blur();

        //Copie la lettre
        autoCopie(lettre);
    }
}, false);
