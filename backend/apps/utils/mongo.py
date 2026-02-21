"""
Dummy MongoDB utility to prevent breakage after removing MongoDB.
Logs are now ignored or could be redirected to a standard Django model.
"""

def get_mongo_db(db_name='zsyio_db'):
    return None

def mongo_log(collection_name: str, document: dict, db_name: str = 'zsyio_db') -> bool:
    print(f"[Dummy Log] {collection_name}: {document.get('action', 'log')}")
    return True
