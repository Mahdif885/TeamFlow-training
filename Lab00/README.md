# TeamFlow — parcours Full Stack Angular / Spring Boot

## Versions pedagogiques
- Java 21 ; Maven 3.9.x ; Spring Boot 3.5.16 (version figee pour la formation)
- Node 22.12+ ; Angular 21.2 ; TypeScript 5.9

## Executer le backend
```bash
cd backend
mvn spring-boot:run
```
Endpoint de base : http://localhost:8080/api/health

## Executer le frontend (autre terminal)
```bash
cd frontend
npm install
npm start
```
Interface : http://localhost:4200

**Attention** : les librairies sont telechargees la premiere fois. N'utilisez pas `npm ci` sans package-lock.json.
Les credentials et secrets pedagogiques des labs 06-08 ne doivent jamais etre deployes en production.
