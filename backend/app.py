from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
#CORS(app, resources={r"/items": {"origins": "http://localhost:3000"}})
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

@app.route('/')
def index():
    return "Welcome to the Flask API!"

@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([{'id': item.id, 'name': item.name} for item in items])

@app.route('/items', methods=['POST'])
def add_item():
    data = request.json
    new_item = Item(name=data['name'])
    db.session.add(new_item)
    db.session.commit()

    return jsonify({'id': new_item.id, 'name': new_item.name}), 201

@app.route('/items/<int:id>', methods=['PUT'])
def update_item(id):
    data = request.json
    item = Item.query.get(id)
    if item:
        item.name = data['name']
        db.session.commit()
        return jsonify({'id': item.id, 'name': item.name})
    return jsonify({'message': 'Item not found'}), 404

@app.route('/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    item = Item.query.get(id)
    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Item deleted'})
    return jsonify({'message': 'Item not found'}), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000)
