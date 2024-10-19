const registerUser = (req, res) => {
  const { f_name, l_name, dob, gender, m_mail, password } = req.body;

  // check if user enters all the fields

  if (!f_name || !l_name || !dob || !gender || !m_mail || !password) {
    res.status(400);
    throw new Error("Pleas enter all the fields");
  }

  res.json({ f_name, l_name, dob, gender, m_mail, password });
};

module.exports = {
  registerUser,
};
