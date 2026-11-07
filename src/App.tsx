import { useState, type FormEvent } from 'react'
import ShoppingItem from './components/ShoppingItem'

interface ShoppingItemData {
  id: number
  name: string
  price: number
}

function App() {
  const [items, setItems] = useState<ShoppingItemData[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')

  const addItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanName = name.trim()
    const numericPrice = Number(price)

    if (!cleanName) {
      setError('Введите название товара.')
      return
    }

    if (!price || !Number.isFinite(numericPrice) || numericPrice <= 0) {
      setError('Введите корректную положительную цену.')
      return
    }

    const newItem: ShoppingItemData = {
      id: Date.now(),
      name: cleanName,
      price: numericPrice,
    }

    setItems((currentItems) => [...currentItems, newItem])
    setName('')
    setPrice('')
    setError('')
  }

  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <main className="market">
      <header className="hero-header">
        <div>
          <span className="eyebrow">Мой маленький магазин</span>
          <h1>My Little Market</h1>
          <p>Всё необходимое — в одном списке</p>
        </div>
        <div className="basket" aria-label="Корзина покупок">
          <span className="basket-leaf">⌁</span>
          <span className="basket-body">♡</span>
        </div>
      </header>

      <section className="add-card" aria-labelledby="add-title">
        <h2 id="add-title">Добавить покупку</h2>
        <form className="add-form" onSubmit={addItem}>
          <label>
            <span>Название товара</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Например, яблоки"
            />
          </label>
          <label>
            <span>Цена (сом)</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="0.00"
            />
          </label>
          <button className="add-button" type="submit">Добавить товар</button>
        </form>
        {error && <p className="form-error" role="alert">{error}</p>}
      </section>

      <div className="content-grid">
        <section className="shopping-section" aria-labelledby="shopping-title">
          <div className="section-heading">
            <h2 id="shopping-title">Список покупок</h2>
            <span>{items.length}</span>
          </div>
          {items.length === 0 ? (
            <div className="empty-state">
              <span aria-hidden="true">🧺</span>
              <p>Твой список пока пуст. Добавь первую покупку!</p>
            </div>
          ) : (
            <div className="items-list">
              {items.map((item) => (
                <ShoppingItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  onRemove={removeItem}
                />
              ))}
            </div>
          )}
        </section>

        <aside className="total-card" aria-label="Общая стоимость">
          <span className="total-icon" aria-hidden="true">✦</span>
          <p>Общая стоимость</p>
          <strong>{totalPrice.toFixed(2)} сом</strong>
        </aside>
      </div>
    </main>
  )
}

export default App
