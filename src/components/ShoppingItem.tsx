interface ShoppingItemProps {
  id: number
  name: string
  price: number
  onRemove: (id: number) => void
}

function ShoppingItem({ id, name, price, onRemove }: ShoppingItemProps) {
  return (
    <article className="shopping-item">
      <div className="item-dot" aria-hidden="true" />
      <div className="item-info">
        <h3>{name}</h3>
        <span>{price.toFixed(2)} сом</span>
      </div>
      <button
        className="remove-button"
        type="button"
        onClick={() => onRemove(id)}
        aria-label={`Удалить ${name}`}
      >
        ×
      </button>
    </article>
  )
}

export default ShoppingItem
