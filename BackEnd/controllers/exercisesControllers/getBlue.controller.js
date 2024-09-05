import User from "../../Models/user.model.js";

const getBlue = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "provide Id" });
    }

    const document = await User.findById(id);

    if (!document) {
      return res.status(500).json({ mssage: "somthing went wrong" });
    }

    return res.json(document);
  } catch (err) {
    res.json(err);
  }
};

export default getBlue;
