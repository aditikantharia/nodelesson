// const fs = require("node:fs");

// fs = file system

// create file
// fs.appendFile(path, data, cb fnc)
// fs.appendFile("hello.txt", "Hello World !!", (e) => {
//   if (e) throw error;
//   console.log("create a hello.txt")
// });
// isuue: every time you run the file that put new data with exiting data, so that print same data every time you run the file

// fs.writeFile(path, data, cb fnc)
// fs.writeFile("hello.txt", "Hello World !!", (e) => {
//   if (e) throw error;
//   console.log("create a hello.txt");
// });
// issue: when you change hello.txt file and after that you run the file that cmd will be replace whole file with above given data

// =============================================

// create a folder
// fs.mkdir(path, cb fnc)
// fs.mkdir("Pages", (e) => {
//   if (e) throw error;
//   console.log("create a new folder -- Pages");
// });

// create a nested folder
// fs.mkdir(path, {options}, cb fnc)
// fs.mkdir("CSS/Home/Style", { recursive: true }, (e) => {
//   if (e) throw error;
//   console.log("create a nested folder of CSS");
// });

// ===================================================

// read file
// fs.readFile(path, fnc(e, data){})
// fs.readFile("hello.txt", "utf-8", (e, data) => {
//   if (e) throw error;
//   console.log(data);
// });
// as a response you get data (files inputes)

// read folder
// fs.readdir(path, fnc(e, files){})
// fs.readdir("CSS/Home/Style", (e, files) => {
//   if (e) throw error;
//   console.log(files);
// });
// as a response you get a array of folder and files name

// =======================================

// copy files
// fs.copyFile('path with file name', 'path with new file name', cb fnc)
// fs.copyFile("hello.txt", "CSS/Home/Style/copy.txt", (e) => {
//   if (e) throw error;
//   console.log("File Copy Sucessfully");
// });

// ===========================================

// rename file
// fs.rename('old(exiting) file name with path', 'new file name with path', cb fnc )
// fs.rename("hello.txt", "name.txt", (e) => {
//   if (e) throw error;
//   console.log("rename file");
// });

// nest file rename and move
// fs.rename("rename.txt", "CSS/Home/Style/abc.txt", (e) => {
//   if (e) throw error;
//   console.log("rename file");
// });

// rename folder
// fs.rename("CSS/Home/Component", "CSS/Home/Components", (e) => {
//   if (e) throw error;
//     console.log("rename folder");
// });

// ===================================================

// delete file
// fs.rm(file name with path, cb fnc)
// fs.rm("name.txt", (e) => {
//   if (e) throw error;
//   console.log("delete file");
// });

// delete folder
// fs.rm("Pages", { recursive: true, force: true }, (e) => {
//   if (e) throw error;
//   console.log("delete folder");
// });

// fs.rm("name.js", (e) => {
//   if (e) throw error;
//   console.log("delete file");
// });

import chalk from "chalk";

console.log(chalk.blue("Write with Chalk"));
console.log(chalk.bgWhite.redBright("Write with Chalk"));
console.log(chalk.bgYellow.green.bold("Write with Chalk"));
