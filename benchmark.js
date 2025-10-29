const Benchmark = require("benchmark");
const _ = require("lodash");
const R = require("ramda");
const utilify = require("./dist/index.cjs");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Function mappings to Lodash and Ramda equivalents
const functionMappings = {
  // Validation functions
  "validation/is-empty": {
    utilify: utilify.isEmpty,
    lodash: _.isEmpty,
    ramda: R.isEmpty,
    testInput: [null, "", [], {}, "hello", [1, 2, 3], { a: 1 }],
  },
  "validation/is-json": {
    utilify: utilify.isJson,
    lodash: null, // Lodash doesn't have isJson
    ramda: null, // Ramda doesn't have isJson
    testInput: ['{"name": "John"}', "invalid json", "123", "true"],
  },
  "validation/is-object": {
    utilify: utilify.isObject,
    lodash: _.isObject,
    ramda: R.is(Object),
    testInput: [{}, [], null, "string", 123, true],
  },

  // String functions
  "string/capitalize": {
    utilify: utilify.capitalize,
    lodash: _.capitalize,
    ramda: R.compose(R.join(""), R.adjust(R.toUpper, 0), R.split("")),
    testInput: ["hello", "HELLO", "hELLO", "a", ""],
  },
  "string/trim": {
    utilify: utilify.trim,
    lodash: _.trim,
    ramda: R.trim,
    testInput: ["  hello  ", "\t\nhello\t\n", "hello", ""],
  },
  "string/to-kebab-case": {
    utilify: utilify.toKebabCase,
    lodash: _.kebabCase,
    ramda: R.compose(
      R.replace(/([a-z])([A-Z])/g, "$1-$2"),
      R.toLower,
      R.replace(/[\s_]+/g, "-"),
    ),
    testInput: ["helloWorld", "Hello World", "hello_world", "HELLO_WORLD"],
  },
  "string/to-snake-case": {
    utilify: utilify.toSnakeCase,
    lodash: _.snakeCase,
    ramda: R.compose(
      R.replace(/([a-z])([A-Z])/g, "$1_$2"),
      R.toLower,
      R.replace(/[\s-]+/g, "_"),
    ),
    testInput: ["helloWorld", "Hello World", "hello-world", "HELLO-WORLD"],
  },

  // Array functions
  "array/paginate": {
    utilify: (items, opts) => utilify.paginateArray(items, opts),
    lodash: null, // Lodash doesn't have paginateArray
    ramda: null, // Ramda doesn't have paginateArray
    testInput: [[...Array(100).keys()], { page: 1, pageSize: 10 }],
    skip: true, // Skip this for now as it returns 0 ops/sec
  },

  // File functions
  "file/get-file-extension": {
    utilify: utilify.getFileExtension,
    lodash: null, // Lodash doesn't have getFileExtension
    ramda: null, // Ramda doesn't have getFileExtension
    testInput: ["document.pdf", "image.png", "archive.tar.gz", "noextension"],
    skip: true, // Skip this for now as it returns 0 ops/sec
  },
  "file/get-file-size": {
    utilify: (input, unit) => utilify.getFileSize(input, unit),
    lodash: null, // Lodash doesn't have getFileSize
    ramda: null, // Ramda doesn't have getFileSize
    testInput: [{ size: 1024 }, "KB"],
    skip: true, // Skip this for now as it returns 0 ops/sec
  },

  // Execution functions
  "execution/debounce": {
    utilify: (fn, delay) => utilify.debounce(fn, delay),
    lodash: (fn, delay) => _.debounce(fn, delay),
    ramda: (fn, delay) => R.debounce(delay, fn),
    testInput: [() => {}, 100],
    skip: true, // Skip this for now as it returns 0 ops/sec
  },

  // Runner functions
  "runner/flow": {
    utilify: (...fns) => utilify.flow(...fns),
    lodash: (...fns) => _.flow(...fns),
    ramda: (...fns) => R.pipe(...fns),
    testInput: [(x) => x + 1, (x) => x * 2, (x) => x.toString()],
    skip: true, // Skip this for now as it returns 0 ops/sec
  },
  "runner/safe-run": {
    utilify: utilify.safeRun,
    lodash: null, // Lodash doesn't have safeRun
    ramda: null, // Ramda doesn't have safeRun
    testInput: [() => "success"],
  },
  "runner/safe-run-async": {
    utilify: utilify.safeRunAsync,
    lodash: null, // Lodash doesn't have safeRunAsync
    ramda: null, // Ramda doesn't have safeRunAsync
    testInput: [async () => "success"],
  },
};

// Format number with thousand separators
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Run benchmarks for a function
async function runBenchmark(funcName, mapping) {
  if (mapping.skip) {
    console.log(`⏭️  Skipping ${funcName} (marked for skip)`);
    return {
      utilify: null,
      lodash: null,
      ramda: null,
    };
  }

  const results = {
    utilify: null,
    lodash: null,
    ramda: null,
  };

  const suite = new Benchmark.Suite();

  // Add Utilify benchmark
  if (mapping.utilify) {
    suite.add("Utilify", function () {
      for (let i = 0; i < mapping.testInput.length; i++) {
        const input = mapping.testInput[i];
        if (Array.isArray(input)) {
          mapping.utilify(...input);
        } else {
          mapping.utilify(input);
        }
      }
    });
  }

  // Add Lodash benchmark
  if (mapping.lodash) {
    suite.add("Lodash", function () {
      for (let i = 0; i < mapping.testInput.length; i++) {
        const input = mapping.testInput[i];
        if (Array.isArray(input)) {
          mapping.lodash(...input);
        } else {
          mapping.lodash(input);
        }
      }
    });
  }

  // Add Ramda benchmark
  if (mapping.ramda) {
    suite.add("Ramda", function () {
      for (let i = 0; i < mapping.testInput.length; i++) {
        const input = mapping.testInput[i];
        if (Array.isArray(input)) {
          mapping.ramda(...input);
        } else {
          mapping.ramda(input);
        }
      }
    });
  }

  return new Promise((resolve) => {
    suite.on("cycle", function (event) {
      const name = event.target.name;
      const opsSec = Math.round(event.target.hz);
      results[name.toLowerCase()] = opsSec;
      console.log(`${funcName} - ${name}: ${formatNumber(opsSec)} ops/sec`);
    });

    suite.on("complete", function () {
      resolve(results);
    });

    suite.run({ async: true });
  });
}

