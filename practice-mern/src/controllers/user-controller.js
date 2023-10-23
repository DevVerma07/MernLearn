import HttpError from "../models/http-error.js";
import { v4 as uuid } from "uuid";
import { validationResult } from "express-validator";

const DUMMY_USERS = [
  {
    id: "u1",
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password1",
  },
  {
    id: "u2",
    name: "Jane Smith",
    email: "janesmith@example.com",
    password: "password2",
  },
  {
    id: "u3",
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    password: "password3",
  },
];

export const index = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

export const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password } = req.body;

  if (DUMMY_USERS.find((u) => u.email === email)) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ users: createdUser });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }
  res.json({ message: "logged in!" });
};
// export const edit = (req, res, next) => {
//   res.send("this is edit page");
// };

// export const update = (req, res, next) => {
//   res.send("this is update page");
// };

// export const destroy = (req, res, next) => {
//   res.send("this is delete page");
// };
