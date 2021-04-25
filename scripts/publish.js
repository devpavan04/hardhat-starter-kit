const fs = require("fs");
const chalk = require("chalk");
const hre = require("hardhat");

const publishDir = "./client/src/contracts";
const graphDir = "./subgraph";

function publishContract(contractName) {
  console.log(" 💽 Publishing", chalk.cyan(contractName), "to", chalk.gray(publishDir));

  try {
    let contract = fs
      .readFileSync(`${hre.config.paths.artifacts}/contracts/${contractName}.sol/${contractName}.json`)
      .toString();

    const address = fs.readFileSync(`${hre.config.paths.artifacts}/${contractName}.address`).toString();

    contract = JSON.parse(contract);

    if (!fs.existsSync(graphDir)) {
      fs.mkdirSync(graphDir);
    }

    let graphConfigPath = `${graphDir}/config/config.json`;
    let graphConfig;

    try {
      if (fs.existsSync(graphConfigPath)) {
        graphConfig = fs.readFileSync(graphConfigPath).toString();
      } else {
        graphConfig = "{}";
      }
    } catch (e) {
      console.log(e);
    }

    graphConfig = JSON.parse(graphConfig);
    graphConfig[contractName + "Address"] = address;

    fs.writeFileSync(`${publishDir}/${contractName}.address.js`, `module.exports = "${address}";`);
    fs.writeFileSync(
      `${publishDir}/${contractName}.abi.js`,
      `module.exports = ${JSON.stringify(contract.abi, null, 2)};`
    );
    fs.writeFileSync(`${publishDir}/${contractName}.bytecode.js`, `module.exports = "${contract.bytecode}";`);

    const folderPath = graphConfigPath.replace("/config.json", "");

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    fs.writeFileSync(graphConfigPath, JSON.stringify(graphConfig, null, 2));

    if (!fs.existsSync(`${graphDir}/abis/`)) {
      fs.mkdirSync(`${graphDir}/abis/`);
    }

    fs.writeFileSync(`${graphDir}/abis/${contractName}.json`, JSON.stringify(contract.abi, null, 2));

    console.log(" 📠 Published " + chalk.green(contractName) + " to the frontend.\n\n");

    return true;
  } catch (e) {
    if (e.toString().indexOf("no such file or directory") >= 0) {
      console.log(chalk.grey(" ⚠️  Can't publish " + contractName + " yet (make sure it getting deployed).\n\n"));
    } else {
      console.log(e);
      return false;
    }
  }
}

async function main() {
  if (!fs.existsSync(publishDir)) {
    fs.mkdirSync(publishDir);
  }

  const finalContractList = [];

  fs.readdirSync(hre.config.paths.sources).forEach((file) => {
    if (file.indexOf(".sol") >= 0) {
      const contractName = file.replace(".sol", "");
      if (publishContract(contractName)) {
        finalContractList.push(contractName);
      }
    }
  });

  fs.writeFileSync(`${publishDir}/contracts.js`, `module.exports = ${JSON.stringify(finalContractList)};`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
