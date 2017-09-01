server:
	. venv/bin/activate; python app/main.py

db:
	rm -f app/deals_app.db
	. venv/bin/activate; python app/makedb.py
