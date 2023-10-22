export const index = (req, res, next) => {
  res.send("This is home page");
};

export const create = (req, res, next) => {
  res.send("this is create page");
};

export const store = (req, res, next) => {
  res.send("this is store page");
};
export const edit = (req, res, next) => {
  res.send("this is edit page");
};

export const update = (req, res, next) => {
  res.send("this is update page");
};

export const destroy = (req, res, next) => {
  res.send("this is delete page");
};
