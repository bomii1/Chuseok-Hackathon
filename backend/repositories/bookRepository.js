let bookDb = new Map()
let codes = [1, 1, 1, 1, 1, 1, 1, 1, 1];

let book1 = {
    code: 'AS1',
    catagory: 'AS',
    num: 0,
    name: '모던자바스크립트 딥 다이브',
    author: '저자이름',
    illustrator: '그림작가',
    publisher: '출판사',
    publication_date: '출판날짜',
    translator: '번역가(엮은이)',
}

let book2 = {
    code: 'AS2',
    catagory: 'AS',
    num: 0,
    name: '책이름',
    author: '저자이름',
    illustrator: '그림작가',
    publisher: '출판사',
    publication_date: '출판날짜',
    translator: '번역가(엮은이)',
}

let book3 = {
    code: 'A1',
    catagory: 'A',
    num: 5,
    name: '책이름',
    author: '저자이름',
    illustrator: '그림작가',
    publisher: '출판사',
    publication_date: '출판날짜',
    translator: '번역가(엮은이)',
}

bookDb.set(book1.catagory + codes[book1.num]++, book1);
bookDb.set(book2.catagory + codes[book2.num]++, book2);
bookDb.set(book3.catagory + codes[book3.num]++, book3);

// console.log(bookDb);


const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'book directory',
    dateStrings: true
});

const findBooks = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM book', 
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            }
        )
    })
}

// 카테고리별 조회 -> 카테고리로 조회
const findBookByCatagory = (catagory) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM book WHERE catagory = ?',  // 카테고리로 책을 조회하는 쿼리
            [catagory],  // 카테고리 값을 바인딩
            (err, results) => {
                if (err) {
                    return reject(err);  // 쿼리 실패 시 reject 호출
                }
                resolve(results);  // 성공적으로 데이터를 가져오면 resolve로 반환
            }
        );
    });
};


// 개별 조회 -> 코드로 조회
const findBookByCode = (code) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM book WHERE code = ?',  // 책의 코드를 조건으로 조회
            [code],  // 코드 값을 바인딩
            (err, results) => {
                if (err) {
                    return reject(err);  // 오류 발생 시 reject 호출
                }
                resolve(results[0]);  // 성공 시 첫 번째 결과 반환
            }
        );
    });
};

// 책 개별 등록
const saveBook = (code, book) => {
    return new Promise((resolve, reject) => {
        const newBook = { ...book, code };  // 책 객체에 코드 추가
        console.log(newBook);

        connection.query(
            'INSERT INTO book SET ?',  // 데이터베이스에 책 정보를 삽입
            newBook,
            (err, result) => {
                if (err) {
                    return reject(err);  // 오류 발생 시 reject 호출
                }
                resolve(true);  // 성공적으로 삽입되면 true 반환
            }
        );
    });
};

// 책 개별 수정
const updateBook = (code, body) => {
    if (bookDb.has(code)) {
        bookDb.set(code, body);
        console.log(bookDb);
        // 에러처리 필요
        return true;
    } return false;
}

// 책 개별 삭제
const deleteBook = (code) => {
    
    if (bookDb.has(code)) {
        bookDb.delete(code);
        // 에러처리 필요
        console.log(bookDb);
        return true;
    } return false;
}
// findBookByCode('AS2');

module.exports = { codes, findBooks, findBookByCatagory, findBookByCode, saveBook, deleteBook, updateBook };