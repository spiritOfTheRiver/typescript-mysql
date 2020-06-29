"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = `
        SELECT * 
        FROM heroes`;
    mysql_1.default.ejecutarQuery(query, (error, heroes) => {
        if (error) {
            res.status(400).json({
                ok: false,
                error
            });
        }
        else {
            res.status(400).json({
                ok: true,
                heroes
            });
        }
    });
});
router.get('/heroe/:id', (req, res) => {
    const id = mysql_1.default.instance.cnn.escape(req.params.id);
    const query = `SELECT * FROM heroes where id=${id}`;
    mysql_1.default.ejecutarQuery(query, (error, heroes) => {
        if (error) {
            res.status(400).json({
                ok: false,
                error
            });
        }
        else {
            res.status(400).json({
                ok: true,
                heroe: heroes[0]
            });
        }
    });
});
exports.default = router;
