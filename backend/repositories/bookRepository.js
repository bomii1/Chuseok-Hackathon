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
const saveBook = (book, catagory) => {
    return new Promise((resolve, reject) => {
        const newBook = { ...book };  // 책 객체에 코드 추가

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
    return new Promise((resolve, reject) => {
        const fieldsToUpdate = [];
        const values = [];

        for (const key in body) {
            fieldsToUpdate.push(`${key} = ?`);
            values.push(body[key]);
        }

        // 수정할 책의 code를 바인딩할 값에 추가
        values.push(code);

        const query = `UPDATE book SET ${fieldsToUpdate.join(', ')} WHERE code = ?`;

        connection.query(query, values, (err, result) => {
            if (err) {
                return reject(err);  // 쿼리 실행 중 오류 발생 시 reject
            }

            // 결과에 따라 성공 여부 처리
            if (result.affectedRows > 0) {
                resolve(true);  // 수정된 책이 있으면 true 반환
            } else {
                resolve(false);  // 수정된 책이 없으면 false 반환
            }
        });
    });
};


// 책 개별 삭제
const deleteBook = (code) => {
    return new Promise((resolve, reject) => {

        const query = 'DELETE FROM book WHERE code = ?';

        connection.query(query, [code], (err, result) => {
            if (err) {
                return reject(err);  // 오류 발생 시 reject
            }

            // affectedRows로 삭제된 레코드가 있는지 확인
            if (result.affectedRows > 0) {
                resolve(true);  // 성공적으로 삭제된 경우 true 반환
            } else {
                resolve(false);  // 해당 책이 없으면 false 반환
            }
        });
    });
};


module.exports = { codes, findBooks, findBookByCatagory, findBookByCode, saveBook, deleteBook, updateBook };