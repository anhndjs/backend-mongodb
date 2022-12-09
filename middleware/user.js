async function changedPasswordAfter(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 100, 10);
    return JWTTimestamp < changedTimestamp;// 100<200
  }
  return false;
}

module.exports = {
  changedPasswordAfter,
};
