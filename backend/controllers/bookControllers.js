/*
let book = {
    code: '책 구별 코드',
    catagory: '카테고리',
    name: '책이름',
    author: '저자이름',
    illustrator: '그림작가',
    translator: '번역가(엮은이)',
    publication_date: '출판날짜',
    publisher: '출판사',
    price: 20000
}

카테고리 -> 총류, 철학, 종교, 자연과학, 기술과학, 예술, 언어, 문학, 역사
총류 - General Works : G숫자 + 0
철학 - Philosophy : P숫자 + 1
종교 - Religion : R숫자 + 2
자연과학 - Natural Sciences : N숫자 + 3
기술과학 - Applied Sciences (or Technology) : AS숫자 + 4
예술 - Arts : A숫자 + 5
언어 - Languages : La숫자 + 6
문학 - Literature : Li숫자 + 7
역사 - History : H숫자 + 8
*/

const bookService = require('../services/bookService');
const catagories = ['G', 'P', 'R', 'N', 'AS', 'A', 'La', 'Li', 'H'];

// 책 전체 조회
const getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getBooks();

        if (books.length) {
            res.status(200).json(books);
        } else {
            res.status(200).json({
                message: '조회할 책 0건'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error',
            error: error.message
        })
    }
}

// 카테고리별 조회
const getCatagoryBooks = async (req, res) => {
    const catagory = req.params.catagory;

    // 존재하는 카테고리인지 확인 (예시로 catagories 배열을 사용)
    const catagories = ['G', 'P', 'R', 'N', 'AS', 'A', 'La', 'Li', 'H'];  // 카테고리 리스트 예시

    if (catagories.includes(catagory)) {  // 존재하는 카테고리인지 확인
        try {
            const books = await bookService.getBookByCatagory(catagory);  // 비동기 처리

            if (books.length) {
                res.status(200).json(books);  // 책이 있으면 JSON으로 반환
            } else {
                res.status(200).json({
                    message: '조회할 책 0건'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: '500 Server Error: 카테고리별 조회에 실패하였습니다.',
                error: error.message
            });
        }
    } else {  // 존재하지 않는 카테고리
        res.status(404).json({
            message: '404 Not Found: 존재하지 않는 카테고리입니다.'
        });
    }
};

// 책 개별 조회
const getBook = async (req, res) => {
    const code = req.params.code;

    try {
        const book = await bookService.getBookByCode(code); 

        if (book) {
            res.status(200).json(book);  // 책이 존재하면 JSON으로 반환
        } else {
            res.status(404).json({
                message: '404 Not Found: 요청하신 책을 찾을 수 없습니다.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error: 책을 조회할 수 없습니다.',
            error: error.message
        });
    }
};


// 책 개별 등록
const createBook = async (req, res) => {
    let book = req.body;

    try {
        const result = await bookService.createBook(book); 

        if (result) {
            res.status(201).json(book);  // 책이 성공적으로 등록된 경우
        } else {
            res.status(400).json({ // 입력값이 빠진 경우
                message: '400 Error: 빠진 입력값이 존재합니다.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error: 책 등록에 실패했습니다.',
            error: error.message
        });
    }
};


// 책 개별 수정
const updateBook = async (req, res) => {
    const code = req.params.code;
    const body = req.body;

    try {
        if (code) {
            let result = await bookService.updateBook(code, body);
            if (result) {
                res.status(200).json({ message: '책을 성공적으로 수정하였습니다. '});
            } else {
                res.status(404).json({ message: '책 수정에 실패하였습니다. '});
            }
        } else {
            res.status(404).json({ message: '404 Not Found: 요청하신 책을 찾을 수 없습니다. '});
        }
    } catch (error) {
        res.status(500).json({ message: '500 Server Error: 책 수정에 실패하였습니다. '});
        error: error.message
    }
}

// 책 개별 삭제
const deleteBook = async (req, res) => {
    const code = req.params.code; 

    try {
        if (code) {
            let result = await bookService.deleteBook(code);  
            if (result) {
                res.status(200).json({ message: '책을 성공적으로 삭제하였습니다.' });
            } else {
                res.status(404).json({ message: '책 삭제에 실패하였습니다.' });
            }
        } else {
            res.status(404).json({
                message: '404 Not Found: 요청하신 책을 찾을 수 없습니다.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: '500 Server Error: 책 삭제에 실패했습니다.',
            error: error.message
        });
    }
};


module.exports = { getBook, getCatagoryBooks, getAllBooks, createBook, deleteBook, updateBook };