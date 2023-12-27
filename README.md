# quip
## Codingbat clone

This is a website aimed at teaching code through short examples. However, `quip` aims to use modern technology (`pyodide`, `monaco`) to provide a smoother experience than the bare-basics approach of codingbat.com. Currently in barely-working-demo phase.


## Local install

(linux)
should maybe work.
- prerequisite: have a running postgres server @ localhost port 5432 w/ database quip, superuser quipuser.

```
git clone https://github.com/siiverfish/quip
cd quip
echo "PG_PASSWORD='<REPLACE WITH POSTGRES PASSWORD>'" > ./quip/.env
python -m venv env
source ./env/bin/activate
pip install -r requirements.txt
python ./quip/manage.py migrate
python ./quip/manage.py runserver
```
