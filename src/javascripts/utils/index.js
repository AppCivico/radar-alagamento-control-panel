const formatDate = date => {
  if (date)
    return date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("/");
};

export { formatDate };