# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
#import webrepl
#webrepl.start()
import network
import machine
from machine import Pin
import dht
dht_pin = dht.DHT11(Pin(4))

import esp
esp.osdebug(None)

import gc
gc.collect()

import time #sleep
import urequests #send request
import ujson #to send json
import ubinascii #to convert device id

ssid = ''
password = ''
ip = ''
port = 5000

station = network.WLAN(network.STA_IF)
station.active(True)
station.connect(ssid, password)

while station.isconnected() == False:
  pass

print('Connection successful')
print(station.ifconfig())
