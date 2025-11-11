
from storages.backends.azure_storage import AzureStorage

class MediaStorage(AzureStorage):
    account_name = 'nombre_de_tu_cuenta_de_almacenamiento' 
    account_key = 'tu_clave_de_cuenta_de_almacenamiento'     
    azure_container = 'media'
    expiration_secs = None