const express = require('express')
const {PrismaClient} =require ("@prisma/client")
const router = express.Router()
const prisma=new PrismaClient();


router.get('/', async(req, res)=>{
    // res.json(pets)
    const cards=await prisma.card.findMany();
    console.log(cards)
    res.json(cards);
    
})

// //retriving a single pet
router.get('/:cardId', async(req, res) => {
  const cardId = parseInt(req.params.cardId)
  const card=await prisma.card.findUnique({
    where: { id: parseInt(cardId) },
})
console.log(card)
res.json(card);

})

// //creating a pet
router.post('/', async(req, res) => {
  const {title, description, author, category } = req.body
  const newCard=await prisma.card.create({
    data: {
        title,
        description,
        author,
        category 
    }
  })

  res.status(201).json(newCard)
})

// //updating a pet
router.put('/:cardId', async(req, res) => {
const { cardId } = req.params
  const {title, description, author, category } = req.body
  const cardCard = await prisma.card.update({
    where: { id: parseInt(cardId) },
    data: {
        title,
        description,
        author,
        category 
    }
  })
  res.json(updatedCard)

})

// //delete a pet
router.delete('/:cardId', async(req, res) => {
  const { cardId } = req.params
// //   const initialLength = pets.length
// //   pets = pets.filter(pet => pet.id !== parseInt(petId))

// //   if (pets.length < initialLength) {
// //     res.status(204).send()
// //   } else {
// //     res.status(404).send('not found')
// //   }
  const deletedCard = await prisma.card.delete({
    where: { id: parseInt(cardId) }
  })
  res.json(deletedCard)
})

 module.exports=router

