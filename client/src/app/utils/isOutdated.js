function isOutdated(date) {
   return Date.now() - date > 60000;
}

export default isOutdated;
