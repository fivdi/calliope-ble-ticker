#include "MicroBit.h"
#include "MicroBitUARTService.h"

MicroBit uBit;
MicroBitUARTService *uart;
ManagedString delimiters("\r\n");
ManagedString message("READY");

int connected = 0;

void onConnected(MicroBitEvent) {
  connected = 1;

  while(connected == 1) {
    message = uart->readUntil(delimiters);
  }
}

void onDisconnected(MicroBitEvent) {
  connected = 0;
}

void onMessageDisplayed(MicroBitEvent) {
  uBit.display.scrollAsync(message);
}

int main() {
  uBit.init();

  uBit.messageBus.listen(
    MICROBIT_ID_BLE,
    MICROBIT_BLE_EVT_CONNECTED,
    onConnected
  );

  uBit.messageBus.listen(
    MICROBIT_ID_BLE,
    MICROBIT_BLE_EVT_DISCONNECTED,
    onDisconnected
  );

  uBit.messageBus.listen(
    MICROBIT_ID_DISPLAY,
    MICROBIT_DISPLAY_EVT_ANIMATION_COMPLETE,
    onMessageDisplayed
  );

  uart = new MicroBitUARTService(*uBit.ble, 32, 32);

  uBit.display.scroll(message);

  while (true) {
    uBit.sleep(1000);
  }
}

