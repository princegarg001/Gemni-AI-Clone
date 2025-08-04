
 function fetchResults(){
 let chat = document.getElementById("text-input").value;
 appendmessage("user",chat);
 document.getElementById("text-input").value="";
 document.getElementsByClassName("header")[0].style.display= "none";
 fetchapiResponse(chat);

}

 async function fetchapiResponse(chat){
   const resp=  await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-goog-api-key': 'AIzaSyB6_v66znPXQBrbf3yRs1L6JN-CbtUYOu8'
  },
  // body: '{\n    "contents": [\n      {\n        "parts": [\n          {\n            "text": "Explain how AI works in a few words"\n          }\n        ]\n      }\n    ]\n  }',
  body: JSON.stringify({
    'contents': [
      {
        'parts': [
          {
            'text': chat
          }
        ]
      }
    ]
  })
});
const response =  await resp.json();

appendmessage("Gemini",response.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1"));
}

function appendmessage(sender,chat){
  let chatArea = document.getElementById("chatArea");
  const MsgElement = document.createElement("div"); 
MsgElement.className = `message ${sender}`;
MsgElement.innerHTML = `<p> ${chat}</p>` ;
chatArea.appendChild(MsgElement);
}