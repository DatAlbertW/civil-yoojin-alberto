const SCRIPT_URL =
  "PASTE_YOUR_APPS_SCRIPT_URL_HERE";

const MAX_GUESTS = 2;


/* =========================================
   DIET OPTIONS
   ========================================= */

const DIETS = [

  {
    v:"none",
    es:"Ninguna",
    en:"None",
    ko:"없음"
  },

  {
    v:"vegetarian",
    es:"Vegetariano",
    en:"Vegetarian",
    ko:"채식 (베지테리언)"
  },

  {
    v:"vegan",
    es:"Vegano",
    en:"Vegan",
    ko:"비건"
  },

  {
    v:"gluten",
    es:"Sin gluten (celiaquía)",
    en:"Gluten free (celiac)",
    ko:"글루텐 프리 (셀리악)"
  },

  {
    v:"lactose",
    es:"Sin lactosa",
    en:"Lactose free",
    ko:"유당 불내증"
  },

  {
    v:"nuts",
    es:"Alergia a frutos secos",
    en:"Nut allergy",
    ko:"견과류 알레르기"
  },

  {
    v:"seafood",
    es:"Alergia a mariscos",
    en:"Shellfish allergy",
    ko:"갑각류 알레르기"
  },

  {
    v:"pork",
    es:"Sin cerdo",
    en:"No pork",
    ko:"돼지고기 제외"
  },

  {
    v:"kosher",
    es:"Kosher",
    en:"Kosher",
    ko:"코셔"
  },

  {
    v:"spicy",
    es:"Sin picante",
    en:"No spicy food",
    ko:"매운 음식 제외"
  },

  {
    v:"other",
    es:"Otra (especificar)",
    en:"Other (specify)",
    ko:"기타 (직접 입력)"
  }

];


/* =========================================
   TRANSLATIONS
   ========================================= */

const T = {

  es:{

    languageLabel:"Idioma",

    inviteCeremony:
      "Inicio de la Ceremonia: 12:30",

    inviteCity:
      "Ciudad de México",

    ask:
      "Confirma tu asistencia",

    sub:
      "Nos encantará compartir este día tan especial contigo.",

    yes:
      "Sí, ahí estaré",

    no:
      "No podré ir",

    lName:
      "Nombre completo",

    lName2:
      "Nombre de la segunda persona",

    lPhone:
      "Teléfono",

    hPhone:
      "Con código de país, por ejemplo +52 55 1234 5678",

    lGuests:
      "Personas, incluyéndote",

    hGuests:
      "Máximo 2 personas por invitación.",

    lDiet:
      "Restricciones alimentarias",

    phDietOther:
      "Cuéntanos cuál",

    lWho:
      "¿Para quién aplica?",

    wBoth:
      "Ambos",

    p1:
      "Persona 1",

    p2:
      "Persona 2",

    lNote:
      "Un mensaje para nosotros",

    phNote:
      "Escribe aquí tu mensaje…",

    send:
      "Enviar confirmación",

    err:
      "No se pudo enviar. Revisa tu conexión e inténtalo otra vez.",

    errConfig:
      "Primero configura la URL de Apps Script.",

    errName:
      "Escribe tu nombre.",

    errName2:
      "Escribe el nombre de la segunda persona.",

    errPhone:
      "Escribe tu teléfono.",

    errOther:
      "Cuéntanos cuál es la restricción.",

    doneTitle:
      "¡Gracias!",

    doneBody:
      "Tu respuesta quedó registrada. Nos hace mucha ilusión celebrar contigo.",

    footer:
      "Que la vida nos siga uniendo en bellos caminos."

  },


  en:{

    languageLabel:"Language",

    inviteCeremony:
      "Ceremony begins: 12:30",

    inviteCity:
      "Mexico City",

    ask:
      "Kindly RSVP",

    sub:
      "We would love to share this very special day with you.",

    yes:
      "Yes, I'll be there",

    no:
      "I can't make it",

    lName:
      "Full name",

    lName2:
      "Name of the second person",

    lPhone:
      "Phone",

    hPhone:
      "Include the country code, for example +41 79 123 45 67",

    lGuests:
      "People, including you",

    hGuests:
      "Maximum 2 people per invitation.",

    lDiet:
      "Dietary restrictions",

    phDietOther:
      "Tell us what it is",

    lWho:
      "Who does this apply to?",

    wBoth:
      "Both",

    p1:
      "Person 1",

    p2:
      "Person 2",

    lNote:
      "A message for us",

    phNote:
      "Write your message here…",

    send:
      "Send RSVP",

    err:
      "Your RSVP could not be sent. Check your connection and try again.",

    errConfig:
      "Configure the Apps Script URL first.",

    errName:
      "Please enter your name.",

    errName2:
      "Please enter the second person's name.",

    errPhone:
      "Please enter your phone number.",

    errOther:
      "Please tell us what the restriction is.",

    doneTitle:
      "Thank you!",

    doneBody:
      "Your RSVP has been recorded. We are so excited to celebrate with you.",

    footer:
      "May life keep bringing our paths together."

  },


  ko:{

    languageLabel:"언어",

    inviteCeremony:
      "예식 시작: 12:30",

    inviteCity:
      "멕시코시티",

    ask:
      "참석 여부를 알려주세요",

    sub:
      "소중한 날을 함께해 주시면 정말 기쁘겠습니다.",

    yes:
      "참석합니다",

    no:
      "참석이 어렵습니다",

    lName:
      "성함",

    lName2:
      "동반하시는 분 성함",

    lPhone:
      "연락처",

    hPhone:
      "국가번호를 포함해 주세요. 예: +82 10 1234 5678",

    lGuests:
      "참석 인원 (본인 포함)",

    hGuests:
      "초대장당 최대 2명까지 가능합니다.",

    lDiet:
      "식단 제한 사항",

    phDietOther:
      "어떤 제한인지 알려주세요",

    lWho:
      "누구에게 해당하나요?",

    wBoth:
      "두 분 모두",

    p1:
      "첫 번째 분",

    p2:
      "두 번째 분",

    lNote:
      "전하고 싶은 말",

    phNote:
      "메시지를 남겨주세요…",

    send:
      "참석 여부 보내기",

    err:
      "전송에 실패했습니다. 연결을 확인한 뒤 다시 시도해 주세요.",

    errConfig:
      "Apps Script URL을 먼저 설정해 주세요.",

    errName:
      "성함을 입력해 주세요.",

    errName2:
      "동반하시는 분의 성함을 입력해 주세요.",

    errPhone:
      "연락처를 입력해 주세요.",

    errOther:
      "어떤 제한인지 알려주세요.",

    doneTitle:
      "감사합니다!",

    doneBody:
      "참석 여부가 등록되었습니다. 함께 축하할 날을 기다리고 있겠습니다.",

    footer:
      "아름다운 길 위에서 우리의 인연이 계속 이어지길 바랍니다."

  }

};


