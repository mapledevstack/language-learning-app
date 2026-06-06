import express from "express"

const app = express()

app.use(express.json())

app.get("/hi", (req, res) => {
  res.json({msg: "HIIIIII"})
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`)
})
