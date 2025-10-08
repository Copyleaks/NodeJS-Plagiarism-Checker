function logError(title, err) {
  console.error("----------ERROR----------");
  console.error(`${title}:`);
  console.error(err);
  console.error("-------------------------");
}

function logSuccess(title, result) {
  console.log("----------SUCCESS----------");
  console.log(`${title}`);
  if (result) {
    console.log(`result:`);
    console.log(result);
  }
  console.log("-------------------------");
}

module.exports = { logError, logSuccess };