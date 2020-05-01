### Tipped

## A Resource for Bartenders by Bartenders

Welcome to tipped. This app was designed with intention of allowing bartenders easy access to cocktail recipes through manipulation of the data found in the CocktailDB and to be able to connect with other users in the service industry. It allows users to make a profile that they can log in and out of along with showing other users, what city they work in, and the bars they've worked at. Although not yet implemented at this time, this app should function as a social network for this particular niche. 

To use this app you need to first install the technologies used, which can be found in the package.json. These include:
    async,
    axios,
    bcryptjs,
    connect-flash,
    dotenv,
    ejs,
    express:,
    express-ejs-layouts,
    express-session:,
    method-override,
    moment,
    morgan,
    passport,
    passport-local,
    pg,
    sequelize,
    and sequelize-cli.
    
First run npm i to install all necessary packages

Next, to be sure that databases are connected, run 
sequelize db:migrate
    
Once this operation has been completed, you should be able to create a user profile. Make sure to click Sign Up and fill out the form.

Then, you will be able to use the robust search function that is at the core of this app. This app allows you to search for drinks in the 'Drinks' or 'Ingredients' tabs, and continue this process in a circular fashion until a recipe shows up that you'd like to try. If you like a cocktail recipe, you can add it to your favorites for easy access or delete later if you get tired of it.

Users can edit and delete their profile information at any time along with being able to see other user's profiles on the site.

The live site is hosted on herokuapp.com and can be accessed with this link:
https://tippedcocktails.herokuapp.com/
