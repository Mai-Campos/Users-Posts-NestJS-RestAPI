<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Users-Posts-NestJS-RestAPI

REST API developed with NestJS and PostgreSQL, using direct SQL without ORM, to handle Users and Posts with 1:N relationships.

## Description

This project implements:

- User CRUD
- Post CRUD
- DTO validation with `class-validator`
- User → Posts relationship **(1:n)**
- Endpoints that include `JOINS`
- Best Practices 👍🏻

### Development Notes

This project allowed me to practice and strengthen fundamental NestJS and backend concepts, including:

1. Data persistence without an ORM, using direct **SQL**.
2. Repository pattern.
3. Dynamic partial updates and using **JOINs** to retrieve related data.
   In short, it helped me solidify best practices in NestJS and learn how to build robust APIs with PostgreSQL without relying on an ORM.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
