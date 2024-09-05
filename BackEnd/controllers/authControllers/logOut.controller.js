const logOut = (req, res) => {
res.cookie("jwt", "", {
    maxAge : 0
})
res.send("loggedout")

}

export default logOut