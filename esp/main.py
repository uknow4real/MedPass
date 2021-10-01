temp = hum = 0
key = ubinascii.hexlify(machine.unique_id()).decode()
headers = {'Content-Type': 'application/json'}
url = "http://{}:{}/api/sensor/data".format(ip,port)

def read_dht():
  try:
    dht_pin.measure()
    temp = dht_pin.temperature()
    hum = dht_pin.humidity()
    if (isinstance(temp, float) and isinstance(hum, float)) or (isinstance(temp, int) and isinstance(hum, int)):
      send_request(temp, hum)
    else:
      send_error(400)
  except OSError as e:
    send_error(404)

def send_request(temp, hum):
    data = ujson.dumps({ "key": key, "temp": temp, "hum": hum})
    response = urequests.post(url, headers=headers, data=data)
    print(response.json())

def send_error(status):
    data = ujson.dumps({ "key": key, "status": status })
    response = urequests.post(url, headers=headers, data=data)
    print(response.json())
    
while True:
    read_dht()
    time.sleep(1)