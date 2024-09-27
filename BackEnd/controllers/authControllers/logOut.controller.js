const logOut = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ message: "logged Out successfully" });
      } catch (err) {
        console.log("err in log out", err);
        return res.status(500).json({ message: "internal server error" });
      }
}

export default logOut