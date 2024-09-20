const bookRepository = require('../repositories/bookRepository');

// 책 전체 조회
const getBooks = async () => {
    try {
        const books = await bookRepository.findBooks(); 
        console.log('service layer', books);
        return books;
    } catch (error) {
        throw error;
    }
};

// 책 카테고리별 조회
const getBookByCatagory = async (catagory) => {
    try {
        const books = await bookRepository.findBookByCatagory(catagory); 
        return books;
    } catch (error) {
        throw error;
    }
};



// 책 개별 조회
const getBookByCode = async (code) => {
    try {
        const book = await bookRepository.findBookByCode(code);
        return book;
    } catch (error) {
        throw error;
    }
};


// 책 개별 등록
const createBook = async (book) => {
    let { code, catagory, name, publication_date, publisher, price} = book;
    // 필수 값이 모두 존재하는지 확인
    if (code && catagory && name && publication_date && publisher && price) {

        try {
            const result = await bookRepository.saveBook(book, catagory);
            return result;
        } catch (error) {
            return false;
        }
    } else {
        return false;  // 필수 값이 누락된 경우 false 반환
    }
};

// 책 개별 수정
const updateBook = async (code, body) => {
    try {
        let result =  await bookRepository.updateBook(code, body);
        return result;
    } catch (error) {
        throw error;
    }
}

// 책 개별 삭제
const deleteBook = async (code) => {
    try {
        let result = await bookRepository.deleteBook(code);  // 책 삭제 로직 호출
        return result;  // 삭제 성공 여부 반환
    } catch (error) {
        throw error; 
    }
};


module.exports = { getBooks, getBookByCatagory, getBookByCode, createBook, deleteBook, updateBook };