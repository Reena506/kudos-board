import Card from "./Card"

const CardList=({cards, onDelete, onUpvote})=>{
    return(
        <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDelete={() => onDelete(card.id)}
          onUpvote={() => onUpvote(card.id)}
        />
      ))}
    </div>

    )
}

export default CardList