from machine import Pin
import dht
import esp
import esp32
import gc
import machine
import micropython
import network
import ntptime 
import urequests # send request
import ujson # to send json
import ubinascii # to convert device id
import utime # convert to unix
import time # sleep
#
# Functions
esp.osdebug(None)
gc.collect()
#
# Variables
dht_pin = dht.DHT11(Pin(4))
key = ubinascii.hexlify(machine.unique_id()).decode()
#
from hashlib import sha256
h = sha256()
h.update(key+str(micropython.stack_use())+str(esp.flash_size()))
#
ssid = '' #str
password = '' #str
dataUrl = '' #str
authUrl = '' #str
pwd = ubinascii.hexlify(h.digest()).decode()
#
# Network connect & settime
station = network.WLAN(network.STA_IF)
station.active(True)
station.connect(ssid, password)
while station.isconnected() == False:
  pass
print('Connection successful')
print(station.ifconfig())
ntptime.settime() # get time from NTP