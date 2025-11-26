from .db import db
from datetime import datetime


class Collection(db.Model):
    __tablename__ = 'collections'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    trail_id = db.Column(db.Integer, db.ForeignKey('trails.id'), nullable=False)
    visited = db.Column(db.Boolean, nullable=False, default=False)
    want_to_visit = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship('User', back_populates='collections')
    trail = db.relationship('Trail', back_populates='collections')

    # Unique constraint to prevent duplicate user-trail combinations
    __table_args__ = (
        db.UniqueConstraint('user_id', 'trail_id', name='unique_user_trail'),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'trail_id': self.trail_id,
            'visited': self.visited,
            'want_to_visit': self.want_to_visit,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def to_dict_with_trail(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'trail_id': self.trail_id,
            'visited': self.visited,
            'want_to_visit': self.want_to_visit,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'trail': self.trail.to_dict_with_state() if self.trail else None
        }
