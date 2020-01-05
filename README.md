# Toy Robot Simulator

A simple command line tool to control a toy robot.

## Get started

Install dependencies with `npm ci`.

Then `npm run start` and paste your input followed by ⏎

To run tests use `npm run test`

### Examples

* Example a *

  PLACE 0,0,NORTH
  MOVE
  REPORT

Expected output:

  0,1,NORTH

* Example b *

  PLACE 0,0,NORTH
  LEFT
  REPORT

Expected output:

  0,0,WEST

* Example c *

  PLACE 1,2,EAST
  MOVE
  MOVE
  LEFT
  MOVE
  REPORT

Expected output

  3,3,NORTH
