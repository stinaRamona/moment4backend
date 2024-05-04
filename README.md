# Moment 4 Backend del 1 
I detta moment skapas en webbtjänst som hanterar användarkonton. Användarkonton sparas i en SQLite databas där lösenordet hashas innan det sparas ner. För inloggning av användaren så autentiseras först kontot genom 
JSON Web Token. 

<h2>Anrop som kan göras till API:et:</h2>
<table>
  <thead>
    <th>Metod</th>
    <th>Ändpunkt</th>
    <th>Beskrivning</th>
  </thead> 
  <tbody>
    <tr>
      <td>GET</td>
      <td>/api/mypage</td>
      <td>Hämtar data om användare (om de autentiseringen är korrekt)</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/register</td>
      <td>Lägger till ny användare</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/login</td>
      <td>Loggar in användare</td>
    </tr>
  </tbody>
</table> 

Svaret från API:et kommer i JSON-format: 
```
  {
    "_id": "66277340dc818dfe14117b7c",
    "email": "exempel@exempel",
    "username": "exempel",
    "password": "*hashat lösenord*",
    "created": "2024-05-03 10:18:40"
  },
```

