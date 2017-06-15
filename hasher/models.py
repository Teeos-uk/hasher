from hasher import app, db

class Hash(db.Model):
    data = db.Column(db.String(64), primary_key=True)
    count = db.Column(db.Integer)

    def __init__(self, data):
        self.data = data
        self.count = 1

    def __repr__(self):
        return '<Hash {}, {}>'.format(self.data[:8], self.count)
