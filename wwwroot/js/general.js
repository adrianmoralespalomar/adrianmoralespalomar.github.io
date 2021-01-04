var passionPhrases = ["Programming","Continuous Learning","Problem Solving"];
var currentPassionPhrase=0;
var initialValueIndexLoopWritePassionPhrase=0;
var writtingPassionPhrase=false;
/*When document is ready*/
$(document).ready(function () {
    var language = getCookie("language");
    if(language.length<=0){
        language="EN";
        changeCookieLanguage(language);
    }
    changeLanguage(language);
    toggleVisibilityScrollTopButton();
    window.onscroll = function () {
        toggleVisibilityScrollTopButton();
    };
    let phrasePassionSpan = document.getElementById("passionWord");
    executeWritePassionPhrases(phrasePassionSpan);
});

/*GENERAL*/
function changeLanguage(newLanguage){
    //To Avoid Overloads
    if(newLanguage!=getCookie("language")){
        changeCookieLanguage(newLanguage);
        let contenPage = ["header","greetings","projects","experience","knowledge","contact","footer"];
        contenPage.forEach(element => {
            //window["stringOfTheVariable"] == this["stringOfTheVariable"]
            var languageContent=JSON.parse(window[element]).filter(function (param){return param.language==newLanguage;})[0];
            for (var key in languageContent.content) {
                //To Restar passion Phrases Animation
                if(element=="greetings" && key=="passionWord"){
                    passionPhrases=languageContent.content[key];
                    let phrasePassionSpan = document.getElementById("passionWord");
                    document.getElementById("passionWord").textContent=passionPhrases[0];
                    currentPassionPhrase=0;
                    initialValueIndexLoopWritePassionPhrase=0;
                    writtingPassionPhrase=false;
                    if(timeOut!=null)clearTimeout(timeOut);
                    executeWritePassionPhrases(phrasePassionSpan);
                }
                else{
                    if(document.getElementById(key)!=null) document.getElementById(key).textContent=languageContent.content[key];
                }
            }
        });
    }
}

/**
 * Function to scroll between all elements from the page
 * @param {*} idElement Element where Scroll goes to
 */
function scrolltoplace(idElement) {
    document.querySelector(idElement).scrollIntoView({
        behavior: 'smooth'
    });
}

/*GREETINGS SECTION*/
/**
 * Function to control the writePassionPhrases Function
 * @param {*} elementWhereWrite HTML Element to write the differente Passion Phrases
 */
var timeOut;
function executeWritePassionPhrases(elementWhereWrite){
    let delayWritting=50;
    if((elementWhereWrite.textContent.length>0 && !writtingPassionPhrase) || (writtingPassionPhrase && elementWhereWrite.textContent !=passionPhrases[currentPassionPhrase])){
        timeOut=setTimeout(function() {
            writePassionPhrases(elementWhereWrite)
            executeWritePassionPhrases(elementWhereWrite)
        }, delayWritting)
    }
    else{
        timeOut=setTimeout(function() {
            currentPassionPhrase=currentPassionPhrase+1<passionPhrases.length?currentPassionPhrase+1:0;
            initialValueIndexLoopWritePassionPhrase=0;
            writtingPassionPhrase=!writtingPassionPhrase;
            executeWritePassionPhrases(elementWhereWrite)
        }, 1200)
    } 
}
/**
 * Function to Delete the current Content from Passion Phrase and Write a new one
 * @param {*} elementWhereWrite HTML Element to write the differente Passion Phrases
 */
function writePassionPhrases(elementWhereWrite){
    if(!writtingPassionPhrase){
        elementWhereWrite.textContent =elementWhereWrite.textContent.substring(0,elementWhereWrite.textContent.length-1);
    }
    else{
        elementWhereWrite.textContent +=passionPhrases[currentPassionPhrase].charAt(initialValueIndexLoopWritePassionPhrase);
        initialValueIndexLoopWritePassionPhrase++;
    }
}

function toggleVisibilityScrollTopButton(){
    if ($(window).scrollTop() > 20) {
        $('#scrollUpButton').fadeIn();
    } else {
        $('#scrollUpButton').fadeOut();
    }
}

/*PROJECTS SECTION*/
/*INITIALIZE CAROUSEL*/
const wrap = document.querySelector(".embla");
const viewPort = wrap.querySelector(".embla__viewport");
const options = { loop: true, dragFree: true,containScroll: "trimSnaps"};
const embla = EmblaCarousel(viewPort, options);
const autoplayer = autoplay(embla, 4000);
embla.on("pointerDown", autoplayer.stop);
embla.on("init", autoplayer.play);
