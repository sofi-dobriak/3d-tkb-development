export default catchers => error => {
  const catcherWasFound = catchers.some(catcher => {
    if (error instanceof catcher.instance) {
      catcher.callback(error);
      return true;
    }
    return false;
  });

  if (!catcherWasFound) {
    throw error;
  }
};
