temp = hum = 0
key = ubinascii.hexlify(machine.unique_id()).decode()
headers = {'Content-Type': 'application/json'}
url = "http://{}/sensor".format(api)

def read_dht():
  try:
    dht_pin.measure()
    temp = dht_pin.temperature()
    hum = dht_pin.humidity()
    timestamp = machine.RTC().datetime()
    if (isinstance(temp, float) and isinstance(hum, float)) or (isinstance(temp, int) and isinstance(hum, int)):
      send_request(timestamp, temp, hum)
    else:
      send_error(400)
  except OSError as e:
    send_error(404)

def send_request(timestamp, temp, hum):
    data = ujson.dumps({ "id": key, "time": timestamp, "temp": temp, "hum": hum})
    response = urequests.post(url, headers=headers, data=data)
    print(response.json())

def send_error(status):
    data = ujson.dumps({ "id": key, "status": status })
    response = urequests.post(url, headers=headers, data=data)
    print(response.json())
    
while True:
    read_dht()
    time.sleep(1000)