# Lesi Performance Logger

A wrapper for existing functions to measure their performance

-   [Github](https://github.com/lesi97/performance-logger)
-   [Registry](https://npm.lesi.dev/-/web/detail/@c_lesi/performance-logger)

## Installation

This package is self hosted so you must add a registry in your `.npmrc` file first
Your `.npmrc` file can be found at `~/.npmrc` on Mac and Linux or `C:\Users\%username%\.npmrc` on Windows
The line you must add is `@c_lesi:registry=https://npm.lesi.dev/`

The below commands will append this for you

### Mac/Linux

```bash
registry_line="c_lesi:registry=https://npm.lesi.dev/"; npmrc_path="${HOME}/.npmrc"; grep -Fxq "$registry_line" "$npmrc_path" 2>/dev/null || echo "$registry_line" >> "$npmrc_path"
```

### Windows

```powershell
$line = '@c_lesi:registry=https://npm.lesi.dev/'; $path = "$HOME\.npmrc"; $escaped = [regex]::Escape($line); if (-not (Test-Path $path)) { New-Item -ItemType File -Path $path -Force | Out-Null }; if (-not (Select-String -Path $path -Pattern $escaped -Quiet)) { Add-Content -Path $path -Value $line }
```

### Install with package manager

```bash
npm install @c_lesi/performance-logger
# or
pnpm install @c_lesi/performance-logger
# or
yarn add @c_lesi/performance-logger
```

## Usage

#### perf

```TS
import { perf } from "@c_lesi/performance-logger"
async function fetchTest() {
    // ...
}
const response = await perf(fetchTest, { message: 'My Log Message' });
```

Once the function has completed, it will log to the console the duration it took for the function to execute

The duration will appear in red if over 500ms

##### Optional Parameters

###### message

The perf function requires a function as it's first argument to execute, any data returned in your function will be returned via the perf wrapper too
You can then use optional parameters which can be found below:

```TS
{
    message?: Request | string;
    defaultReturnValue?: T | undefined;
}
```

`message` allows either a HTTP request type (including `NextRequest` as this extends from `Request`) or a `string`
Passing through a `Request` will then log `${request.method} ${request.url}`

Passing through a string will simply output the string you use

###### defaultReturnValue

Passing in `defaultReturnValue` will simply return the value as default if the return value of your function is null or undefined
If this is not specified and your function returns nothing, the perf wrapper will return `undefined`

#### PerformanceLogger

You may instead wish to use the PerformanceLogger directly
This is a class and so you would typically want to start and end this at both ends of your function

Example:

```TS
import { PerformanceLogger } from "@c_lesi/performance-logger"

async function fetchTest() {
    const log = new PerformanceLogger() // This starts the timer
    try {
        const response = await fetch('X', {
            method: 'GET',
            headers: 'accept': 'application/json'
        });

        const data = await response.json();
        return data;
    } catch (error) {
        throw error
    } finally {
        log.stop() // This both stops the timer and logs the value to the console
    }
}
```

##### Optional Parameters

You can initialise the PerformanceLogger class with a typeof `Request` or `string` and this will output along with the duration to your console

`message` allows either a HTTP request type (including `NextRequest` as this extends from `Request`) or a `string`
Passing through a `Request` will then log `${request.method} ${request.url}`

Passing through a string will simply output the string you use
