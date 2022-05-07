"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: `${__dirname}/config.env`
});
const app_1 = __importDefault(require("./app"));
console.log(process.env.PORT);
const port = process.env.PORT || 3000;
app_1.default.listen(port, () => {
    console.log(`Server hosted at localhost:${port}`);
});
