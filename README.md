# sqlbulletingrupp1

# Gruppexamination - SQL bulletin

[Länk till ER-modul](https://drive.google.com/file/d/1S8knsKhz8_1tJu8t8I85uxx82wbZxrWg/view?usp=sharing)

## Instruktioner

Ni ska i denna gruppexamination bygga ett API för en tjänst som fungerar som en anslagstavla. En användare kan posta ett meddelande till en kanal som denna "prenumererar" på samt se andra meddelanden som finns i den kanalen. Tänk typ väldigt enkla Facebook grupper.

* En användare kan "prenumerera" på ingen eller flera olika kanaler. -Check
* En användare kan posta ett meddelande till enbart en kanal. Kan dock bara posta ett meddelande till en kanal som användaren "prenumererar" på. -Check
* En användare kan äga inga eller flera kanaler. -Check
* Ett meddelande kan tillhöra enbart en kanal (**Ej VG**) -Check
* Ett meddelande kan enbart komma från en användare. -Check
* En kanal kan ha inga eller flera meddelanden. -Check
* En kanal kan enbart ha en ägare. -Check


Läs igen noga ovan och därför modellera upp databasen med dess entiteter och relationer i ett ER-diagram. Därefter bygg databasen och API:et.

**Hur noga ni vill vara med API:et får ni själva välja så länge det fungerar enligt kraven ovan. Exempelvis är det inget krav på att validera någon data från frontend eller använda sig av JSON Web token för att skapa en inloggningssession.**

## Betygskriterier

**För Godkänt:**
* Har ett komplett ER-diagram med alla entiteter och relationer som täcker in kraven ovan.
* Uppfyller all funktionalitet.
* bifoga exempelanrop till alla endpoints (se länk under inlämning)

**För Väl Godkänt:**
* Ett meddelande kan tillhöra en eller flera kanaler.
* Det går att sortera meddelanden på datum.

## Handledning

Tid för handledning på torsdagens lektion via discord

## Inlämning

Inlämning sker på Awesomo med en länk till ert Github repo med er kod senast måndag 20/5 23:59.
[dokumentation för att importera/exportera data till postman](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-and-exporting-overview/#importing-data-into-postman)
