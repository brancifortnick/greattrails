from flask.cli import AppGroup
from .users import seed_users, undo_users
from .states import seed_states, undo_states
from .trails import seed_trails, undo_trails
from .reviews import seed_reviews, undo_reviews
from .collections import seed_collections, undo_collections

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_states()
    seed_trails()
    seed_reviews()
    seed_collections()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_collections()
    undo_reviews()
    undo_trails()
    undo_states()
    undo_users()
    # Add other undo functions here
