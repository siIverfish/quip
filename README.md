# quip
## Codingbat clone

This is a website aimed at teaching code through short examples. However, `quip` aims to use modern technology (`pyodide`, `monaco`) to provide a smoother experience than the bare-basics approach of codingbat.com. Currently in barely-working-demo phase.


## Local install

1. Create virtual environment with 'venv'
`python -m venv env`

2. Activate environment (will be slightly different on windows)
linux: `source .\env\bin\activate`
windows: `.\env\Scripts\activate`?

3. Install packages
`pip install django psycopg2 python-dotenv`

4. (hard part) Get a postgres server running @ localhost with data specified in quip/quip/settings.py@DATABASES
I recommend [this digitalocean article](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-20-04)
Copy database user password in a .env file at root of repository with PG_PASSWORD key set correctly

5. Migrate
go to /quip
run `python manage.py makemigrations` & `python manage.py migrate`

6. pray

7. `python manage.py runserver`

8. & voila it works perfectly for sure

9. Also, import all the challenges from quip/challenges/data into postgres database manually or via light scripting