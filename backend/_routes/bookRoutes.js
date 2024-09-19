// express 모듈 셋팅
const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookControllers');

router.use(express.json()) // json을 json 바디에서 꺼내서 편하게 쓸 수 있게 해주는 모듈

router
    .route('/')
    // 책 전체 조회
    .get(bookController.getAllBooks)
    // 책 개별 등록
    .post(bookController.createBook)
    

router
    .route('/catagory/:catagory')
    // 카테고리별 조회
    .get(bookController.getCatagoryBooks)
    

router
    .route('/:code')
    // 책 개별 조회
    .get(bookController.getBook)
    // 책 개별 삭제
    .delete(bookController.deleteBook)
    // 책 개별 수정
    .put(bookController.updateBook)

module.exports = router;