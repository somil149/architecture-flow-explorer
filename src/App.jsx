import { useState, useMemo } from 'react'

const awsImages = import.meta.glob('/images/aws/**/*.png', { eager: true, query: '?url' })
const azureImages = import.meta.glob('/images/azure/**/*.png', { eager: true, query: '?url' })

function getImagesByCategory(imagesObj) {
  const categories = {}
  for (const [path, module] of Object.entries(imagesObj)) {
    const parts = path.split('/')
    const category = parts[2]
    const filename = parts[parts.length - 1]
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push({
      path: module.default || path,
      filename,
      name: filename.replace('.png', '').replace(/^\d+-/, '')
    })
  }
  for (const cat of Object.values(categories)) {
    cat.sort((a, b) => a.filename.localeCompare(b.filename))
  }
  return categories
}

const awsCategories = getImagesByCategory(awsImages)
const azureCategories = getImagesByCategory(azureImages)

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [modalImage, setModalImage] = useState(null)

  const categories = activeCategory === 'all' || activeCategory === 'aws' 
    ? { AWS: awsCategories }
    : { Azure: azureCategories }

  const filteredData = useMemo(() => {
    const result = {}
    for (const [provider, cats] of Object.entries(categories)) {
      result[provider] = {}
      for (const [section, images] of Object.entries(cats)) {
        const filtered = images.filter(img => 
          img.name.toLowerCase().includes(search.toLowerCase()) ||
          section.toLowerCase().includes(search.toLowerCase())
        )
        if (filtered.length > 0) {
          result[provider][section] = filtered
        }
      }
    }
    return result
  }, [categories, search])

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'aws', label: 'AWS' },
    { id: 'azure', label: 'Azure' }
  ]

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Architecture Flow Explorer</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search diagrams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="category-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`category-tab ${activeCategory === tab.id ? 'active' : ''} ${tab.id}`}
            onClick={() => setActiveCategory(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <main className="main-content">
        {Object.entries(filteredData).map(([provider, sections]) => (
          Object.entries(sections).map(([section, images]) => (
            <section key={`${provider}-${section}`}>
              <h2 className="section-title">{section.replace(/^\d+-/, '')} ({provider})</h2>
              <div className="section-grid">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="image-card"
                    onClick={() => setModalImage(img)}
                  >
                    <img src={img.path} alt={img.name} loading="lazy" />
                    <div className="image-card-info">
                      <div className="image-card-title">{img.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        ))}
        {Object.keys(filteredData).length === 0 && (
          <div className="empty-state">
            No diagrams found matching your search.
          </div>
        )}
      </main>

      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <button className="modal-close" onClick={() => setModalImage(null)}>×</button>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={modalImage.path} alt={modalImage.name} />
            <div className="modal-title">{modalImage.name}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default App