# clubcorner_backend

Backend: https://github.com/schustern/clubcorner_backend

Frontend: https://github.com/schustern/clubcorner_frontend

Präsentation + Video: https://slides.com/janoe/clubcorner/fullscreen

# Team
1. Nils Jünemann
2. Jan Oehlers
3. Jan Scheuermann
4. Niklas Schuster

# Anwendungsfall
Die Verwaltung und Organisation vieler Sportvereine funktioniert mithilfe von WhatsApp Gruppen. Diese sind unübersichtlich, jeder Nutzer kann beliebig viel schreiben, sodass eine Menge unwichtiger Nachrichten versendet werden und möglicherweise relevante Informationen untergehen und nicht wahrgenommen werden. Weiterhin ist die Planung der Spieler, welche ein Training zu- oder abgesagt haben und die damit folgende Kaderplanung mit hohem manuellen Aufwand verbunden. Aufgrund dessen wurden wir vom Vereinsvorsitzenden des TV Jahn Bockum, einem Sportverein aus Krefeld und insbesondere der Handballabteilung beauftragt eine App zur Mannschaftsverwaltung zu schreiben. Hauptansprechpartner war hier für Axel Jaspers (tvjahnbockum@web.de / +49 1729234516).

Die Hauptfunktionalität umfasst einen gemeinsamen Kalender als Kernpunkt der Mannschaftsverwaltung. Besonders wichtig war es auch, dass Spieler gleichzeitig in mehreren Mannschaften Spielen können, sowie Trainer zeitgleich auch Spieler sein können. Diese Funktionalität wurde von keinen den bisher existierenden Apps umgesetzt, weshalb der Verein keine dieser verwendet. Innerhalb der App sollen Trainer Termine erstellen, welche die zugehörigen Spieler der Mannschaft dann zu- oder absagen. Dadurch kann jeder der Nutzer auch die Zusagen zu bestimmten Terminen einsehen, um die Kaderplanung zu vereinfachen. Die App sammelt alle wichtigen Informationen in einem zentralen Ort und sorgt für übersichtliche Kommunikation. 

# Fachkonzept

## Rollen

### Admin  

Der Admin hat eine gesonderte Benutzeroberfläche der App und ist zuständig für grundlegende Verwaltung der App. Er kann Nutzer blockieren und legt Stammdaten fest, welche Mannschaften in der jeweiligen Spielzeit erstellt werden dürfen (Mannschaftsgrad entspricht Anzahl an aktiven Mannschaften für Altersklasse &amp; Geschlecht für die jeweilige Spielzeit)

### Trainer