/* =========================================
   ELEMENTS
   ========================================= */

const $ =
  id =>
  document.getElementById(id);


const form =
  $("rsvp");


const err =
  $("err");


const send =
  form.querySelector(".send");


const dietSel =
  $("diet");


const out =
  $("guests");


const minus =
  $("minus");


const plus =
  $("plus");


const languageSelect =
  $("languageSelect");


/* =========================================
   DEVICE LANGUAGE DETECTION
   ========================================= */

function detectDeviceLanguage(){

  const languages =
    navigator.languages &&
    navigator.languages.length

      ? navigator.languages

      : [navigator.language || "es"];


  for(const item of languages){

    const value =
      item
        .toLowerCase()
        .split("-")[0];


    if(
      value === "es" ||
      value === "en" ||
      value === "ko"
    ){

      return value;

    }

  }


  return "es";

}


/*
  If the guest changed language previously,
  keep their preference.

  Otherwise detect the device language.
*/

const savedLang =
  localStorage.getItem(
    "weddingLang"
  );


let lang =
  savedLang ||
  detectDeviceLanguage();


let count =
  1;


/* =========================================
   PAINT LANGUAGE
   ========================================= */

function paint(){

  document.documentElement.lang =
    lang;


  languageSelect.value =
    lang;


  document
    .querySelectorAll("[data-t]")
    .forEach(el=>{

      const value =
        T[lang][el.dataset.t];


      if(
        value !== undefined
      ){

        el.textContent =
          value;

      }

    });


  document
    .querySelectorAll("[data-ph]")
    .forEach(el=>{

      el.placeholder =
        T[lang][el.dataset.ph] ||
        "";

    });


  /* Diet menu */

  const keep =
    dietSel.value ||
    "none";


  dietSel.innerHTML =
    "";


  DIETS.forEach(item=>{

    const option =
      document.createElement(
        "option"
      );


    option.value =
      item.v;


    option.textContent =
      item[lang];


    dietSel.appendChild(
      option
    );

  });


  dietSel.value =
    keep;


  drawWho();

}


/* =========================================
   LANGUAGE CHANGE
   ========================================= */

languageSelect
  .addEventListener(
    "change",
    ()=>{

      lang =
        languageSelect.value;


      localStorage.setItem(
        "weddingLang",
        lang
      );


      paint();

    }
  );


/* =========================================
   NAME HELPERS
   ========================================= */

function firstName(value){

  return(
    value ||
    ""
  )
    .trim()
    .split(/\s+/)[0] ||
    "";

}


/* =========================================
   GUEST COUNT
   ========================================= */

function drawCount(){

  out.textContent =
    count;


  minus.disabled =
    count <= 1;


  plus.disabled =
    count >=
    MAX_GUESTS;


  const going =
    form.attending.value ===
    "yes";


  $("f-name2").hidden =
    !(
      going &&
      count === 2
    );


  drawWho();

}


