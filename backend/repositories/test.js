const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'book directory',
    dateStrings: true
});


// 전체 조회
const findBooks = () => {
    let result = [];
    connection.query(
        'SELECT * FROM book',
        function(err, results) {
            results.forEach((book) => {
                result.push(book)
                console.log(book); // 테이블 데이터 값 출력 -> rows
            }) 
        }
    )
    return result;
}



// 카테고리별 조회
connection.query(
    'SELECT * FROM book WHERE catagory="A"',
    function(err, results) {
        results.forEach((result) => {
            console.log(result); // 테이블 데이터 값 출력 -> rows
        }) 
    }
)
