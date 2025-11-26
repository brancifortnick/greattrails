from app.models import db, Collection
from sqlalchemy import text


# Adds demo collections
def seed_collections():
    collection1 = Collection(
        user_id=1,
        trail_id=4,
        visited=True,
        want_to_visit=False
    )
    collection2 = Collection(
        user_id=1,
        trail_id=7,
        visited=True,
        want_to_visit=False
    )
    collection3 = Collection(
        user_id=1,
        trail_id=10,
        visited=False,
        want_to_visit=True
    )
    collection4 = Collection(
        user_id=1,
        trail_id=15,
        visited=False,
        want_to_visit=True
    )

    db.session.add(collection1)
    db.session.add(collection2)
    db.session.add(collection3)
    db.session.add(collection4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the collections table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_collections():
    db.session.execute(text('TRUNCATE collections RESTART IDENTITY CASCADE;'))
    db.session.commit()
