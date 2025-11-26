from .db import db


class Trail(db.Model):
    __tablename__ = 'trails'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000))
    length = db.Column(db.Numeric, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)  # 1-10 scale
    elevation_gain = db.Column(db.Integer)  # in feet
    image_url = db.Column(db.String(500))  # path to trail image
    state_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=False)
    cross_state = db.Column(db.Boolean, nullable=False, default=False)

    # Relationships
    state = db.relationship('State', back_populates='trails')
    reviews = db.relationship('Review', back_populates='trail', cascade='all, delete-orphan')
    collections = db.relationship('Collection', back_populates='trail', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'length': float(self.length) if self.length else None,
            'difficulty': self.difficulty,
            'elevation_gain': self.elevation_gain,
            'image_url': self.image_url,
            'state_id': self.state_id,
            'cross_state': self.cross_state
        }

    def to_dict_with_state(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'length': float(self.length) if self.length else None,
            'difficulty': self.difficulty,
            'elevation_gain': self.elevation_gain,
            'image_url': self.image_url,
            'state_id': self.state_id,
            'cross_state': self.cross_state,
            'state': self.state.to_dict() if self.state else None
        }

    def to_dict_with_reviews(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'length': float(self.length) if self.length else None,
            'difficulty': self.difficulty,
            'elevation_gain': self.elevation_gain,
            'image_url': self.image_url,
            'state_id': self.state_id,
            'cross_state': self.cross_state,
            'state': self.state.to_dict() if self.state else None,
            'reviews': [review.to_dict_with_user() for review in self.reviews]
        }
