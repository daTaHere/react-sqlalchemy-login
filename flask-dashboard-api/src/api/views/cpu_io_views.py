import psutil
from api.models.system_io import SystemIO
from ..utilities.user_authorization import check_user

def get_cpu_data():
    user = check_user()
    result = None
    print(f'======== view line 8  user   {user} =============')
    if user:
        try:
            system_io = SystemIO(psutil.disk_io_counters())
            cpu_info = system_io.get_cpu_rw()
            result = [cpu_info]
        except:
            result = 'Response failed', 500
    else:
        result = 'UnAuthorized', 401
    return result