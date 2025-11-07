function createUtils(base, ext, options) {
    if (options?.freezeBase) {
        Object.freeze(base);
    }
    const result = { ...base, ...ext };
    if (options?.freezeResult) {
        Object.freeze(result);
    }
    return result;
}

const isJson = (value) => {
    if (typeof value !== "string") {
        return false;
    }
    try {
        JSON.parse(value);
        return true;
    }
    catch {
        return false;
    }
};

const isObject = (value) => {
    return typeof value === "object" && !Array.isArray(value) && value !== null;
};

const isEmpty = (value) => {
    if (value == null) {
        return true;
    }
    if (typeof value === "string") {
        return value.trim().length === 0;
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }
    if (typeof value === "object") {
        return Object.keys(value).length === 0;
    }
    return false;
};

class UtilifyException extends Error {
    constructor(functionName, message) {
        super(`UtilifyException in ${functionName}: ${message}`);
        this.name = "UtilifyException";
    }
}

const capitalize = (value) => {
    if (typeof value !== "string") {
        throw new UtilifyException("capitalize", "Input must be a string");
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
};

const toKebabCase = (value) => {
    if (typeof value !== "string") {
        throw new UtilifyException("toKebabCase", "Input must be a string");
    }
    return value
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
};

const toSnakeCase = (value) => {
    if (typeof value !== "string") {
        throw new UtilifyException("toSnakeCase", "Input must be a string");
    }
    return value
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s-]+/g, "_")
        .toLowerCase();
};

const trim = (value) => {
    if (typeof value !== "string") {
        throw new UtilifyException("trim", "Input must be a string");
    }
    return value.trim();
};

const removeAccents = (value) => {
    if (typeof value !== "string") {
        throw new UtilifyException("removeAccents", "Input must be a string");
    }
    if (value === "") {
        return "";
    }
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const getFileExtension = (filename) => {
    if (!filename || typeof filename !== "string") {
        return "";
    }
    const cleanFilename = filename.split("?")[0].split("#")[0];
    const parts = cleanFilename.split(/[/\\]/);
    const file = parts[parts.length - 1];
    const lastDotIndex = file.lastIndexOf(".");
    if (lastDotIndex === -1 || lastDotIndex === 0) {
        return "";
    }
    return file.substring(lastDotIndex + 1).toLowerCase();
};

const UNITS = {
    B: { divisor: 1, label: "B" },
    KB: { divisor: 1024, label: "KB" },
    MB: { divisor: 1024 ** 2, label: "MB" },
    GB: { divisor: 1024 ** 3, label: "GB" },
    TB: { divisor: 1024 ** 4, label: "TB" },
};
function extractSize(input) {
    if (input instanceof Blob ||
        (typeof File !== "undefined" && input instanceof File)) {
        return input.size;
    }
    if (typeof Buffer !== "undefined" && Buffer.isBuffer(input)) {
        return input.length;
    }
    if (typeof input === "object" && input !== null && "size" in input) {
        const size = input.size;
        if (typeof size === "number" && isFinite(size) && size >= 0) {
            return size;
        }
    }
    throw new UtilifyException("getFileSize", "Invalid input: expected File, Blob, Buffer, or object with valid numeric 'size' property");
}
function validateUnit(unit) {
    if (!Object.keys(UNITS).includes(unit)) {
        throw new UtilifyException("getFileSize", `Invalid unit '${unit}': must be one of ${Object.keys(UNITS).join(", ")}`);
    }
}
const getFileSize = (input, unit) => {
    validateUnit(unit);
    const bytes = extractSize(input);
    const { divisor, label } = UNITS[unit];
    const converted = bytes / divisor;
    const formatted = converted.toFixed(2);
    return `${formatted} ${label}`;
};

const debounce = (fn, delay = 250) => {
    if (typeof fn !== "function") {
        throw new UtilifyException("debounce", "First argument must be a function");
    }
    if (typeof delay !== "number" || delay < 0 || !isFinite(delay)) {
        throw new UtilifyException("debounce", "Delay must be a non-negative number");
    }
    let timeout;
    return ((...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    });
};

function flow(...fns) {
    if (fns.length < 2) {
        throw new UtilifyException("flow", "At least 2 functions are required");
    }
    for (let i = 0; i < fns.length; i++) {
        if (typeof fns[i] !== "function") {
            throw new UtilifyException("flow", `Argument at index ${i} is not a function`);
        }
    }
    return (input) => fns.reduce((acc, fn) => fn(acc), input);
}

function validateFunction(fn, functionName) {
    if (typeof fn !== "function") {
        throw new UtilifyException(functionName, "First argument must be a function");
    }
}
function createSuccessResult(result) {
    return { success: true, result };
}
function createErrorResult(error) {
    return { success: false, error };
}
function safeRun(fn) {
    validateFunction(fn, "safeRun");
    try {
        const result = fn();
        return createSuccessResult(result);
    }
    catch (error) {
        return createErrorResult(error);
    }
}
async function safeRunAsync(fn) {
    validateFunction(fn, "safeRunAsync");
    try {
        const result = await fn();
        return createSuccessResult(result);
    }
    catch (error) {
        return createErrorResult(error);
    }
}

function paginateArray(items, opts) {
    const pageSize = opts?.pageSize ?? 10;
    const zeroBased = opts?.zeroBased ?? false;
    const page = opts?.page ?? (zeroBased ? 0 : 1);
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    let currentPage = page;
    if (zeroBased) {
        if (currentPage < 0)
            currentPage = 0;
        if (currentPage >= totalPages)
            currentPage = Math.max(0, totalPages - 1);
    }
    else {
        if (currentPage < 1)
            currentPage = 1;
        if (currentPage > totalPages)
            currentPage = Math.max(1, totalPages);
    }
    const startIndex = (currentPage - (zeroBased ? 0 : 1)) * pageSize;
    const data = items.slice(startIndex, startIndex + pageSize);
    const hasNextPage = zeroBased
        ? currentPage < totalPages - 1
        : currentPage < totalPages;
    const hasPreviousPage = zeroBased ? currentPage > 0 : currentPage > 1;
    return {
        data,
        currentPage,
        totalPages,
        totalItems,
        pageSize,
        hasNextPage,
        hasPreviousPage,
    };
}

const baseUtils = {
    isJson,
    isObject,
    isEmpty,
    capitalize,
    toKebabCase,
    toSnakeCase,
    trim,
    removeAccents,
    getFileExtension,
    getFileSize,
    debounce,
    flow,
    safeRun,
    safeRunAsync,
    paginateArray,
    createUtils,
};
const Utilify = createUtils(baseUtils, {}, { freezeResult: true });

export { Utilify as default };