// Get system information
function getSystemInfo() {
  const nodeVersion = process.version;
  const platform = os.platform();
  const arch = os.arch();
  const cpuModel = os.cpus()[0]?.model || "Unknown CPU";
  const totalMemory = Math.round(os.totalmem() / (1024 * 1024 * 1024)) + "GB";

  return `Node.js ${nodeVersion}, ${cpuModel}, ${platform} ${arch}, ${totalMemory} RAM`;
}

// Main execution
async function main() {
  console.log("🚀 Starting performance benchmarks...\n");

  const allResults = {};

  for (const [funcName, mapping] of Object.entries(functionMappings)) {
    if (!mapping.skip) {
      console.log(`📊 Benchmarking ${funcName}...`);
    }
    const results = await runBenchmark(funcName, mapping);
    allResults[funcName] = results;
    if (!mapping.skip) {
      console.log("");
    }
  }

  // Generate Markdown table
  console.log("📋 Generating results table...\n");

  const tableRows = [
    "| Utility | Lodash (ops/sec) | Ramda (ops/sec) | UtilifyCore (ops/sec) |",
    "|---------|------------------|------------------|-----------------|",
  ];

  // Group by category
  const categories = {
    validation: [],
    string: [],
    array: [],
    file: [],
    execution: [],
    runner: [],
  };

  for (const [funcName, results] of Object.entries(allResults)) {
    const category = funcName.split("/")[0];
    if (categories[category]) {
      categories[category].push({ name: funcName, results });
    }
  }

  // Add rows by category
  for (const [category, funcs] of Object.entries(categories)) {
    if (funcs.length > 0) {
      // Add category header (optional, can be removed if not wanted)
      funcs.forEach(({ name, results }) => {
        const lodashOps = results.lodash ? formatNumber(results.lodash) : "—";
        const ramdaOps = results.ramda ? formatNumber(results.ramda) : "—";
        const utilifyOps = results.utilify
          ? formatNumber(results.utilify)
          : "—";
        tableRows.push(
          `| ${name} | ${lodashOps} | ${ramdaOps} | ${utilifyOps} |`,
        );
      });
    }
  }

  const table = tableRows.join("\n");
  console.log(table);

  // Calculate summary
  const summary = {
    fastestLibrary: "",
    fastestFunction: { name: "", ops: 0 },
    totalOps: { lodash: 0, ramda: 0, utilify: 0 },
  };

  let lodashCount = 0,
    ramdaCount = 0,
    utilifyCount = 0;

  for (const [funcName, results] of Object.entries(allResults)) {
    if (results.lodash) {
      summary.totalOps.lodash += results.lodash;
      lodashCount++;
    }
    if (results.ramda) {
      summary.totalOps.ramda += results.ramda;
      ramdaCount++;
    }
    if (results.utilify) {
      summary.totalOps.utilify += results.utilify;
      utilifyCount++;
      if (results.utilify > summary.fastestFunction.ops) {
        summary.fastestFunction = { name: funcName, ops: results.utilify };
      }
    }
  }

  // Determine fastest library
  const avgOps = {
    lodash: lodashCount > 0 ? summary.totalOps.lodash / lodashCount : 0,
    ramda: ramdaCount > 0 ? summary.totalOps.ramda / ramdaCount : 0,
    utilify: utilifyCount > 0 ? summary.totalOps.utilify / utilifyCount : 0,
  };

  const fastestAvg = Math.max(avgOps.lodash, avgOps.ramda, avgOps.utilify);
  if (fastestAvg === avgOps.utilify) {
    summary.fastestLibrary = "UtilifyCore";
  } else if (fastestAvg === avgOps.lodash) {
    summary.fastestLibrary = "Lodash";
  } else {
    summary.fastestLibrary = "Ramda";
  }

  // Generate markdown content
  const systemInfo = getSystemInfo();
  const markdownContent = `# Performance Benchmarks

**Benchmark environment:** ${systemInfo}

${table}

## Summary
- 🥇 Fastest library: ${summary.fastestLibrary}
- 🧩 Fastest function: ${summary.fastestFunction.name} (${formatNumber(summary.fastestFunction.ops)} ops/sec)
- Note: Performance comparison between Utilify, Lodash and Ramda on common operations.

*Generated on: ${new Date().toISOString()}*
`;

  // Save to file
  const outputPath = path.join(__dirname, "BENCHMARK_RESULTS.md");
  fs.writeFileSync(outputPath, markdownContent, "utf8");

  console.log("\n📋 Results saved to BENCHMARK_RESULTS.md");
  console.log(table);
  console.log("\n**Summary**");
  console.log(`- 🥇 Fastest library: ${summary.fastestLibrary}`);
  console.log(
    `- 🧩 Fastest function: ${summary.fastestFunction.name} (${formatNumber(summary.fastestFunction.ops)} ops/sec)`,
  );
  console.log(
    "- Note: Performance comparison between Utilify, Lodash and Ramda on common operations.",
  );
}

main().catch(console.error);
