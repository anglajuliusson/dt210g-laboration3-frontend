# Frontend – Personlig blogg (React + JWT)

Detta projekt är frontend-delen av en personlig bloggapplikation. Applikationen är byggd med React och kommunicerar med ett separat backend-API. Alla besökare kan läsa blogginlägg, men endast en inloggad administratör kan skapa, uppdatera och ta bort inlägg.

Frontend-applikationen använder JWT för autentisering och skyddar administrativa vyer genom att kontrollera om en giltig token finns lagrad.

---

## Funktionalitet

Applikationen innehåller följande funktioner:

- Publik startsida som listar alla blogginlägg
- Dynamiska routes för enskilda blogginlägg
- Inloggningssystem med JWT-token
- Skyddad administrationssida
- Möjlighet att:
  - Skapa nya inlägg
  - Redigera befintliga inlägg
  - Ta bort inlägg

---

## Teknikstack

- **React**
- **TypeScript**
- **React Router**
- **Fetch API**
- **JWT (hantering via localStorage)**

---

## Installation

Installera beroenden:
```bash
npm install
```

Starta utvecklingsservern:
```bash
npm run dev
```

Frontend körs som standard på:
```
http://localhost:5173
```

Backend-API måste vara igång på:
```
http://localhost:3000
```

## Routing

Applikationen använder React Router och innehåller minst följande sidor:

/blog-posts – Lista över alla blogginlägg (publik)

/blog-posts/:id – Enskilt blogginlägg (publik, dynamisk route)

/login – Inloggningssida (publik)

/admin – Administrationssida (skyddad)

## Autentisering

Vid inloggning skickas användarnamn och lösenord till backend:
```json
{
  "username": "admin",
  "password": "password"
}
```

Vid korrekt inloggning returneras en JWT-token som sparas i:
```
localStorage
```

Token skickas sedan med i skyddade anrop via header:
```
Authorization: Bearer <token>
```

Om ingen giltig token finns omdirigeras användaren från /admin till /login.

## Skyddade vyer

Administrationssidan är skyddad och kräver giltig JWT-token. Där kan administratören:

Skapa nya inlägg

Redigera befintliga inlägg

Ta bort inlägg

Logga ut (token tas bort från localStorage)
