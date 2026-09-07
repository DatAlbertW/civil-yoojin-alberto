/* =========================================
   Yoojin & Alberto RSVP
   Netlify + Apps Script protected version
   ========================================= */


/*
  Requests now go through the Netlify Function.

  The Netlify Function then communicates
  privately with Google Apps Script.
*/

const RSVP_ENDPOINT =
  "/api/rsvp";


const MAX_GUESTS =
  2;


/* =========================================
   SAFE LOCAL STORAGE
   ========================================= */

function storageGet(key){

  try{

    return localStorage.getItem(
      key
    );

  }

  catch(error){

    return null;

  }

}


function storageSet(
  key,
  value
){

  try{

    localStorage.setItem(
      key,
      value
    );

  }

  catch(error){

    /*
      Website still works even when
      localStorage is unavailable.
    */

  }

}


/* =========================================
   INVITATION IDENTIFIER
   ========================================= */

/*
  Example:

  https://civil-yoojin-alberto.netlify.app/?i=A7K4P9
*/

function getInviteId(){

  const params =
    new URLSearchParams(
      window.location.search
    );


  return (
    params.get("i") ||
    ""
  )
    .trim()
    .toUpperCase();

}


const INVITE_ID =
  getInviteId();


/* =========================================
   DEVICE IDENTIFIER
   ========================================= */

/*
  This is NOT fingerprinting.

  We simply create a random ID and store it
  in this browser.

  The invitation ID remains the primary
  protection against duplicate RSVPs.
*/

function createDeviceId(){

  if(
    window.crypto &&
    typeof window.crypto.randomUUID ===
      "function"
  ){

    return window.crypto.randomUUID();

  }


  if(
    window.crypto &&
    typeof window.crypto.getRandomValues ===
      "function"
  ){

    const array =
      new Uint32Array(4);


    window.crypto.getRandomValues(
      array
    );


    return Array
      .from(array)
      .map(
        value =>
          value.toString(16)
      )
      .join("-");

  }


  /*
    Fallback for very old browsers.
  */

  return (
    "device-" +
    Date.now() +
    "-" +
    Math.random()
      .toString(36)
      .slice(2) +
    "-" +
    Math.random()
      .toString(36)
      .slice(2)
  );

}


function getDeviceId(){

  let deviceId =
    storageGet(
      "weddingDeviceId"
    );


  if(!deviceId){

    deviceId =
      createDeviceId();


    storageSet(
      "weddingDeviceId",
      deviceId
    );

  }


  return deviceId;

}


const DEVICE_ID =
  getDeviceId();


/* =========================================
   RSVP STORAGE KEY
   ========================================= */

/*
  Saved independently for every invitation.

  This means one browser could legitimately
  open two different invitation links without
  one blocking the other.
*/

