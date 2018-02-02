//Criar rota com Express

const cfg = require("./knexfile")
const knex = require("knex")(cfg.development)
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()

app.use(morgan("dev"))

app.use(bodyParser.urlencoded())

app.use(express.static("public"))


//lista pessoas via GET
app.get("/listpessoas", (req, res) => {
  knex("pessoa").select().then(ret => {
    res.send(ret)
  }).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
})

//recupera pessoa pelo ID por parametro
app.get("/getbyid/:id", (req, res) => {
    //Query para passar parametros de busca
    console.log(req.params.id)
    const idpessoa = req.params.id
    knex("pessoa").select().where({idpessoa}).then(ret => {
      res.send(ret)
   }).catch(err => {
      res.status(500).send(err)
      console.log(err)
   })
})


//insere pessoa via form POST
app.post("/addpessoa", (req, res) => {
    const novapessoa = req.body
    knex("pessoa").insert(novapessoa, "idcproduto").then(ret => {
        res.send(ret)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
  })


//atualiza pessoas via PUT
/*app.put("/update", (req, res) => {
    knex("pessoa").update() insert(novapessoa, "idcproduto").then(ret => {
        res.send(ret)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
  })*/


//delete via id por parametro
app.get("/deletebyid/:id", (req, res) => {
    console.log(req.params.id)
    const idpessoa = req.params.id
    knex("pessoa").del().where({idpessoa}).then(ret => {
      res.send(ret)
   }).catch(err => {
      res.status(500).send(err)
      console.log(err)
   })
})

knex.migrate.latest().then(_ =>
  app.listen(3000, _ =>
    console.log("server online!")))