# calliope-ble-ticker

calliope-ble-ticker is a small application for the
[Calliope mini](http://www.calliope.cc/) that can be used to display messages
on a Calliope mini. The messages are sent via bluetooth to the mini and
displayed on the minis 5 x 5 LED display.

A message is a string of characters terminated by a newline character. When
the mini receives a message it will continuously display that message until
the next message is received.

## Compiling

```
yotta build
```

Note that the compile step is optional as the compiled hex file
`calliope-ble-ticker-combined.hex` is provided in the `firmware` directory.

## Flashing

Copy `calliope-ticker-combined.hex` onto the board.

## Example - Digital Clock

There's an example Node.js program in the `example` directory. The example
requires Node.js 8. It sends messages containing the current time from the PC
on which it run to the mini via bluetooth.

To run the example `cd` to the `example` directory and run the following
command to install the required Node.js modules.

```
npm install
```

Then run the Node.js application with the following command.

```
sudo node ble-digital-clock.js <bluetooth-address-of-calliope-mini>
```

