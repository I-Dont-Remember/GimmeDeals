from flask import Flask, render_template#send_file
import models, views

app = models.app
db = models.db

if __name__ == '__main__':
    app.run(debug=True)