function submittedStorageKey(){

  return (
    "weddingRsvpSubmitted:" +
    INVITE_ID
  );

}


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

    languageLabel:
      "Idioma",

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

    errInvite:
      "Este enlace de invitación no es válido.",

    errInviteMissing:
      "Esta invitación necesita un enlace personalizado para confirmar asistencia.",

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

    languageLabel:
      "Language",

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

    errInvite:
      "This invitation link is not valid.",

    errInviteMissing:
      "A personalized invitation link is required to RSVP.",

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

    languageLabel:
      "언어",

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

    errInvite:
      "유효하지 않은 초대 링크입니다.",

    errInviteMissing:
      "참석 여부를 보내려면 개인 초대 링크가 필요합니다.",

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
  form.querySelector(
    ".send"
  );


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

      : [
          navigator.language ||
          "es"
        ];


  for(
    const item
    of languages
  ){

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
  Keep manually selected language.

  Otherwise use the language
  configured on the guest's device.
*/

const savedLang =
  storageGet(
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
    .querySelectorAll(
      "[data-t]"
    )
    .forEach(
      el=>{

        const value =
          T[lang][
            el.dataset.t
          ];


        if(
          value !==
          undefined
        ){

          el.textContent =
            value;

        }

      }
    );


  document
    .querySelectorAll(
      "[data-ph]"
    )
    .forEach(
      el=>{

        el.placeholder =
          T[lang][
            el.dataset.ph
          ] ||
          "";

      }
    );


  /* Diet menu */

  const keep =
    dietSel.value ||
    "none";


  dietSel.innerHTML =
    "";


  DIETS.forEach(
    item=>{

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

    }
  );


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


      storageSet(
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

  return (
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
   NORMAL ERROR
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
   FATAL INVITATION ERROR
   ========================================= */

/*
  Used when the invitation code is missing
  or does not exist.

  The form can no longer be submitted.
*/

function showFatalError(
  message
){

  err.textContent =
    message;


  err.hidden =
    false;


  send.disabled =
    true;


  send.textContent =
    T[lang].send;

}


/* =========================================
   THANK YOU SCREEN
   ========================================= */

function showThankYou(){

  /*
    Hide the actual form so there is
    no possibility of submitting again
    through the normal interface.
  */

  form.hidden =
    true;


  $("done").hidden =
    false;


  /*
    Browser-side convenience.

    Server-side invitation verification
    remains the real protection.
  */

  if(INVITE_ID){

    storageSet(
      submittedStorageKey(),
      "true"
    );

  }

}


/* =========================================
   CHECK EXISTING RSVP
   ========================================= */

async function checkAlreadySubmitted(){

  /*
    Invitation URLs must contain:

    ?i=INVITATION_CODE
  */

  if(!INVITE_ID){

    showFatalError(
      T[lang]
        .errInviteMissing
    );


    return;

  }


  /*
    Fast local check.

    If this exact invitation was already
    submitted from this browser there is
    no reason to wait for the server.
  */

  if(
    storageGet(
      submittedStorageKey()
    ) === "true"
  ){

    showThankYou();

    return;

  }


  /*
    Server check.

    This catches:
    - same invitation from another browser
    - same invitation from another device
    - existing RSVP after localStorage clear
  */

  try{

    const params =
      new URLSearchParams({

        inviteId:
          INVITE_ID,

        deviceId:
          DEVICE_ID

      });


    const response =
      await fetch(
        `${RSVP_ENDPOINT}?${params.toString()}`,
        {

          method:
            "GET",

          cache:
            "no-store"

        }
      );


    const result =
      await response.json();


    /*
      Invalid invitation.
    */

    if(
      result.error ===
      "invalid_invitation"
    ){

      showFatalError(
        T[lang].errInvite
      );


      return;

    }


    /*
      Already answered.
    */

    if(
      result.ok &&
      result.alreadySubmitted
    ){

      showThankYou();

    }

  }

  catch(error){

    /*
      Don't permanently block the form
      merely because the initial status
      check failed.

      Submission itself will still be
      validated by the server.
    */

    console.error(
      "Could not check RSVP status:",
      error
    );

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


    /*
      A valid personalized invitation link
      is required.
    */

    if(!INVITE_ID){

      return showFatalError(
        T[lang]
          .errInviteMissing
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


    /* =====================================
       VALIDATION
       ===================================== */

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


    /* =====================================
       DIET
       ===================================== */

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

      else if(diet){

        /*
          Save standardized Spanish label
          in Google Sheets regardless of
          interface language.
        */

        dietLabel =
          diet.es;

      }

    }


    /* =====================================
       APPLIES TO
       ===================================== */

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


    /* =====================================
       PAYLOAD
       ===================================== */

    const payload = {

      /*
        Primary unique identifier.
      */

      inviteId:
        INVITE_ID,


      /*
        Secondary browser/device identifier.
      */

      deviceId:
        DEVICE_ID,


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


    /* =====================================
       PREVENT DOUBLE CLICK
       ===================================== */

    send.disabled =
      true;


    send.textContent =
      "· · ·";


    try{

      const response =
        await fetch(
          RSVP_ENDPOINT,
          {

            method:
              "POST",

            headers:{

              "Content-Type":
                "application/json"

            },

            body:
              JSON.stringify(
                payload
              )

          }
        );


      let result;


      try{

        result =
          await response.json();

      }

      catch(error){

        throw new Error(
          "invalid_server_response"
        );

      }


      /* ===================================
         INVALID INVITATION
         =================================== */

      if(
        result.error ===
        "invalid_invitation"
      ){

        showFatalError(
          T[lang].errInvite
        );


        return;

      }


      /* ===================================
         SERVER ERROR
         =================================== */

      if(
        !response.ok ||
        !result.ok
      ){

        throw new Error(
          result.error ||
          "rsvp_error"
        );

      }


      /*
        IMPORTANT:

        A successful first submission and
        a duplicate submission intentionally
        produce exactly the same interface.

        Guests never see a separate
        "you already submitted" message.
      */

      showThankYou();


      $("done")
        .scrollIntoView({

          behavior:
            "smooth",

          block:
            "center"

        });

    }


    catch(error){

      console.error(
        "RSVP submission error:",
        error
      );


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

checkAlreadySubmitted();
