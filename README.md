# quip
## Codingbat clone

This is a website aimed at teaching code through short examples. However, `quip` aims to use modern technology (`pyodide`, `monaco`) to provide a smoother experience than the bare-basics approach of codingbat.com. Currently in barely-working-demo phase.


## Local install

should? work

Create virtual environment with 'venv'
`python -m venv env`
Activate environment (will be slightly different on windows)
linux: `source .\env\bin\activate`
install packages
`pip install django psycopg2 python-dotenv`
Get a postgres server running @ localhost with data specified in quip/quip/settings.py@DATABASES
recommend [this digitalocean article](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-20-04)
Copy database user password in a .env file at root of repository with PG_PASSWORD key set correctly
go to /quip
run `python manage.py makemigrations` & `python manage.py migrate`
pray
`python manage.py runserver`
& voila it works perfectly for sure

Also, import all the challenges from quip/challenges/data manually or via light scripting