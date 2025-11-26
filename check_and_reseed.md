# Database Reseed Instructions

Since you've already run the migration (`flask db upgrade`), you now need to reseed the database to populate the `image_url` field for all trails.

## Steps to Reseed Database

Run these commands in your terminal:

```bash
# 1. Undo existing seed data
flask seed undo

# 2. Reseed with updated trail data (including image_url)
flask seed all
```

## What This Does

- **flask seed undo**: Removes all existing data from the database (users, states, trails, reviews, collections)
- **flask seed all**: Repopulates the database with fresh data from the seed files, including the new `image_url` field for all 50 trails

## Verify It Worked

After reseeding, you can verify the trails are loading:

1. Start your Flask server (if not already running): `flask run`
2. Visit `http://localhost:5000/api/trails/` in your browser
3. You should see JSON with all 50 trails, each including an `image_url` field like:
   ```json
   {
     "trails": [
       {
         "id": 1,
         "name": "Delta Marsh Walk",
         "image_url": "/assets/images/trail1.jpg",
         ...
       }
     ]
   }
   ```

## Alternative: Use pipenv

If `flask seed` commands don't work, try with pipenv:

```bash
pipenv run flask seed undo
pipenv run flask seed all
```
