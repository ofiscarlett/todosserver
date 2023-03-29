import express, { Express, Request, Response } from 'express'
import cors from 'cors'
//import {Pool } from 'pg'
import {Pool, QueryResult } from 'pg'
//const BACKED_ROOT_URL = 'http://localhost:3001'
//const list = <HTMLUListElement>document.querySelector('#todolist')

const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001
//because it show error at line 24, openDB is not a function, so create a function


app.get('/', (req: Request,res: Response) => {
    const pool = openDb()
    pool.query('select * from task', (error,result)=>{
        if(error) {
            res.status(500).json({error: error.message})
        }
        //problem part is this one, I should put to get result from sql
        res.status(200).json(result.rows)
    })

})

 app.post('/new', (req: Request,res: Response) => {
    const pool = openDb()

    pool.query('insert into task (description) values ($1) returning *', 
    [req.body.description], (error: Error,result: QueryResult)=>{
        if (error) {
            res.status(500).json({error: error.message})
        }
        res.status(200).json({id: result.rows[0].id})
    })
}) 

app.delete('/delete/:id',async(req: Request, res: Response) => {
    const pool = openDb();
    const id = parseInt(req.params.id);

    pool.query('delete from task where id = $1', [id], (error:Error, result:QueryResult) => {
        if(error) {
            res.status(500).json({error: error.message});
        }
        res.status(200).json({id: id});
    })

})

const openDb= (): Pool=> {
   const pool: Pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'todo',
      password: 'a640111',
      port: 5432
    })
    return pool
  }


app.listen(port)