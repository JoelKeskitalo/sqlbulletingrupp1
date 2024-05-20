[Länk till ER-modul](https://drive.google.com/file/d/1S8knsKhz8_1tJu8t8I85uxx82wbZxrWg/view?usp=sharing)

Hur vi gick tillväga för att posta och  hämta:
* En användare kan "prenumerera" på ingen eller flera olika kanaler.
* En användare kan posta ett meddelande till enbart en kanal. Kan dock bara posta ett meddelande till en kanal som användaren "prenumererar" på. 
------------------------------------------------------
* Ett meddelande kan tillhöra enbart en kanal (**Ej VG**)
För att posta meddelande till en kanal: 
http://127.0.0.1:5000/messages (POST)
{
  "content": "Hej och hå!",
  "user_id": "1",
  "channel_id": "1"
}
---------------------------------------------------------

* Ett meddelande kan enbart komma från en användare.
http://127.0.0.1:5000/messages (POST)
{
  "content": "Hej och hå!",
  "user_id": "1",
  "channel_id": "1"
}
-----------------------------------------------------------------
* En kanal kan ha inga eller flera meddelanden.
http://127.0.0.1:5000/messages (POST)
{
  "content": "Gonatt!",
  "user_id": "5",
  "channel_id": "2"
}
-------------------------------------------------------
* En kanal kan enbart ha en ägare.
http://127.0.0.1:5000/channels (POST)
{
    "name": "Kanal-5",
    "owner_id": "10"
}
-------------------------------------------------------
* En användare kan äga inga eller flera kanaler.
För att bestämma en ägare till en eller flera kanaler:
http://127.0.0.1:5000/channels (POST)
{
    "name": "Apkanalen",
    "owner_id": "4"
}
----------------------------------------------------------------
