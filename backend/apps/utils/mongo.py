"""
Centralized MongoDB utility for all Zsyio backend apps.
Usage:
    from apps.utils.mongo import get_mongo_db, mongo_log

    # Get a collection
    db = get_mongo_db()
    if db:
        db['my_collection'].insert_one({...})

    # Or use the helper (auto-handles None client)
    mongo_log('my_collection', {'action': 'created', 'id': 1})
"""

import datetime
from django.conf import settings


def get_mongo_db(db_name='zsyio_db'):
    """
    Returns the MongoDB database object, or None if not connected.
    """
    client = getattr(settings, 'MONGO_CLIENT', None)
    if client:
        return client[db_name]
    return None


def mongo_log(collection_name: str, document: dict, db_name: str = 'zsyio_db') -> bool:
    """
    Insert a document into a MongoDB collection.
    Automatically adds a 'timestamp' field if not present.
    Returns True on success, False on failure (never raises).

    Args:
        collection_name: Name of the MongoDB collection
        document: Dict to insert
        db_name: MongoDB database name (default: 'zsyio_db')
    """
    try:
        db = get_mongo_db(db_name)
        if db is None:
            print(f"[MongoDB] Client not initialized — skipping log to '{collection_name}'")
            return False

        if 'timestamp' not in document:
            document['timestamp'] = datetime.datetime.utcnow()

        db[collection_name].insert_one(document)
        print(f"[MongoDB] Logged to '{collection_name}' ✓")
        return True

    except Exception as e:
        print(f"[MongoDB] Logging error in '{collection_name}': {e}")
        return False
