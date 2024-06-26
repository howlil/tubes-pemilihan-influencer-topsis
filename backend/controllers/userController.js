const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Silahkan lengkapi data akun anda" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: "Akun anda tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Password akun anda salah" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    await prisma.token.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    return res.status(200).json({ success: true, message: "berhasil login", data: { token } });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};


exports.logout = async (req, res) => {
  await prisma.token.delete({
    where: { token: req.headers["authorization"].split(" ")[1] },
  });
  return res.status(200).json({ success: true, message: "berhasil logout" });
};
