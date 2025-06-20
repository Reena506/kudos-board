const express = require('express')
const {PrismaClient} =require ("@prisma/client")
const router = express.Router()
const prisma=new PrismaClient();


router.get('/', async(req, res)=>{
    const boards=await prisma.board.findMany();
    console.log(boards)
    res.json(boards);
    
})

router.get('/recent', async (req, res) => {
  try {
    const recentBoards = await prisma.board.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
    });
    res.json(recentBoards);
  } catch (err) {
    console.error("Failed to fetch recent boards:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// //retriving a single 
router.get('/:boardId', async(req, res) => {
  const boardId = parseInt(req.params.boardId)
  const board=await prisma.board.findUnique({
    where: { id: parseInt(boardId) },
})
console.log(board)
res.json(board);

})




// //creating
router.post('/', async(req, res) => {
  const {title, author, category } = req.body
  const newBoard=await prisma.board.create({
    data: {
        title,
        author,
        category 
    }
  })

  res.status(201).json(newBoard)
})

// //updating
router.put('/:boardId', async(req, res) => {
const { boardId } = req.params
  const {title, author, category } = req.body
  const updatedBoard = await prisma.board.update({
    where: { id: parseInt(boardId) },
    data: {
        title,
        author,
        category 
    }
  })
  res.json(updatedBoard)

})

// //delete 
router.delete('/:boardId', async(req, res) => {
  const { boardId } = req.params
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(boardId) }
  })
  res.json(deletedBoard)
})

 module.exports=router

