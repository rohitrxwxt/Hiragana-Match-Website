const data = [
{h:"あ",r:"a"},
{h:"い",r:"i"},
{h:"う",r:"u"},
{h:"え",r:"e"},
{h:"お",r:"o"},
{h:"か",r:"ka"},
{h:"き",r:"ki"},
{h:"く",r:"ku"},
{h:"け",r:"ke"},
{h:"こ",r:"ko"},
{h:"さ",r:"sa"},
{h:"し",r:"shi"},
{h:"す",r:"su"},
{h:"せ",r:"se"},
{h:"そ",r:"so"},
{h:"た",r:"ta"},
{h:"ち",r:"chi"},
{h:"つ",r:"tsu"},
{h:"て",r:"te"},
{h:"と",r:"to"},
{h:"な",r:"na"},
{h:"に",r:"ni"},
{h:"ぬ",r:"nu"},
{h:"ね",r:"ne"},
{h:"の",r:"no"},
{h:"は",r:"ha"},
{h:"ひ",r:"hi"},
{h:"ふ",r:"fu"},
{h:"へ",r:"he"},
{h:"ほ",r:"ho"},
{h:"ま",r:"ma"},
{h:"み",r:"mi"},
{h:"む",r:"mu"},
{h:"め",r:"me"},
{h:"も",r:"mo"},
{h:"や",r:"ya"},
{h:"ゆ",r:"yu"},
{h:"よ",r:"yo"},
{h:"ら",r:"ra"},
{h:"り",r:"ri"},
{h:"る",r:"ru"},
{h:"れ",r:"re"},
{h:"ろ",r:"ro"},
{h:"わ",r:"wa"},
{h:"を",r:"wo"},
{h:"ん",r:"n"}
];

const hiraganaList=document.getElementById("hiraganaList");
const romajiList=document.getElementById("romajiList");
const score=document.getElementById("score");

let selectedH=null;
let selectedR=null;
let gameCards=[];
let points=0;

function shuffle(arr){
    return [...arr].sort(()=>Math.random()-0.5);
}

function newGame(){

    points=0;
    score.textContent=0;

    hiraganaList.innerHTML="";
    romajiList.innerHTML="";

    gameCards=shuffle(data).slice(0,5);

    let hira=shuffle(gameCards);
    let roma=shuffle(gameCards);

    hira.forEach(item=>{
        const div=document.createElement("div");
        div.className="card";
        div.innerText=item.h;
        div.dataset.answer=item.r;

        div.onclick=()=>{
            document.querySelectorAll("#hiraganaList .card").forEach(c=>c.classList.remove("selected"));
            div.classList.add("selected");
            selectedH=div;
            check();
        };

        hiraganaList.appendChild(div);
    });

    roma.forEach(item=>{
        const div=document.createElement("div");
        div.className="card";
        div.innerText=item.r;
        div.dataset.answer=item.r;

        div.onclick=()=>{
            document.querySelectorAll("#romajiList .card").forEach(c=>c.classList.remove("selected"));
            div.classList.add("selected");
            selectedR=div;
            check();
        };

        romajiList.appendChild(div);
    });

}

function check(){

    if(selectedH && selectedR){

        if(selectedH.dataset.answer===selectedR.dataset.answer){

            selectedH.classList.add("correct");
            selectedR.classList.add("correct");

            selectedH.style.pointerEvents="none";
            selectedR.style.pointerEvents="none";

            points++;
            score.textContent=points;

        }else{

            selectedH.classList.add("wrong");
            selectedR.classList.add("wrong");

            setTimeout(()=>{
                selectedH.classList.remove("wrong");
                selectedR.classList.remove("wrong");
            },500);

        }

        selectedH.classList.remove("selected");
        selectedR.classList.remove("selected");

        selectedH=null;
        selectedR=null;

    }

}

document.getElementById("newGame").onclick=newGame;

newGame();