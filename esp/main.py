temp = hum = 0
headers = {'Content-Type': 'application/json'}
#
def read_dht():
  try:
    dht_pin.measure()
    temp = dht_pin.temperature()
    hum = dht_pin.humidity()
    datetime = machine.RTC().datetime()
    timestamp = 946684800 + utime.time() # Unix Epoch
    token = getAuth()
    if (isinstance(temp, float) and isinstance(hum, float)) or (isinstance(temp, int) and isinstance(hum, int)):
      send_request(timestamp, temp, hum, token['accessToken'])
    else:
      send_error(400)
  except OSError as e:
    send_error(404)
  except KeyError as k:
    send_error(404)
#
def send_request(timestamp, temp, hum, token):
    data = ujson.dumps({ "id": key, "time": timestamp, "temp": temp, "hum": hum})
    header = {'Content-Type': 'application/json', 'Authorization': 'Bearer {}'.format(token)}
    response = urequests.post(dataUrl, headers=header, data=data)
    print(response.json())
#
def send_error(status):
    data = ujson.dumps({ "msg": "Unauthorized", "status": status })
    print(data)
#
def getAuth():
    data = ujson.dumps({ "id": key, "pwd": pwd })
    response = urequests.post(authUrl, headers=headers, data=data)
    return response.json()
#
while True:
    read_dht()
    time.sleep(1000)