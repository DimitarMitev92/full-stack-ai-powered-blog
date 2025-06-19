import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    )
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ message: "Admin logged in successfully", success: true, token });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
