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
    private message: string;

    /**
     * Creates an instance of PerformanceLogger
     *
     * Initialisation of the class will start the timer
     *
     * This is used to measure performance of a function and log it to the console
     *
     * Duration will appear red if over 500ms
     *
     * @constructor
     * @param {(Request | string)} message
     */
    constructor(message: Request | string) {
        this.startTime = performance.now();
        if (message instanceof Request) {
            this.message = `${message.method} ${message.url}`;
        } else if (typeof message === 'string') {
            this.message = message;
        } else {
            this.message = 'Unknown request';
        }
    }

    /**
     * Manually start the timer
     *
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
     */
    stop() {
        this.endTime = performance.now();
        const duration = this.endTime - this.startTime;

        console.fmt.warn(this.message, { lineBreakEnd: false });
        const logParams = { lineBreakStart: false, pad: false };
        if (duration > 500) {
            logParams.pad = true;
            console.fmt.error(`Duration: ${duration}ms`, logParams);
        } else {
            console.fmt.success(`Duration: ${duration}ms`, logParams);
        }
    }
}

export default PerformanceLogger;
