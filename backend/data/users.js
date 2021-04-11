import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin user",
    email: "admin@xyz.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "Jerry",
    email: "jerry@xyz.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    name: "Tom",
    email: "tom@xyz.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

export default users;
