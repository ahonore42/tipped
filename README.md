# Node Auth Boilerplate

This is a boilerplate for an Express app with local user authentication. It exists so I have a customized boilerplate and don't have to start from scratch on all my projects

## What It Includes

* Local Auth (email and password)
* Passport and passport-local
* Sessions for saving user info and displaying flash messages
* Settings for PostgreSQL
* Hashed passwords
* EJS templating and EJS layouts
* Sequelize user model
* Materialize styling - nav and footer

## Included Models

**User Model**

| Column | Type | Notes |
| ---------- | ----------- | --------------------------- |
| id | Integer | Serial Primary Key |
| firstname | String | Required Length > 1 |
| lastname | String | - |
| email | Email | Unique Login |
| password | String | Hash |
| bio | Text | - |
| birthday | Date | - |
| pic | String | - |
| admin | Boolean | Defaulted to False |
| createdAt | Date | Automaticall added by Sequelize |
| updatedAt | Date | Automaticall added by Sequelize |

| Method | Path | Purpose |
| ----- | ----------- | --------------------------- |
| GET | `/` | Home Page |
| GET | `*` | Catch-all for 404s |

## Included Routes

## Directions For Use
