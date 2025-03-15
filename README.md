# OndePassa

## Descrição
Uma aplicação full-stack desenvolvida com Java Spring Boot, Angular e Ionic, projetada para fornecer uma solução de indicação de eventos e transmissões esportivas em multiplos serviços de streaming. O projeto segue uma estrutura monorepo, integrando backend, frontend e aplicação mobile híbrida.

## Stack Tecnológico
- **Backend:** Java Spring Boot, Spring Security (JWT, OAuth0), MySQL, Docker
- **Frontend:** Angular 19, Material Design
- **Mobile:** Ionic (Geração de APK Android, implantação futura na Play Store)
- **Infraestrutura:** AWS/GCP (Implantação na Nuvem), Docker, GitHub Actions (CI/CD)

## Estrutura do Projeto
```
monorepo/
│── backend/      # Backend em Java Spring Boot
│── frontend/     # Frontend em Angular
│── mobile/       # Aplicação mobile em Ionic
│── docs/         # Documentação (Swagger/OpenAPI)
│── .github/      # Workflows de CI/CD
│── README.md     # Documentação do projeto
```

## Aplicação Mobile First

A aplicação foi projetada seguindo o conceito de mobile first, garantindo que a melhor experiência seja no aplicativo mobile. O frontend web é voltado principalmente para a administração da plataforma, oferecendo métricas de acesso, monitoramento e sessões que permitem ao administrador modificar e adicionar informações de eventos e usuários. No entanto, o frontend web pode ser utilizado normalmente pelos usuários, caso desejem acessá-lo via navegador.

## Pré-requisitos
Certifique-se de ter os seguintes requisitos instalados:
- **Java 21+**
- **Node.js 18+ & npm**
- **Angular CLI**
- **Ionic CLI**
- **Docker & Docker Compose**
- **MySQL ou PostgreSQL**
- **AWS CLI / GCP CLI** (para implantação na nuvem)

## Configuração e Instalação
### Backend
```sh
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

### Frontend
```sh
cd frontend
npm install
ng serve
```

### Mobile
```sh
cd mobile
npm install
ionic serve
```

## Variáveis de Ambiente
Crie arquivos `.env` nos diretórios `backend/`, `frontend/` e `mobile/` com as configurações necessárias para cada ambiente.

## Migrações do Banco de Dados
```sh
cd backend
./mvnw flyway:migrate
```

## Testes
- **Backend:** JUnit, Mockito
- **Frontend:** Jasmine, Karma
- **Testes E2E:** JMeter, SonarQube (a implementar)

## Implantação
### Docker Compose (Testes Locais)
```sh
docker-compose up --build
```

### CI/CD (GitHub Actions)
Configurado em `.github/workflows` para builds e implantações automatizadas.

### Implantação na Nuvem
AWS/GCP - A implementar

## Licença
Licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

