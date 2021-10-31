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

ssid = '' #str
password = '' #str
api = '' #str
authurl = '' #str
pwd = '' #int

station = network.WLAN(network.STA_IF)
station.active(True)
station.connect(ssid, password)

while station.isconnected() == False:
  pass

print('Connection successful')
print(station.ifconfig())

import ntptime # get time from NTP
ntptime.settime()
import utime # convert to unix