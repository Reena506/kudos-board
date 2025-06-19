const express = require('express')
const {PrismaClient} =require ("@prisma/client")
const router = express.Router()
const prisma=new PrismaClient();


router.get('/', async(req, res)=>{
    const cards=await prisma.card.findMany();
    console.log(cards)
    res.json(cards);
    
})

router.get('/:boardId/cards', async(req, res)=>{
    const cards=await prisma.card.findMany({
        where: {boardId: parseInt(req.params.boardId)}
    });
    console.log(cards)
    res.json(cards);
    
})

router.get('/:cardId', async(req, res) => {
  const cardId = parseInt(req.params.cardId)
  const card=await prisma.card.findUnique({
    where: { id: parseInt(cardId) },
})
console.log(card)
res.json(card);

})


router.post('/', async(req, res) => {
  const {text, gif, author, boardId} = req.body
  const newCard=await prisma.card.create({
    data: {
        text,
        gif,
        author,
        boardId
       
    }
  })

  res.status(201).json(newCard)
})

router.put('/:cardId', async(req, res) => {
const { cardId } = req.params
  const {text, gif, author, boardId} = req.body
  const updatedCard = await prisma.card.update({
    where: { id: parseInt(cardId) },
    data: {
        text,
        gif,
        author,
        boardId
    }
  })
  res.json(updatedCard)

})


router.delete('/:cardId', async(req, res) => {
  const { cardId } = req.params
  const deletedCard = await prisma.card.delete({
    where: { id: parseInt(cardId) }
  })
  res.json(deletedCard)
})

 module.exports=router

