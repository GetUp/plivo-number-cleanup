# Plivo number clean up

Four scripts to assist with number cleanup.

## Setup

Provide `PLIVO_AUTH_ID` & `PLIVO_AUTH_TOKEN` in your env or inline before each command.

## Commands

1. Dump a list of all applications to `applications.txt`

        node list_applications.js

1. Provide a list of applications to delete in `applications_to_delete.txt`

        node delete_applications.js

1. Dump a list of all numbers to `numbers.txt`

        node list_numbers.js

1. Provide a list of numbers to delete in `numbers_to_delete.txt`

        node delete_numbers.js

## Tip

Remove applications by name, then remove numbers with no associated application.
