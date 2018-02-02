//Carga inicial da tabela Pessoa

const pessoas = [
    {nomepessoa: 'João', telefone: '123456'},
    {nomepessoa: 'Maria', telefone: '3686564'},
    {nomepessoa: 'José', telefone: '03429384'},
    {nomepessoa: 'Chico', telefone: '0039393'},
    {nomepessoa: 'Bruno', telefone: '73833992'},
]


exports.up = knex => knex("pessoa").insert(pessoas)


exports.down = knex => knex("pessoa").del()
  .whereIn("nomepessoa", pessoas.map(e => e.nomepessoa))