from flask import render_template, request
from hasher import app, db
from hasher.models import Hash

@app.route('/')
def index():
        return render_template('index.html')

@app.route('/hash/<raw_hash>')
def process_hash(raw_hash):

    #print(raw_hash)
    print(len(raw_hash), raw_hash)
    h = Hash.query.get(raw_hash)
    if h is not None:
        h.count += 1
    else:
        h = Hash(raw_hash)
    print(h.data)
    db.session.add(h)
    db.session.commit()
    return str(h.count)
