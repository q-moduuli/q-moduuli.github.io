
const qlyhenteet = [
    ["QRG","Taajuus"],
    ["QRK","Signaalin luettavuus"],
    ["QRL","Taajuus käytössä"],
    ["QRM","Häiriöitä"],
    ["QRN","Ilmastohäiriö"],
    ["QRO","Lisää tehoa"],
    ["QRP","Vähemmän tehoa"],
    ["QRS","Hidasta nopeutta"],
    ["QRT","Lopeta lähetys"],
    ["QRU","Onko jotain minulle/Ei ole"],
    ["QRV","Olen valmis"],
    ["QRX","Kutsun uudelleen/odota"],
    ["QRZ","Joku/kuka kutsui"],
    ["QSA","Signaalin voimakkuus"],
    ["QSB","Signaali häipymässä"],
    ["QSL","Vahvista vastaanotto/kortti"],
    ["QSO","Voin pitää yhteyttä"],
    ["QSX","Kuuntele taajuudella"],
    ["QSY","Siirry taajuudelle"],
    ["QTC","Sanoma sinulle"],
    ["QTH","Paikka (koordinaatit)"],
    ["QTR","Aika on"]
]

const muutlyhenteet=[
    ["ABT","Suunnilleen"],
    ["AGN","Again"],
    ["ANT","Antenni"],
    ["AS","Odota"],
    ["AS2","Odota 2 min"],
    ["BK","Break"],
    ["C","Kyllä"],
    ["CQ","Seek you"],
    ["CUL","See you later"],
    ["CW","sähkötys"],
    ["DE","täällä"],
    ["DN","down"],
    ["DX","Kaukoyhteys"],
    ["ES","Ja"],
    ["GA","Go ahead"],
    ["HI","Nauru"],
    ["NW","Nyt"],
    ["OM","Old man"],
    ["PSE","Ole hyvä"],
    ["PWR","Teho"],
    ["R","Selvä"],
    ["SRI","Anteeksi"],
    ["TNX","kiitos"],
    ["TX","Lähetin"],
    ["RX","Vastaanotin"],
    ["VE","Virhemerkki"],
    ["73","Parhaat terveiset"],
    ["AR","Lähetyksen loppu"],
    ["K","Vuoro sinulle"],
    ["KN","Vuoro vain sinulle"],
    ["SK","Yhteyden loppu"],
    ["SK CL","Yhteyden loppu + suljen asemani"]
]

maat=[
    ["OH,OF-OJ","Suomi"],
    ["SM","Ruotsi"],
    ["LA","Norja"],
    ["OZ","Tanska"],
    ["ES","Viro"],
    ["YL","Latvia"],
    ["LY","Liettua"],
    ["SP","Puola"],
    ["DA-DR","Saksa"],
    ["HA,HG","Unkari"],
    ["OK","Tsekinmaa"],
    ["OE","Itävalta"],
    ["G,M","Englanti"],
    ["EI","Irlanti"],
    ["F","Ranska"],
    ["EA-EH","Espanja"],
    ["I-IZ","Italia"],
    ["JA-JS","Japani"],
    ["VE","Kanada"],
    ["K,N,W","Yhdysvallat"]
]

const paketit=[
    [1,muutlyhenteet],
    [2,qlyhenteet],
    [2,maat]
]

function getRandomItemsFromArray(arr, numItems) {
    if (numItems >= arr.length) {
        return arr;
    } else {
        let result = [];
        let indices = new Set();

        while (indices.size < numItems) {
            let randomIndex = Math.floor(Math.random() * arr.length);
            if (!indices.has(randomIndex)) {
                indices.add(randomIndex);
                result.push(arr[randomIndex]);
                if (!arr[randomIndex]) {
                    console.log(randomIndex, arr[randomIndex])
                }
            }
        }

        return result;
    }
}


function shuffleArray(array) {
    return array
        .map((e) => [e,Math.random()])
        .sort((a,b) => a[1] - b[1])
        .map((e) => e[0])
}

var oikeaVastaus=""
var edellinen=""

function cumsum(arr) {
    let sum=0;
    return arr.map(num => sum+=num)
}

function valitsePaketti()
{
    let sum=0
    summat=paketit.map(p => [sum+=p[0],p[1]])

    let valinta=Math.random()*sum
    let paketti = summat.find(p => p[0] >= valinta)

    return paketti[1]
}

function showQuestion(question) {
    let paketti=valitsePaketti()

    let kysymykset=getRandomItemsFromArray(paketti, 3)
    let suunta = Math.random()>=0.5 

    let kysymys = suunta ? kysymykset[0][0] : kysymykset[0][1]  
    let vastaukset = kysymykset.map((e,i) =>[i,(suunta ? e[1] : e[0])])

    if (kysymys===edellinen) {
        showQuestion()
        return
    }
    edellinen=kysymys

    oikeaVastaus=kysymykset[0].slice()
    if (suunta) oikeaVastaus.reverse()
    oikeaVastaus=oikeaVastaus[0] + " on " +oikeaVastaus[1]

    document.getElementById('question').textContent = kysymys +" on";
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    shuffleArray(vastaukset).forEach(choice => {
        const button = document.createElement('div');
        button.textContent = choice[1];
        button.classList.add('choice');
        button.addEventListener('click', choice[0]==0 ? handleCorrectChoice : handleIncorrectChoice);
        choicesDiv.appendChild(button);
    });
}

function handleChoice(oikein)
{
    let e = document.getElementById('tulos')
    if (oikein) {
        e.innerHTML="Oikein! "+oikeaVastaus
        e.classList.remove("incorrect")
        e.classList.add("correct")
    } else {
        e.innerHTML="Väärin! "+oikeaVastaus
        e.classList.remove("correct")
        e.classList.add("incorrect")
    }
    
    showQuestion()
}

function handleCorrectChoice(event) {
    handleChoice(true)
}

function handleIncorrectChoice(event) {
    handleChoice(false)
}


// Initial question
showQuestion();
