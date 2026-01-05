import PropTypes from 'prop-types'
ListLayout.propTypes = {
    sidebar: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
  }
/**
 * 通用的列表頁面佈局組件
 * @param {React.ReactNode} sidebar - 側邊欄內容
 * @param {React.ReactNode} children - 主內容區內容
 */
export default function ListLayout({ sidebar, children }) {
  return (
    <div className="row">
      <aside className="col-12 col-lg-3 mb-4 mb-lg-0">
        <div className="sticky-top" style={{ top: '120px' }}>
          {sidebar}
        </div>
      </aside>
      <main className="col-12 col-lg-9">
        {children}
      </main>
    </div>
  )
}



