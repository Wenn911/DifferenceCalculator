### Hexlet tests and linter status:
[![Actions Status](https://github.com/Wenn911/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Wenn911/frontend-project-lvl2/actions)
[![Lint](https://github.com/Wenn911/frontend-project-lvl2/actions/workflows/CI.yml/badge.svg)](https://github.com/Wenn911/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/866b08ec9bd287500a2a/maintainability)](https://codeclimate.com/github/Wenn911/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/866b08ec9bd287500a2a/test_coverage)](https://codeclimate.com/github/Wenn911/frontend-project-lvl2/test_coverage)

# Description
Gendiff - a program defining the difference between two data structures.

The capabilities of the utility:

* Support for different input formats: yaml, json
* Report generation as plain text, stylish and json

## Installation
Clone or fork repository
`git clone`
`make install` 

## Test & linter
`make test`
`make lint`  
***

Examples:
    # format plain
    gendiff --format plain path/to/file.yml another/path/file.json

    Property 'common.follow' was added with value: false
    Property 'group1.baz' was updated. From 'bas' to 'bars'
    Property 'group2' was removed

    # формат stylish
    gendiff filepath1.json filepath2.json

    {
    + follow: false
        setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: {
            key: value
        }
    + setting4: blah blah
    + setting5: {
            key5: value5
        }
    }