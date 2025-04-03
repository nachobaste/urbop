import xmlrpc.client

class OdooConnector:
    """
    A class to handle connections to Odoo SH via XML-RPC
    """
    
    def __init__(self, url, db, username, api_key=None, password=None):
        """
        Initialize the Odoo connector
        
        Args:
            url (str): The Odoo server URL (e.g., https://mycompany.odoo.com)
            db (str): The database name (e.g., mycompany)
            username (str): The username to authenticate with
            api_key (str, optional): API key to use instead of password
            password (str, optional): Password for authentication if no API key
        """
        if not (api_key or password):
            raise ValueError("Either api_key or password must be provided")
            
        self.url = url
        self.db = db
        self.username = username
        self.auth = api_key if api_key else password
        self.uid = None
        self.common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
        self.models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')
        
    def connect(self):
        """
        Connect to the Odoo server and authenticate
        
        Returns:
            int: User ID if successful, None if failed
        """
        try:
            # Get server version to verify connection
            version_info = self.common.version()
            print(f"Connected to Odoo server version: {version_info['server_version']}")
            
            # Authenticate
            self.uid = self.common.authenticate(self.db, self.username, self.auth, {})
            if self.uid:
                print(f"Authentication successful. User ID: {self.uid}")
                return self.uid
            else:
                print("Authentication failed")
                return None
        except Exception as e:
            print(f"Connection error: {str(e)}")
            return None
    
    def search_read(self, model, domain=None, fields=None, limit=None, offset=0, order=None):
        """
        Search and read records from a model
        
        Args:
            model (str): The model name (e.g., 'res.partner')
            domain (list, optional): Search domain (e.g., [['is_company', '=', True]])
            fields (list, optional): Fields to fetch (e.g., ['name', 'country_id'])
            limit (int, optional): Maximum number of records to return
            offset (int, optional): Number of records to skip
            order (str, optional): Sort order (e.g., 'name ASC')
            
        Returns:
            list: List of dictionaries containing the requested fields
        """
        if not self.uid:
            raise ValueError("Not connected to Odoo. Call connect() first.")
            
        domain = domain or []
        fields = fields or []
        
        kwargs = {}
        if limit:
            kwargs['limit'] = limit
        if offset:
            kwargs['offset'] = offset
        if order:
            kwargs['order'] = order
            
        try:
            return self.models.execute_kw(
                self.db, self.uid, self.auth,
                model, 'search_read',
                [domain, fields],
                kwargs
            )
        except Exception as e:
            print(f"Error in search_read: {str(e)}")
            return []
    
    def create(self, model, values):
        """
        Create a new record in the specified model
        
        Args:
            model (str): The model name (e.g., 'res.partner')
            values (dict): Field values for the new record
            
        Returns:
            int: ID of the created record, or None if failed
        """
        if not self.uid:
            raise ValueError("Not connected to Odoo. Call connect() first.")
            
        try:
            return self.models.execute_kw(
                self.db, self.uid, self.auth,
                model, 'create',
                [values]
            )
        except Exception as e:
            print(f"Error in create: {str(e)}")
            return None
    
    def write(self, model, ids, values):
        """
        Update existing records
        
        Args:
            model (str): The model name (e.g., 'res.partner')
            ids (list): List of record IDs to update
            values (dict): Field values to update
            
        Returns:
            bool: True if successful, False otherwise
        """
        if not self.uid:
            raise ValueError("Not connected to Odoo. Call connect() first.")
            
        try:
            return self.models.execute_kw(
                self.db, self.uid, self.auth,
                model, 'write',
                [ids, values]
            )
        except Exception as e:
            print(f"Error in write: {str(e)}")
            return False
    
    def unlink(self, model, ids):
        """
        Delete records
        
        Args:
            model (str): The model name (e.g., 'res.partner')
            ids (list): List of record IDs to delete
            
        Returns:
            bool: True if successful, False otherwise
        """
        if not self.uid:
            raise ValueError("Not connected to Odoo. Call connect() first.")
            
        try:
            return self.models.execute_kw(
                self.db, self.uid, self.auth,
                model, 'unlink',
                [ids]
            )
        except Exception as e:
            print(f"Error in unlink: {str(e)}")
            return False
    
    def call(self, model, method, args=None, kwargs=None):
        """
        Call any method on a model
        
        Args:
            model (str): The model name (e.g., 'res.partner')
            method (str): The method name to call
            args (list, optional): Positional arguments
            kwargs (dict, optional): Keyword arguments
            
        Returns:
            The result of the method call
        """
        if not self.uid:
            raise ValueError("Not connected to Odoo. Call connect() first.")
            
        args = args or []
        kwargs = kwargs or {}
            
        try:
            return self.models.execute_kw(
                self.db, self.uid, self.auth,
                model, method, args, kwargs
            )
        except Exception as e:
            print(f"Error calling {method} on {model}: {str(e)}")
            return None
