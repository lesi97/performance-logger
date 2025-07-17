import '@c_lesi/logger';

/**
 * Description placeholder
 *
 * @export
 * @class PerformanceLogger
 * @typedef {PerformanceLogger}
 */
export class PerformanceLogger {
    private startTime: number;
    private endTime: number | null = null;
    private message: string | undefined = undefined;

    /**
     * Creates an instance of PerformanceLogger
     *
     * Initialisation of the class will start the timer
     *
     * This is used to measure performance of a function and log it to the console
     *
     * Duration will appear red if over 500ms
     *
     * @see {@link https://npm.lesi.dev/-/web/detail/@c_lesi/performance-logger
     *
     * @constructor
     * @param {(Request | string)} message
     */
    constructor(message?: Request | string) {
        this.startTime = performance.now();
        if (message instanceof Request) {
            this.message = `${message.method} ${message.url}`;
        } else if (typeof message === 'string') {
            this.message = message;
        }
    }

    /**
     * Manually start the timer
     *
     * @see {@link https://npm.lesi.dev/-/web/detail/@c_lesi/performance-logger
     */
    start() {
        this.startTime = performance.now();
    }

    /**
     * Stops the timer on the performance logger
     *
     * Logs the duration of the function to the console
     *
     * Duration will appear red if over 500ms
     *
     * @see {@link https://npm.lesi.dev/-/web/detail/@c_lesi/performance-logger
     */
    stop() {
        this.endTime = performance.now();
        const duration = this.endTime - this.startTime;

        if (this.message) {
            console.fmt.custom(this.message, {
                lineBreakEnd: false,
                textValue: 'LIGHT_CYAN',
            });
        }
        const logParams = { lineBreakStart: false, pad: false };
        if (duration > 500) {
            logParams.pad = true;
            console.fmt.error(`Duration: ${duration.toFixed(2)}ms`, logParams);
        } else {
            console.fmt.success(
                `Duration: ${duration.toFixed(2)}ms`,
                logParams
            );
        }
    }
}

/**
 * A function that measures the performance of another function
 * It logs the performance and returns the result of the provided function
 * or a default value if no result is returned
 *
 * @export
 * @param {(params?: any) => Promise<T> | T} fn The function to measure performance of, it can be a synchronous or an asynchronous function
 * @param {Object} [options] The options to customize behavior
 * @param {Request | string} [options.message] Optional message to log with the performance
 * @param {T | undefined} [options.defaultReturnValue] The default value to return if the function doesn't return a value
 * @returns {Promise<T | undefined>} The result of the function or the default value if no result is returned
 *
 * @example
 * ```js
 * const response = await perf(myFn, {message: request});
 * ```
 *
 * @see {@link https://npm.lesi.dev/-/web/detail/@c_lesi/performance-logger Read the docs}
 */
export async function perf<T>(
    fn: (params?: any) => Promise<T> | T,
    {
        message,
        defaultReturnValue = undefined,
    }: {
        message?: Request | string;
        defaultReturnValue?: T | undefined;
    } = {}
): Promise<T | undefined> {
    const perf = new PerformanceLogger(message);

    try {
        const result = await fn();
        return result ? result : defaultReturnValue;
    } catch (error) {
        throw error;
    } finally {
        perf.stop();
    }
}

export default perf;
