import express, { Express, Request, Response } from 'express'
import cors from 'cors'
//import {Pool } from 'pg'
import {Pool, QueryResult } from 'pg'
//const BACKED_ROOT_URL = 'http://localhost:3001'
//const BACKED_ROOT_URL = 'https://todo-backend-46pk.onrender.com'
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
        //res.status(200).json(result:'success')
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
      /*user: 'postgres',
      host: 'localhost',
      database: 'todo',
      password: 'a640111',
      port: 5432 */
      user: 'root',
      host: 'dpg-cghvii82qv2772g8vkb0-a.oregon-postgres.render.com',
      //host: 'dpg-cghvii82qv2772g8vkb0-a',
      database: 'todo_2hiz',
      password: 'dRoeC4VULxiwrJZl4VfGk5W5OYdB843x',
      port: 5432,
      ssl: true
    })
    return pool
  }


app.listen(port)