from flask import Flask, render_template#send_file

app = Flask(__name__)
app.config['weekdays'] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

@app.route('/<day>')
def weekday(day):
    if day not in app.config['weekdays']:
        return '404 Not Found'
    return render_template('base_day.html',
                            day=day)

@app.route('/')
def main():
    return render_template('index.html',
                            weekdays=app.config['weekdays'])

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, port=5000)
