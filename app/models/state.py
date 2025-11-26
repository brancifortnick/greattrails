from .db import db


class State(db.Model):
    __tablename__ = 'states'

    id = db.Column(db.Integer, primary_key=True)
    state_code = db.Column(db.String(2), nullable=False, unique=True)
    state_name = db.Column(db.String(100), nullable=False)

    # Relationships
    trails = db.relationship('Trail', back_populates='state', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'state_code': self.state_code,
            'state_name': self.state_name
        }

    def to_dict_with_trails(self):
        return {
            'id': self.id,
            'state_code': self.state_code,
            'state_name': self.state_name,
            'trails': [trail.to_dict() for trail in self.trails]
        }