/* =========================================
   DIET WHO
   ========================================= */

function drawWho(){

  const going =
    form.attending.value ===
    "yes";


  const hasDiet =
    dietSel.value &&
    dietSel.value !==
    "none";


  $("f-dietother").hidden =
    dietSel.value !==
    "other";


  $("f-who").hidden =
    !(
      going &&
      count === 2 &&
      hasDiet
    );


  $("w1").textContent =
    firstName(
      $("name").value
    ) ||
    T[lang].p1;


  $("w2").textContent =
    firstName(
      $("name2").value
    ) ||
    T[lang].p2;

}


/* =========================================
   ATTENDING FIELDS
   ========================================= */

function toggleFields(){

  const going =
    form.attending.value ===
    "yes";


  document
    .querySelectorAll(
      '[data-only="yes"]'
    )
    .forEach(
      el=>{
        el.hidden =
          !going;
      }
    );


  drawCount();

}


/* =========================================
   EVENTS
   ========================================= */

plus.addEventListener(
  "click",
  ()=>{

    count =
      Math.min(
        MAX_GUESTS,
        count + 1
      );


    drawCount();

  }
);


minus.addEventListener(
  "click",
  ()=>{

    count =
      Math.max(
        1,
        count - 1
      );


    drawCount();

  }
);


dietSel.addEventListener(
  "change",
  drawWho
);


$("name").addEventListener(
  "input",
  drawWho
);


$("name2").addEventListener(
  "input",
  drawWho
);


document
  .querySelectorAll(
    'input[name="attending"]'
  )
  .forEach(
    radio=>{

      radio.addEventListener(
        "change",
        toggleFields
      );

    }
  );


/* =========================================
   ERROR
   ========================================= */

function showError(
  message,
  focusEl
){

  err.textContent =
    message;


  err.hidden =
    false;


  send.disabled =
    false;


  send.textContent =
    T[lang].send;


  if(focusEl){

    focusEl.focus();

  }

}


/* =========================================
   SUBMIT
   ========================================= */

form.addEventListener(
  "submit",
  async event=>{

    event.preventDefault();


    err.hidden =
      true;


    if(
      !SCRIPT_URL ||
      SCRIPT_URL.includes(
        "PASTE_YOUR"
      )
    ){

      return showError(
        T[lang].errConfig
      );

    }


    const name =
      $("name")
        .value
        .trim();


    const phone =
      $("phone")
        .value
        .trim();


    const going =
      form.attending.value ===
      "yes";


    const two =
      going &&
      count === 2;


    const name2 =
      two

        ? $("name2")
            .value
            .trim()

        : "";


    if(!name){

      return showError(
        T[lang].errName,
        $("name")
      );

    }


    if(!phone){

      return showError(
        T[lang].errPhone,
        $("phone")
      );

    }


    if(
      two &&
      !name2
    ){

      return showError(
        T[lang].errName2,
        $("name2")
      );

    }


    /* Diet */

    let dietLabel =
      "";


    if(
      going &&
      dietSel.value !==
      "none"
    ){

      const diet =
        DIETS.find(
          item =>
          item.v ===
          dietSel.value
        );


      if(
        dietSel.value ===
        "other"
      ){

        const other =
          $("dietother")
            .value
            .trim();


        if(!other){

          return showError(
            T[lang].errOther,
            $("dietother")
          );

        }


        dietLabel =
          other;

      }

      else{

        dietLabel =
          diet.es;

      }

    }


    /* Applies to */

    let appliesTo =
      "";


    if(
      dietLabel &&
      two
    ){

      const who =
        form.who.value;


      appliesTo =

        who === "p1"

          ? name

          : who === "p2"

            ? name2

            : "Ambos";

    }

    else if(
      dietLabel
    ){

      appliesTo =
        name;

    }


    const payload = {

      name,

      name2,

      phone,

      attending:
        going
          ? "Yes"
          : "No",

      guests:
        going

          ? Math.min(
              count,
              MAX_GUESTS
            )

          : 0,

      diet:
        dietLabel,

      appliesTo,

      note:
        $("note")
          .value
          .trim(),

      lang

    };


    send.disabled =
      true;


    send.textContent =
      "· · ·";


    try{

      await fetch(
        SCRIPT_URL,
        {

          method:
            "POST",

          mode:
            "no-cors",

          headers:{
            "Content-Type":
              "text/plain;charset=utf-8"
          },

          body:
            JSON.stringify(
              payload
            )

        }
      );


      form.hidden =
        true;


      $("done").hidden =
        false;


      $("done")
        .scrollIntoView({

          behavior:
            "smooth",

          block:
            "center"

        });


    }

    catch(error){

      showError(
        T[lang].err
      );

    }

  }
);


/* =========================================
   INITIALIZE
   ========================================= */

paint();

toggleFields();
