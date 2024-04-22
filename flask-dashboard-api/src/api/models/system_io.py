class SystemIO():
    def __init__(self, psargs):
        self.read_count = psargs[0],
        self.write_count = psargs[1],
        self.read_time = psargs[4],
        self.write_time = psargs[5],

    
    def get_cpu_rw(self):
        
        data = {
                "read_count":self.read_count[0]/1000,
                "write_count":self.write_count[0]/1000, 
                "read_time":self.read_time[0]/1000,
                "write_time":self.write_time[0]/1000
            }
        return data