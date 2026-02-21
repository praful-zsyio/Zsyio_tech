from django.db.backends.base.base import BaseDatabaseWrapper
from django.db.backends.base.client import BaseDatabaseClient
from django.db.backends.base.creation import BaseDatabaseCreation
from django.db.backends.base.introspection import BaseDatabaseIntrospection
from django.db.backends.base.operations import BaseDatabaseOperations
from django.db.backends.base.schema import BaseDatabaseSchemaEditor
from django.db.backends.base.features import BaseDatabaseFeatures
from django.db.backends.base.validation import BaseDatabaseValidation

class DatabaseFeatures(BaseDatabaseFeatures):
    pass

class DatabaseOperations(BaseDatabaseOperations):
    def quote_name(self, name):
        return name
    def max_name_length(self):
        return 63
    def sql_flush(self, style, tables, *, reset_sequences=False, allow_cascade=False):
        return []
    def last_insert_id(self, cursor, table_name, pk_name):
        return 1
    def bulk_insert_sql(self, fields, placeholder_rows):
        placeholder_rows_sql = (", ".join(row) for row in placeholder_rows)
        values_sql = ", ".join("(%s)" % row for row in placeholder_rows_sql)
        return "VALUES " + values_sql
    def pk_default_value(self):
        return 'DEFAULT'

class DatabaseClient(BaseDatabaseClient):
    pass

class DatabaseCreation(BaseDatabaseCreation):
    pass

class DatabaseIntrospection(BaseDatabaseIntrospection):
    def get_table_list(self, cursor):
        return []
    def get_table_description(self, cursor, table_name):
        return []

class DatabaseValidation(BaseDatabaseValidation):
    pass

class DatabaseSchemaEditor(BaseDatabaseSchemaEditor):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    def skip_default(self, field):
        return True

class DatabaseWrapper(BaseDatabaseWrapper):
    vendor = 'mongodb'
    display_name = 'MongoDB'
    
    # Required operators for Django lookups
    operators = {
        'exact': '= %s',
        'iexact': '= %s',
        'contains': 'LIKE %s',
        'icontains': 'LIKE %s',
        'gt': '> %s',
        'gte': '>= %s',
        'lt': '< %s',
        'lte': '<= %s',
        'startswith': 'LIKE %s',
        'istartswith': 'LIKE %s',
        'endswith': 'LIKE %s',
        'iendswith': 'LIKE %s',
    }
    pattern_ops = {}
    
    # Define mapping for all Django field types to avoid 'db_type' errors
    data_types = {
        'AutoField': 'integer',
        'BigAutoField': 'bigint',
        'BinaryField': 'blob',
        'BooleanField': 'boolean',
        'CharField': 'varchar(%(max_length)s)',
        'DateField': 'date',
        'DateTimeField': 'datetime',
        'DecimalField': 'decimal',
        'DurationField': 'interval',
        'FileField': 'varchar(%(max_length)s)',
        'FilePathField': 'varchar(%(max_length)s)',
        'FloatField': 'double precision',
        'IntegerField': 'integer',
        'BigIntegerField': 'bigint',
        'IPAddressField': 'char(15)',
        'GenericIPAddressField': 'char(39)',
        'JSONField': 'json',
        'OneToOneField': 'integer',
        'PositiveBigIntegerField': 'bigint',
        'PositiveIntegerField': 'integer',
        'PositiveSmallIntegerField': 'smallint',
        'SlugField': 'varchar(%(max_length)s)',
        'SmallAutoField': 'smallint',
        'SmallIntegerField': 'smallint',
        'TextField': 'text',
        'TimeField': 'time',
        'UUIDField': 'char(32)',
    }
    data_types_suffix = {}
    data_type_check_constraints = {}
    
    # Internal Database module mock
    class DatabaseMock:
        class Error(Exception): pass
        class InterfaceError(Error): pass
        class DatabaseError(Error): pass
        class DataError(DatabaseError): pass
        class OperationalError(DatabaseError): pass
        class IntegrityError(DatabaseError): pass
        class InternalError(DatabaseError): pass
        class ProgrammingError(DatabaseError): pass
        class NotSupportedError(DatabaseError): pass
        
        @classmethod
        def close(cls):
            pass
        @classmethod
        def commit(cls):
            pass
        @classmethod
        def rollback(cls):
            pass
    
    Database = DatabaseMock
    SchemaEditorClass = DatabaseSchemaEditor
    
    client_class = DatabaseClient
    creation_class = DatabaseCreation
    features_class = DatabaseFeatures
    introspection_class = DatabaseIntrospection
    ops_class = DatabaseOperations
    validation_class = DatabaseValidation
    
    def __init__(self, settings_dict, alias='default'):
        # Enforce class assignments
        self.client_class = DatabaseClient
        self.creation_class = DatabaseCreation
        self.features_class = DatabaseFeatures
        self.introspection_class = DatabaseIntrospection
        self.ops_class = DatabaseOperations
        self.validation_class = DatabaseValidation
        super().__init__(settings_dict, alias)

    def get_connection_params(self):
        return {}

    def get_new_connection(self, conn_params):
        return self.Database
    
    def init_connection_state(self):
        pass

    def _set_autocommit(self, autocommit):
        pass

    def create_cursor(self, name=None):
        class CursorMock:
            def __init__(self):
                self.lastrowid = 1
                self.rowcount = 0
                self.arraysize = 1
                self.description = [('id', None, None, None, None, None, None)]
            def execute(self, *query, **params): return None
            def executemany(self, query, param_list): return None
            def fetchall(self): return []
            def fetchone(self): return None
            def fetchmany(self, size=1): return []
            def close(self): pass
            def __iter__(self): return iter([])
            def __next__(self): raise StopIteration
            def __enter__(self): return self
            def __exit__(self, exc_type, exc_val, exc_tb): pass
        return CursorMock()

    def is_usable(self):
        return True
