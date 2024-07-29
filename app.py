from flask import Flask, render_template, request
from khnormal import khnormal

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def normalizer():
    input_text = ''
    normalized_text = ''
    if request.method == 'POST':
        input_text = request.form['input_text']
        normalized_text = khnormal(input_text)
    return render_template('index.html', input_text=input_text, normalized_text=normalized_text)


if __name__ == '__main__':
    app.run(debug=True)
