"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
//import {Pool } from 'pg'
var pg_1 = require("pg");
//const BACKED_ROOT_URL = 'http://localhost:3001'
var BACKED_ROOT_URL = 'https://todo-backend-1h0o.onrender.com';
//const list = <HTMLUListElement>document.querySelector('#todolist')
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
var port = 3001;
//because it show error at line 24, openDB is not a function, so create a function
app.get('/', function (req, res) {
    var pool = openDb();
    pool.query('select * from task', function (error, result) {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        //problem part is this one, I should put to get result from sql
        //res.status(200).json(result:'success')
        res.status(200).json(result.rows);
    });
});
app.post('/new', function (req, res) {
    var pool = openDb();
    pool.query('insert into task (description) values ($1) returning *', [req.body.description], function (error, result) {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
});
app["delete"]('/delete/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pool, id;
    return __generator(this, function (_a) {
        pool = openDb();
        id = parseInt(req.params.id);
        pool.query('delete from task where id = $1', [id], function (error, result) {
            if (error) {
                res.status(500).json({ error: error.message });
            }
            res.status(200).json({ id: id });
        });
        return [2 /*return*/];
    });
}); });
var openDb = function () {
    var pool = new pg_1.Pool({
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
    });
    return pool;
};
app.listen(port);
