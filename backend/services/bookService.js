const bookRepository = require('../repositories/bookRepository');

// 책 전체 조회
const getBooks = async () => {
    try {
        const books = await bookRepository.findBooks();  // findBooks가 비동기 함수라고 가정
        console.log('service layer', books);
        return books;
    } catch (error) {
        console.error('Error in service layer:', error);
        throw error;
    }
};

// 책 카테고리별 조회
const getBookByCatagory = async (catagory) => {
    try {
        const books = await bookRepository.findBookByCatagory(catagory);  // 비동기 처리
        return books;
    } catch (error) {
        console.error('Error in service layer:', error);
        throw error;
    }
};



// 책 개별 조회
const getBookByCode = async (code) => {
    try {
        const book = await bookRepository.findBookByCode(code);  // 비동기 처리
        return book;
    } catch (error) {
        console.error('Error in service layer:', error);
        throw error;
    }
};


// 책 개별 등록
const createBook = async (book) => {
    let { catagory, author, name, publisher, publication_date, num } = book;

    // 필수 값이 모두 존재하는지 확인
    if (catagory && author && name && publisher && publication_date && num) {
        try {
            // 책의 고유 코드를 생성 (예시: 카테고리와 번호로 코드 생성)
            const code = catagory + (bookRepository.codes[num]++);

            // 책을 저장하는 비동기 작업
            const result = await bookRepository.saveBook(code, book);

            return result;
        } catch (error) {
            console.error('Error saving book:', error);
            return false;
        }
    } else {
        return false;  // 필수 값이 누락된 경우 false 반환
    }
};

// 책 개별 수정
const updateBook = (code, body) => {
    let result = bookRepository.updateBook(code, body);
    return result;
}

// 책 개별 삭제
const deleteBook = (code) => {
    let result = bookRepository.deleteBook(code);
    return result;
}

module.exports = { getBooks, getBookByCatagory, getBookByCode, createBook, deleteBook, updateBook };