Trainer sind auch Spieler (Anforderung des Kunden), unterscheiden sich zu diesen aber durch zusätzliche Funktionalitäten, innerhalb der Mannschaft in der sie Trainer sind. Diese umfassen die gesamte Verwaltung der Mannschaft. (zusätzliche Funktionen in der[Teampage](/README.md/###Teampage) beschrieben)

### Spieler

Die Spieler bilden den Großteil der Nutzer. Sie können Mannschaften über einen spezifischen Anmeldecode beitreten. Spieler geben persönliche Daten (Anmeldeadresse, Passwort, Name..) an und können diese jederzeit ändern. Innerhalb einer Mannschaft können eingeschriebene Spieler Terminen zu- oder absagen. Außerdem können neue Mannschaften erstellen. Wer eine Mannschaft erstellt wird automatisch zum Trainer dieser Mannschaft. 

## App

### Loginpage

Nutzer der App können sich auf der Loginpage registrieren (mit EmailAdresse, Passwort, Name) und anmelden (Emailadresse und Passwort)

### Homepage

Die Homepage umfasst eine Liste über alle Mannschaften, denen man zugeordnet ist. Über ein Input Feld kann mit einem erhaltenen Anmeldungscode einer neuen Mannschaft beigetreten werden.
Bei Erstellung der Mannschaft müssen folgende Parameter ausgewählt werden:
- Geschlecht
- Altersklasse
- Grad der Mannschaft (1., 2.,3…. Mannschaft dieser Altersklasse)

Diese Parameter können nur nach den Angaben des Admins ausgewählt werden, (also beispielsweise wenn der Admin angegeben hat es gibt 2 Mannschaften B-Jugend, können nur 2 Mannschaften in der B-Jugend dieser Sasion erstellt werden).

Jeder Nutzer der App kann auch eigenständig eine Mannschaft erstellen. Wenn ein Nutzer eine Mannschaft erstellt, wird dieser automatisch Trainer dieser Mannschaft.
Durch Anklicken einer der Mannschaften aus der Liste, wird die jeweilige Teampage geöffnet.
Oben Links kann eine Sidebar geöffnet werden. In dieser kann der Spieler seine persönlichen Informationen einsehen und ändern.

### Teampage
Die Teampage umfasst eine Übersicht mit allen Terminen der zugehörigen Mannschaft. Termine einer Mannschaft sind angesetzte Spiele und Trainingseinheiten, diese enthalten Datum, Uhrzeit, Ort, (Gegner).
In dieser Terminübersicht kann jeder Spieler dieser Mannschaft Termine zu- oder absagen.
Dem Trainer der Mannschaft wird ein zusätzlicher &quot;Fab Button&quot; angezeigt, über den er die Mannschaft verwalten kann. Dieses umfasst das Anzeigen der Spielerliste, Spieler einzuladen, Termin anzulegen und Mannschaften aufzulösen. Diese Funktionen werden als Pop-Ups oder Modals bereitgestellt.

Mit der Funktion Mannschaft auflösen kann der Trainer die Mannschaft komplett löschen.
Die Spielerliste zeigt dem Trainer alle eingeschriebenen Spieler der Mannschaft an und er kann Spieler aus der Mannschaft entfernen.
Über die Funktion Spieler einladen kann der Trainer den Anmeldecode der Mannschaft einsehen und diesen direkt per Mail teilen.
Der Trainer kann Spiele und Trainings anlegen. Bei Trainings können einzelne Termine, oder wiederholende Serien (Beispielsweise immer Dienstags 18 Uhr) angelegt werden. Bei Spielen hingegen kann zusätzlich ein Gegner eingetragen werden.
Außerdem können Spieler/Trainer Termine in der Übersicht auswählen, um sich anzuschauen wer zu- oder abgesagt hat. Dies ermöglicht eine einfache Kaderplanung. Der Trainer kann erstellte Termine auch wieder löschen.
## Verwendung gerätespezifischer Funktionen:
1. Kalender Anbindung für Termine
2. Google Maps Anbindung für Navigation
3. Push Benachrichtigungen
4. App funktioniert auf Android und im Browser 

## Technisches Konzept

Die App basiert auf einem MEAN Stack, bestehend aus einer MongoDB Datenbank, Express, Ionic verbunden mit Cordova für das Frontend und NodeJS für die Backendfunktionalität. Es gibt 2 verschiedene Docker Container, einer für die Nodeapp und einer für Mongo. Das Frontend mit Ionic wird auf dem Client bereitgestellt. Der Login basiert auf JWT Webtokens und die gesamte Kommunkation von Front- und Backend läuft mihilfe von einer Rest-Schnittstelle ab. Die verschiedenen Dockercontainer können über docker-compose gestartet werden. 

## Backlog
1. Deep Links beim Anmeldecode nutzen
2. Orte mittels Standort festlegen / Navigation
3. Anbindung an sis-Handball (Spielpläne)
4. Möglichkeit Passwort/Email zu ändern
5. Unterscheidung der Nutzer in Trainer & Spieler
6. Fix: Trainer kann sich selbst aus Mannschaft löschen, dann existiert diese noch und kann nicht mehr gelöscht werden
7. Unterscheidung von Spiel und Training im Frontend
8. Erstellung der Admin Rolle
9. Ende der Saison sollen Mannschaften gelöscht werden
10. Verschlüsselung (Datenbankauthentifizierung)
11. Logout (automatisch und manuell)
12. Möglichkeit Termine zu- oder abzusagen
