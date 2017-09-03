import models
import config

models.db.create_all()

db = models.db
Day = models.Day

for day in config.WEEKDAYS:
    db.session.add(Day(day))

db.session.commit()
