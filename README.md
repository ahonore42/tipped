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

## Included Routes

**Routes in index.js (main)**

| Method | Path | Purpose |
| ----- | ----------- | --------------------------- |
| GET | `/` | Home Page |
| GET | `*` | Catch-all for 404s |

**Routes in controllers/auth.js**

| Method | Path | Purpose |
| ----- | ----------- | --------------------------- |
| GET | `/auth/login` | Render Login Form |
| POST | `/auth/login` | Process Login Data |
| GET | `/auth/signup` | Render Signup Form |
| POST | `/auth/signup` | Process Signup Data |
| GET | `/auth/logout` | Remove User From Session + Redirect |

**Routes in controllers/profile.js**

| Method | Path | Purpose |
| ---- | ------------------- | ------------------------------------------------------- |
| GET | `/profile/user` | Show user dashboard (authorized user only) |
| GET | `/profile/admin` | Show admin dashboard (authorized admin only) |
| GET | `/profile/guest/:id` | View user dashboard as guest (authorized user only) |



## Directions For Use

### 1. Clone the repository, but with a different name

```sh
git clone <repo_link> <new_name>
```

**For example**

```sh
git clone https://github.com/ahonore42/boiler.git brand_new_project
```
### 2. Install the modules from package.json

```
npm i
```

### 3. Customize the new project

Remove default-y stuff. For example:

* Title in `layout.ejs`
* Logo field in the nav bar
* Description and Repository fields in package.json
* Remove this boilerplate's readme content
* Switch Favicon to project-specific one
* Re-style to match new project
