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

### 4. Create a new database for the new project

```sh
createdb <new_db_name>
```

**For example**

```sh
createdb brand_new
```

### 5. Alter Sequelize Config File

In `config/config.json`, update the database name to the one created in step 4. Other settings likely ok, but check username, password, and dialect.

### 6. Check the user model for relevance to new project's needs

For example, if the new project doesn't need a birthday field, then delete it from the user model and user migration files.

### 7. Run the sequelize migration

```sh
sequelize db:migrate
```

If you need to undo the migration and change data in the user models afterwards use

```sh
sequelize db:migrate:undo
```

Then run the migration again

### 8. Create a file for the environment variables

```sh
touch.env
```

> Alternatively just create vie text editor

Include the following .env variables:

* SESSION_SECRET - this is a key for the session to use
* API KEYS - if outside data is being sourced

### 9. Run the server and make sure it works

**with nodemon**

```sh
nodemon
```

**without nodemon**

```sh
node index.js
```

### 10. Delete the origin that points to the boilerplate repository

Currently if we run this command:

```sh
git remote -v
```

It will show as being connected to the boilerplate repository. We want a fresh repository instead, so let's delete the origin remote:

```sh
git remote remove origin
```

### 11. Create an empty git repository

Via the GitHub website. Follow directions as they show up when you create a new repository

```sh
git init
git add .
git commit -m "Initial commit"
git remote add origin <new_repo_link>
git push origin master
```

**Happy developing!**
