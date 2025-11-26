from app.models import db, Review
from sqlalchemy import text


# Adds demo reviews
def seed_reviews():
    review1 = Review(
        review='This trail is amazing! The views were absolutely breathtaking and the difficulty was just right.',
        user_id=1,
        trail_id=4
    )
    review2 = Review(
        review='This trail was difficult but worth every step. Beautiful scenery throughout.',
        user_id=1,
        trail_id=7
    )
    review3 = Review(
        review='Perfect for beginners! Well-maintained and easy to follow.',
        user_id=1,
        trail_id=8
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the reviews table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute(text('TRUNCATE reviews RESTART IDENTITY CASCADE;'))
    db.session.commit()
